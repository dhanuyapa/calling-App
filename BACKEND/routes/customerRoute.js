const express = require('express');
const { registerCustomer, verifyOTP } = require('../controllers/customerController');

const router = express.Router();

// Route for registering a new customer and sending OTP
router.post('/addcustomer', registerCustomer);

// Route for verifying OTP
router.post('/verifyOTP', verifyOTP);

module.exports = router;
