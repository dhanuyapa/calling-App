const Customer = require('../models/customerModel');

// Register a user with country and phone number
const registerCustomer = async (req, res) => {
  const { country, phoneNumber } = req.body;

  // Validation
  if (!country || !phoneNumber) {
    return res.status(400).json({ message: 'Country and phone number are required.' });
  }

  try {
    // Check if the phone number already exists
    const existingCustomer = await Customer.findOne({ phoneNumber });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Phone number is already registered.' });
    }

    // Create a new customer
    const newCustomer = new Customer({
      country,
      phoneNumber,
    });

    // Save the customer to the database
    await newCustomer.save();

    return res.status(201).json({ message: 'Customer registered successfully', customer: newCustomer });
  } catch (error) {
    console.error('Error registering customer:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { registerCustomer };
