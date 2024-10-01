const Student = require('../models/addStudentModel');

exports.createStudent = async (req, res) => {
  try {
    console.log('Request Body:', req.body);

    // Destructure the request body to extract student details
    const {
      fname,
      lname,
      accYear,
      registrationNo,
      indexNo,
      phone,
      name,
      email,
      password,
      address
    } = req.body;

    // Create a new student
    const newStudent = await Student.create({
      fname,
      lname,
      accYear,
      registrationNo,
      indexNo,
      phone,
      name,
      email,
      password,
      address
    });

    console.log('New Student Created:', newStudent);

    // Respond with the created student
    res.status(201).json({
      status: 'success',
      data: {
        student: newStudent
      }
    });
  } catch (error) {
    console.error('Error creating student:', error);

    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
