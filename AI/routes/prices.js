const express = require('express');
const Price = require('../models/Price');
const settings = require('../config');
const { authMiddleware, optionalAuth } = require('../middleware/auth');
const { validatePriceData } = require('../middleware/validation');

const router = express.Router();

// @desc    Get current prices with filtering
// @route   GET /api/prices/current
// @access  Public
router.get('/current', optionalAuth, async (req, res) => {
  try {
    const { commodity, district, market, limit = 50, page = 1 } = req.query;
    
    // Build filter object
    const filter = {};
    if (commodity) filter.commodity = commodity;
    if (district) filter.district = district;
    if (market) filter.market = market;
    
    // Calculate pagination
    const pageSize = parseInt(limit);
    const skip = (parseInt(page) - 1) * pageSize;
    
    // Get prices with filtering and pagination
    const prices = await Price.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(pageSize)
      .populate('submittedBy', 'firstName lastName')
      .lean();
    
    // Get total count for pagination
    const total = await Price.countDocuments(filter);
    
    // Calculate averages for context
    const averagePrice = await Price.aggregate([
      { $match: filter },
      { $group: { _id: null, avgPrice: { $avg: '$price' } } }
    ]);
    
    res.json({
      success: true,
      data: prices,
      pagination: {
        page: parseInt(page),
        limit: pageSize,
        total,
        pages: Math.ceil(total / pageSize)
      },
      summary: {
        averagePrice: averagePrice[0]?.avgPrice || 0,
        count: prices.length
      }
    });
    
  } catch (error) {
    console.error('Get prices error:', error);
    res.status(500).json({ 
      error: req.language.serverError || 'Failed to fetch prices' 
    });
  }
});

// @desc    Get price trends (average prices by period)
// @route   GET /api/prices/trends
// @access  Public
router.get('/trends', optionalAuth, async (req, res) => {
  try {
    const { commodity, district, days = 30 } = req.query;
    
    const filter = {};
    if (commodity) filter.commodity = commodity;
    if (district) filter.district = district;
    
    // Calculate date range
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));
    filter.date = { $gte: startDate };
    
    const trends = await Price.aggregate([
      { $match: filter },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
            commodity: '$commodity',
            district: `$district`
          },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.date': 1 } }
    ]);
    
    res.json({
      success: true,
      data: trends,
      period: '${days} days'
    });
    
  } catch (error) {
    console.error('Get trends error:', error);
    res.status(500).json({ 
      error: req.language.serverError || 'Failed to fetch trends' 
    });
  }
});

// @desc    Add new price data
// @route   POST /api/prices
// @access  Private
router.post('/', authMiddleware, validatePriceData, async (req, res) => {
  try {
    const { commodity, market, district, price, unit, date } = req.body;
    
    const priceEntry = new Price({
      commodity,
      market,
      district,
      price: parseFloat(price),
      unit,
      date: date ? new Date(date) : new Date(),
      submittedBy: req.user._id,
      source: 'user_submitted'
    });
    
    await priceEntry.save();
    await priceEntry.populate('submittedBy', 'firstName lastName');
    
    res.status(201).json({
      success: true,
      message: req.language.priceAdded || 'Price added successfully',
      data: priceEntry
    });
    
  } catch (error) {
    console.error('Add price error:', error);
    res.status(500).json({ 
      error: req.language.serverError || 'Failed to add price' 
    });
  }
});

// @desc    Get available filters (commodities, districts, markets)
// @route   GET /api/prices/filters
// @access  Public
router.get('/filters', async (req, res) => {
  try {
    // Get unique values from database
    const commodities = await Price.distinct('commodity');
    const districts = await Price.distinct('district');
    const markets = await Price.distinct('market');
    
    res.json({
      success: true,
      data: {
        commodities: commodities.sort(),
        districts: districts.sort(),
        markets: markets.sort(),
        units: settings.commodities.units
      }
    });
    
  } catch (error) {
    console.error('Get filters error:', error);
    res.status(500).json({ 
      error: req.language.serverError || 'Failed to fetch filters' 
    });
  }
});

module.exports = router;