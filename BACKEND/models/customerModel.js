const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Customer Schema
const customerSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,  // Store the OTP
  },
  otpExpires: {
    type: Date,  // Store OTP expiration time
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
