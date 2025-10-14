const validateRegistration = (req, res, next) => {
  const { firstName, lastName, email, password, region } = req.body;
  const errors = [];
  
  if (!firstName || firstName.trim().length < 2) {
    errors.push('First name must be at least 2 characters long');
  }
  
  if (!lastName || lastName.trim().length < 2) {
    errors.push('Last name must be at least 2 characters long');
  }
  
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push('Valid email is required');
  }
  
  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  
  if (!region) {
    errors.push('Region is required');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({ 
      error: req.language?.validationError || 'Validation failed',
      details: errors 
    });
  }
  
  next();
};

const validatePriceData = (req, res, next) => {
  const { commodity, market, district, price, unit } = req.body;
  const errors = [];
  
  if (!commodity) errors.push('Commodity is required');
  if (!market) errors.push('Market is required');
  if (!district) errors.push('District is required');
  if (!price || price < 0) errors.push('Valid price is required');
  if (!unit) errors.push('Unit is required');
  
  if (errors.length > 0) {
    return res.status(400).json({ 
      error: req.language?.validationError || 'Validation failed',
      details: errors 
    });
  }
  
  next();
};

module.exports = {
  validateRegistration,
  validatePriceData
};