const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Student Schema
const studentSchema = new Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  accYear: {
    type: String,
    required: true
  },
  registrationNo: {
    type: String,
    required: true
  },
  indexNo: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  name: String,
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

// Define and export the Student model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
