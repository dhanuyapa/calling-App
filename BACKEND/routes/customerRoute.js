const express = require('express');
const { registerCustomer } = require('../controllers/customerController');

const router = express.Router();

// Route for registering a new customer
router.post('/addcustomer', registerCustomer);

module.exports = router;
