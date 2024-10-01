const express = require('express');
const router = express.Router();
const addStudentController = require('../controller/addStudentController'); // Adjust path if needed

// Create a new student
router.post('/addStudent', addStudentController.createStudent);

module.exports = router;
