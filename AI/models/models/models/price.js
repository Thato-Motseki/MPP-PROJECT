const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  commodity: {
    type: String,
    required: [true, 'Commodity is required'],
    enum: [
      'maize', 'wheat', 'sorghum', 'beans', 
      'potatoes', 'tomatoes', 'cabbage', 'onions',
      'carrots', 'spinach', 'lettuce', 'peas',
      'chicken', 'beef', 'mutton', 'pork',
      'eggs', 'milk', 'goat meat'
    ]
  },
  
  market: {
    type: String,
    required: [true, 'Market is required'],
    enum: [
      'Maseru Central Market', 'Leribe Main Market', 'Berea Market',
      'Mafeteng Market', 'Mohale\'s Hoek Market', 'Quthing Market'
    ]
  },
  
  district: {
    type: String,
    required: [true, 'District is required'],
    enum: [
      'Maseru', 'Leribe', 'Berea', 'Mafeteng', 
      'Mohale\'s Hoek', 'Quthing', 'Qacha\'s Nek', 
      'Butha-Buthe', 'Thaba-Tseka', 'Mokhotlong'
    ]
  },
  
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  
  unit: {
    type: String,
    required: [true, 'Unit is required'],
    enum: ['kg', '50kg bag', '100kg bag', 'dozen', 'each', 'liter', '50kg sack']
  },
  
  date: {
    type: Date,
    default: Date.now
  },
  
  source: {
    type: String,
    enum: ['government', 'cooperative', 'user_submitted', 'api', 'admin'],
    default: 'user_submitted'
  },
  
  verified: {
    type: Boolean,
    default: false
  },
  
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
  
}, {
  timestamps: true
});

// Index for faster queries
priceSchema.index({ commodity: 1, district: 1, date: -1 });
priceSchema.index({ market: 1, date: -1 });

module.exports = mongoose.model('Price', priceSchema);