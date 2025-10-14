const fs = require('fs');
const path = require('path');

// Load language files
const en = require('../locales/en.json');
const st = require('../locales/st.json');

const languageMiddleware = (req, res, next) => {
  // Get language preference from (in order of priority):
  // 1. Query parameter (?lang=st)
  // 2. Header (Accept-Language)
  // 3. Default to English
  
  const langFromQuery = req.query.lang;
  const langFromHeader = req.headers['accept-language'];
  
  if (langFromQuery === 'st') {
    req.language = st;
  } else if (langFromHeader && (langFromHeader.includes('st') || langFromHeader.includes('sesotho'))) {
    req.language = st;
  } else {
    req.language = en;
  }
  
  // Add language code to request for reference
  req.languageCode = (req.language === st) ? 'st' : 'en';
  
  next();
};

module.exports = languageMiddleware;