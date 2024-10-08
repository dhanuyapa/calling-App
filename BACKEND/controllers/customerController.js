const Customer = require('../models/customerModel');
const { generateOTP, sendSMS } = require('../utils/smsSender');

// Register a customer and send OTP
const registerCustomer = async (req, res) => {
  const { country, phoneNumber } = req.body;

  // Validation
  if (!country || !phoneNumber) {
    return res.status(400).json({ message: 'Country and phone number are required.' });
  }

  try {
    // Check if the phone number already exists
    let existingCustomer = await Customer.findOne({ phoneNumber });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Phone number is already registered.' });
    }

    // Generate OTP and expiration time
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 20  * 1000); // OTP valid for 10 minutes

    // Create a new customer
    const newCustomer = new Customer({
      country,
      phoneNumber,
      otp,
      otpExpires,
    });

    // Save the customer to the database
    await newCustomer.save();

    // Send the OTP via SMS
    const message = `Your OTP is ${otp}. It will expire in 10 minutes.`;
    sendSMS(phoneNumber, message);

    return res.status(201).json({ message: 'Customer registered successfully, OTP sent.' });
  } catch (error) {
    console.error('Error registering customer:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) {
    return res.status(400).json({ message: 'Phone number and OTP are required.' });
  }

  try {
    const customer = await Customer.findOne({ phoneNumber, otp });

    if (!customer) {
      return res.status(400).json({ message: 'Invalid OTP or phone number.' });
    }

    if (customer.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'OTP has expired.' });
    }

    return res.status(200).json({ message: 'OTP verified successfully.' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// Resend OTP
const resendOTP = async (req, res) => {
  const { phoneNumber } = req.body;

  // Validation: Ensure phoneNumber is provided
  if (!phoneNumber) {
    return res.status(400).json({ message: 'Phone number is required.' });
  }

  try {
    // Find the customer by phone number
    const customer = await Customer.findOne({ phoneNumber });

    // If customer doesn't exist
    if (!customer) {
      return res.status(400).json({ message: 'Invalid phone number.' });
    }

    // Generate a new OTP and expiration time
    const newOtp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    // Update the customer with the new OTP and expiration
    customer.otp = newOtp;
    customer.otpExpires = otpExpires;
    await customer.save();

    // Send the new OTP via SMS
    const message = `Your new OTP is ${newOtp}. It will expire in 10 minutes.`;
    sendSMS(phoneNumber, message);

    return res.status(200).json({ message: 'New OTP has been sent to your mobile number.' });
  } catch (error) {
    console.error('Error resending OTP:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { registerCustomer, verifyOTP ,resendOTP };
