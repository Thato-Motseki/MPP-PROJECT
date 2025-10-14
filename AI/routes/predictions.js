const express = require('express');
const Prediction = require('../models/Prediction');
const settings = require('../config');
const { authMiddleware, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @desc    Get price predictions
// @route   POST /api/predictions
// @access  Public
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { commodity, district, days = 7 } = req.body;
    
    // Validate input
    if (!commodity || !district) {
      return res.status(400).json({ 
        error: req.language.validationError || 'Commodity and district are required' 
      });
    }
    
    const numDays = Math.min(parseInt(days), settings.ml.prediction.maxDays);
    
    try {
      // Try to get prediction from ML API (Thato's service)
      const mlResponse = await fetch(`${settings.ml.apiUrl}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commodity, district, days: numDays })
      });
      
      if (mlResponse.ok) {
        const predictions = await mlResponse.json();
        
        // Save predictions to database
        const predictionDocs = await Prediction.insertMany(
          predictions.map(pred => ({
            commodity,
            district,
            predictedPrice: pred.price,
            confidence: pred.confidence,
            predictionDate: new Date(),
            forDate: new Date(pred.date),
            algorithm: pred.algorithm || 'prophet'
          }))
        );
        
        return res.json({
          success: true,
          message: req.language.predictionGenerated || 'Predictions generated successfully',
          data: predictionDocs,
          source: 'ml_model'
        });
      }
    } catch (mlError) {
      console.warn('ML service unavailable, using fallback:', mlError.message);
    }
    
    // Fallback: Use historical averages if ML service is down
    const fallbackPredictions = await generateFallbackPredictions(commodity, district, numDays);
    
    res.json({
      success: true,
      message: 'Predictions generated (using historical data)',
      data: fallbackPredictions,
      source: 'historical_fallback',
      note: 'ML service temporarily unavailable'
    });
    
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ 
      error: req.language.serverError || 'Failed to generate predictions' 
    });
  }
});

// @desc    Get cached predictions
// @route   GET /api/predictions
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { commodity, district, limit = 10 } = req.query;
    
    const filter = {};
    if (commodity) filter.commodity = commodity;
    if (district) filter.district = district;
    
    const predictions = await Prediction.find(filter)
      .sort({ forDate: -1 })
      .limit(parseInt(limit));
    
    res.json({
      success: true,
      data: predictions
    });
    
  } catch (error) {
    console.error('Get predictions error:', error);
    res.status(500).json({ 
      error: req.language.serverError || 'Failed to fetch predictions' 
    });
  }
});

// Helper function for fallback predictions
async function generateFallbackPredictions(commodity, district, days) {
  // Get historical average for this commodity and district
  const historicalAvg = await Prediction.aggregate([
    {
      $match: {
        commodity,
        district,
        forDate: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
      }
    },
    {
      $group: {
        _id: null,
        avgPrice: { $avg: '$predictedPrice' },
        count: { $sum: 1 }
      }
    }
  ]);
  
  const basePrice = historicalAvg[0]?.avgPrice || 50; // Default fallback price
  const predictions = [];
  
  // Generate simple linear predictions with slight random variation
  for (let i = 1; i <= days; i++) {
    const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
    const predictedPrice = basePrice * (1 + variation);
    
    predictions.push({
      commodity,
      district,
      predictedPrice: Math.round(predictedPrice * 100) / 100, // Round to 2 decimal places
      confidence: 0.6, // Lower confidence for fallback
      predictionDate: new Date(),
      forDate: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
      algorithm: 'historical_fallback',
      historicalDataPoints: historicalAvg[0]?.count || 0
    });
  }
  
  // Save fallback predictions
  await Prediction.insertMany(predictions);
  
  return predictions;
}

module.exports=router;