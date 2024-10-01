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
    unique: true,  // Ensure the phone number is unique
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

// Define and export the Customer model
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
