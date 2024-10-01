const express = require('express');
const router = express.Router();
const staffController = require('../controller/staffController'); // Correct import

// Route to create a new staff member (signup)
router.post('/signup', staffController.signup);

module.exports = router;
