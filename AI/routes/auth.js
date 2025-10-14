const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const settings = require('../config');
const { validateRegistration } = require('../middleware/validation');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', validateRegistration, async (req, res) => {
  try {
    const { firstName, lastName, email, password, region, userType, phone } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        error: req.language.userExists || 'User already exists' 
      });
    }
    
    // Create user
    const user = new User({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase(),
      password,
      region,
      userType: userType || 'farmer',
      phone: phone || ''
    });
    
    await user.save();
    
    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      settings.authentication.jwt.secret,
      { 
        expiresIn: settings.authentication.jwt.expiresIn,
        algorithm: settings.authentication.jwt.algorithm
      }
    );
    
    res.status(201).json({
      success: true,
      message: req.language.registrationSuccess || 'Registration successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        region: user.region,
        userType: user.userType,
        language: user.language
      }
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      error: req.language.serverError || 'Registration failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        error: req.language.validationError || 'Email and password are required' 
      });
    }
    
    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ 
        error: req.language.invalidCredentials || 'Invalid credentials' 
      });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ 
        error: req.language.invalidCredentials || 'Invalid credentials' 
      });
    }
    
    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      settings.authentication.jwt.secret,
      { 
        expiresIn: settings.authentication.jwt.expiresIn,
        algorithm: settings.authentication.jwt.algorithm
      }
    );
    
    res.json({
      success: true,
      message: req.language.loginSuccess || 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        region: user.region,
        userType: user.userType,
        language: user.language
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: req.language.serverError || 'Login failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', authMiddleware, async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      error: req.language.serverError || 'Failed to get user data' 
    });
  }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, region, phone, language, preferences } = req.body;
    const user = req.user;
    
    // Update allowed fields
    if (firstName) user.firstName = firstName.trim();
    if (lastName) user.lastName = lastName.trim();
    if (region) user.region = region;
    if (phone) user.phone = phone;
    if (language) user.language = language;
    if (preferences) user.preferences = { ...user.preferences, ...preferences };
    
    await user.save();
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
    
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ 
      error: req.language.serverError || 'Failed to update profile' 
    });
  }
});

module.exports=router;