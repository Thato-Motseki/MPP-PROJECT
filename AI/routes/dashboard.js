const express = require('express');
const Price = require('../models/Price');
const User = require('../models/User');
const settings = require('../config');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @desc    Get dashboard data and configuration
// @route   GET /api/dashboard
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    // Get recent prices
    const recentPrices = await Price.find()
      .sort({ date: -1 })
      .limit(10)
      .populate('submittedBy', 'firstName lastName');
    
    // Get price statistics
    const stats = await Price.aggregate([
      {
        $group: {
          _id: '$commodity',
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    // Get user count (if admin)
    let userCount = 0;
    if (req.user && req.user.userType === 'admin') {
      userCount = await User.countDocuments();
    }
    
    res.json({
      success: true,
      data: {
        welcomeMessage: req.language.welcome,
        recentPrices,
        statistics: stats,
        userCount: req.user?.userType === 'admin' ? userCount : undefined,
        config: {
          regions: settings.regions.districts,
          markets: settings.regions.markets,
          commodities: settings.commodities,
          languages: settings.languages.supported
        },
        user: req.user ? {
          name: `${req.user.firstName} ${req.user.lastName}`,
          region: req.user.region,
          userType: req.user.userType
        } : null
      }
    });
    
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ 
      error: req.language.serverError || 'Failed to load dashboard' 
    });
  }
});

// @desc    Get application configuration
// @route   GET /api/config
// @access  Public
router.get('/config', (req, res) => {
  res.json({
    success: true,
    data: {
      app: {
        name: settings.app.name,
        version: settings.app.version,
        description: settings.app.description
      },
      regions: settings.regions.districts,
      markets: settings.regions.markets,
      commodities: settings.commodities,
      languages: settings.languages.supported,
      defaults: {
        language: settings.languages.default,
        predictionDays: settings.ml.prediction.defaultDays
      }
    }
  });
});

module.exports = router;