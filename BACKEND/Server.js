const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const staffRoute = require('./routes/addStaffRoute'); // Correct import for staff route
const addStudentRoutes = require('./routes/addStudentRoute'); // Correct import for student route

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8070;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/staff', staffRoute); // Correct path for staff route
app.use('/api/students', addStudentRoutes); // Correct path for student route

// MongoDB Connection
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
connection.once('open', () => {
    console.log('MongoDB Connection Success!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
