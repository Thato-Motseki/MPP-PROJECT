const fs = require("fs");
const path = require("path");

// Load settings from JSON file
const settingsPath = path.join(__dirname, "settings.json");
const settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));

// Override with environment variables if they exist
if (process.env.MONGODB_URI) {
  settings.database.mongodb.uri = process.env.MONGODB_URI;
}

if (process.env.JWT_SECRET) {
  settings.authentication.jwt.secret = process.env.JWT_SECRET;
}

if (process.env.ML_URL) {
  settings.ml.apiUrl = process.env.ML_API_URL;
}

// Export settings
module.exports = settings;
