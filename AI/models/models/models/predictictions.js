const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  commodity: {
    type: String,
    required: true,
    enum: [
      'maize', 'wheat', 'sorghum', 'beans', 
      'potatoes', 'tomatoes', 'cabbage', 'onions',
      'carrots', 'spinach', 'lettuce', 'peas',
      'chicken', 'beef', 'mutton', 'pork',
      'eggs', 'milk', 'goat meat'
    ]
  },
  
  district: {
    type: String,
    required: true,
    enum: [
      'Maseru', 'Leribe', 'Berea', 'Mafeteng', 
      'Mohale\'s Hoek', 'Quthing', 'Qacha\'s Nek', 
      'Butha-Buthe', 'Thaba-Tseka', 'Mokhotlong'
    ]
  },
  
  predictedPrice: {
    type: Number,
    required: true,
    min: 0
  },
  
  confidence: {
    type: Number,
    min: 0,
    max: 1
  },
  
  predictionDate: {
    type: Date,
    required: true
  },
  
  forDate: {
    type: Date,
    required: true
  },
  
  algorithm: {
    type: String,
    default: 'prophet'
  },
  
  historicalDataPoints: {
    type: Number,
    default: 0
  }
  
}, {
  timestamps: true
});

// Index for efficient queries
predictionSchema.index({ commodity: 1, district: 1, forDate: 1 });

module.exports = mongoose.model('Prediction', predictionSchema);