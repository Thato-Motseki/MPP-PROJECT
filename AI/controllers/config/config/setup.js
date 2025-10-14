const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const settings = require("./config");
const User = require("./models/User");
const Price = require("./models/Price");

const setupDatabase = async () => {
  try {
    console.log("🔄 Setting up SmartMarket Lesotho database...");

    // Connect to database
    await mongoose.connect(
      process.env.MONGODB_URI || settings.database.mongodb.uri,
      settings.database.mongodb.options
    );

    console.log("✅ Connected to MongoDB");

    // Clear existing data (optional - for development)
    if (process.env.NODE_ENV === "development") {
      await User.deleteMany({});
      await Price.deleteMany({});
      console.log("🧹 Cleared existing data");
    }

    // Hash admin password
    const hashedPassword = await bcrypt.hash(
      "admin123",
      settings.authentication.password.saltRounds
    );

    // Create admin user
    const adminUser = new User({
      firstName: "Admin",
      lastName: "User",
      email: "admin@smartmarket.ls",
      password: hashedPassword,
      region: "Maseru",
      userType: "admin",
      phone: "+266 1234 5678",
      isVerified: true,
    });

    await adminUser.save();
    console.log("👨‍💼 Admin user created: admin@smartmarket.ls / admin123");

    // Create sample prices
    const samplePrices = [
      {
        commodity: "maize",
        market: "Maseru Central Market",
        district: "Maseru",
        price: 350,
        unit: "50kg bag",
        source: "admin",
        verified: true,
      },
      {
        commodity: "tomatoes",
        market: "Maseru Central Market",
        district: "Maseru",
        price: 25,
        unit: "kg",
        source: "admin",
        verified: true,
      },
      {
        commodity: "potatoes",
        market: "Leribe Main Market",
        district: "Leribe",
        price: 20,
        unit: "kg",
        source: "admin",
        verified: true,
      },
      {
        commodity: "chicken",
        market: "Maseru Central Market",
        district: "Maseru",
        price: 65,
        unit: "kg",
        source: "admin",
        verified: true,
      },
      {
        commodity: "beef",
        market: "Berea Market",
        district: "Berea",
        price: 120,
        unit: "kg",
        source: "admin",
        verified: true,
      },
    ];

    await Price.insertMany(samplePrices);
    console.log(`📊 Added ${samplePrices.length} sample price records`);

    console.log("\n✅ Database setup completed successfully!");
    console.log("\n🎯 Next steps:");
    console.log("   1. Run: npm run dev");
    console.log("   2. Test API: http://localhost:5000/api/health");
    console.log("   3. Check dashboard: http://localhost:5000/api/dashboard");
    console.log(
      "   4. Test authentication: http://localhost:5000/api/auth/register"
    );

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Setup failed:", error);
    process.exit(1);
  }
};
