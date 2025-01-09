const mongoose = require('mongoose');

// User schema definition
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
  },
  email: {
      type: String,
      required: true,
      unique: true,
  },
  phoneNumber: {
      type: String,
      required: true,
      match: /^\d{10}$/, // Validate 10-digit phone number
  },
  password: {
      type: String,
      required: true,
  },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

