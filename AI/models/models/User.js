const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [50, "First name cannot exceed 50 characters"],
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },

    userType: {
      type: String,
      enum: ["farmer", "vendor", "admin"],
      default: "farmer",
    },

    region: {
      type: String,
      required: [true, "Region is required"],
      enum: [
        "Maseru",
        "Leribe",
        "Berea",
        "Mafeteng",
        "Mohale's Hoek",
        "Quthing",
        "Qacha's Nek",
        "Butha-Buthe",
        "Thaba-Tseka",
        "Mokhotlong",
      ],
    },

    phone: {
      type: String,
      trim: true,
    },

    language: {
      type: String,
      enum: ["en", "st"],
      default: "en",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    preferences: {
      notifications: { type: Boolean, default: true },
      preferredCommodities: [{ type: String }],
      preferredMarkets: [{ type: String }],
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model("User", userSchema);
