const jwt = require('jsonwebtoken');
const User = require('../models/User');
const settings = require('../config');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: req.language?.accessDenied || 'Access denied. No token provided.' 
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, settings.authentication.jwt.secret);
    
    // Find user and attach to request
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ 
        error: req.language?.invalidToken || 'Invalid token.' 
      });
    }
    
    req.user = user;
    next();
    
  } catch (error) {
    res.status(401).json({ 
      error: req.language?.invalidToken || 'Invalid token.' 
    });
  }
};

// Optional auth middleware (user is attached if token exists, but not required)
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (token) {
      const decoded = jwt.verify(token, settings.authentication.jwt.secret);
      const user = await User.findById(decoded.userId).select('-password');
      if (user) {
        req.user = user;
      }
    }
    
    next();
  } catch (error) {
    // Continue without user for optional auth
    next();
  }
};

module.exports = { authMiddleware, optionalAuth };