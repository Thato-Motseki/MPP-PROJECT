const express = require('express');
const cors = require('cors');
const path = require('path');

// Import middleware
const languageMiddleware = require('./middleware/language');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/auth');
const priceRoutes = require('./routes/prices');
const predictionRoutes = require('./routes/predictions');
const dashboardRoutes = require('./routes/dashboard');

// Import settings
const settings = require('./config');

// Create Express app
const app = express();

// ===== MIDDLEWARE =====

// CORS configuration
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = settings.server.corsOrigins;
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Language']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Custom middleware
app.use(languageMiddleware);

// ===== ROUTES =====

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '${settings.app.name}` API is running',
    timestamp: new Date().toISOString(),
    version: settings.app.version,
    environment: settings.server.environment,
    language: req.languageCode
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/prices', priceRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: req.language?.error || 'Error',
    message: 'API endpoint not found'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: req.language.welcome || 'Welcome to SmartMarket Lesotho API',
    description: settings.app.description,
    version: settings.app.version,
    endpoints: {
      auth: '/api/auth',
      prices: '/api/prices',
      predictions: '/api/predictions',
      dashboard: '/api/dashboard',
      health: '/api/health'
    },
    documentation: 'See /api/config for available options'
  });
});

// ===== ERROR HANDLING =====

// Error handling middleware (must be last)
app.use(errorHandler);

// Export the app
module.exports = app;