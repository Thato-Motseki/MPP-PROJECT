const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

// Import settings
const settings = require('./config');

const PORT = process.env.PORT || settings.server.port;

// MongoDB connection with improved error handling
const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || settings.database.mongodb.uri,
      settings.database.mongodb.options
    );
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('💡 Tip: Make sure MongoDB is running on your system');
    console.log('💡 You can install MongoDB from: https://www.mongodb.com/try/download/community');
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log('❌ Unhandled Rejection at:', promise, 'reason:', err);
  // Close server & exit process
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('❌ Uncaught Exception thrown:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('👋 SIGINT received - shutting down gracefully');
  await mongoose.connection.close();
  console.log('✅ MongoDB connection closed');
  process.exit(0);
});

// Start server
const startServer = async () => {
  try {
    // Connect to database first
    await connectDatabase();
    
    // Start Express server
   console.log('\n' + '='.repeat(50));
console.log(`🚀 ${settings.app.name} Server Started`);
console.log('='.repeat(50));
console.log(`📡 Server: http://localhost:${PORT}`);
console.log(`🌍 Environment: ${settings.server.environment}`);
console.log(`🔄 Node.js: ${process.version}`);
console.log(`🗣  Languages: ${settings.languages.supported.join(', ')}`);
console.log(`🏪 Regions: ${settings.regions.districts.length} districts`);
console.log(`🌾 Commodities: ${settings.commodities.crops.length + settings.commodities.livestock.length} items`);
console.log('='.repeat(50));
console.log(`💡 API endpoints available at:`);
console.log(`📊 Dashboard: http://localhost:${PORT}/api/dashboard`);
console.log(`⚙ Config: http://localhost:${PORT}/api/config`);
console.log(`❤ Health: http://localhost:${PORT}/api/health`);
console.log('='.repeat(50) + '\n');
    
    return server;
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the application
startServer();