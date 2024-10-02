const express = require('express');
const { registerCustomer, verifyOTP,resendOTP  } = require('../controllers/customerController');

const router = express.Router();

// Route for registering a new customer and sending OTP
router.post('/addcustomer', registerCustomer);

// Route for verifying OTP
// Route for verifying OTP
router.post('/verifyOTP', verifyOTP);

router.post('/resendOTP', resendOTP);

module.exports = router;
