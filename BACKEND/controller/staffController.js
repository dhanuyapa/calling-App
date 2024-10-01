const Staff = require('../models/staffModel'); // Correct import for staff model
const bcrypt = require('bcrypt');

// Controller to handle staff signup
exports.signup = async (req, res) => {
    try {
        const { fname, lname, staffNo, nic, phone, email, department, password, confirmPassword } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'fail',
                message: 'Passwords do not match',
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new staff member
        const newStaff = await Staff.create({
            fname,
            lname,
            staffNo,
            nic,
            phone,
            email,
            department,
            password: hashedPassword
        });

        // Respond with the created staff member (excluding password)
        res.status(201).json({
            status: 'success',
            data: {
                staff: {
                    id: newStaff._id,
                    fname: newStaff.fname,
                    lname: newStaff.lname,
                    staffNo: newStaff.staffNo,
                    nic: newStaff.nic,
                    phone: newStaff.phone,
                    email: newStaff.email,
                    department: newStaff.department,
                },
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

{/* 
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide both email and password',
            });
        }

        // Find the customer by email
        const customer = await Customer.findOne({ email }).select('+password');
        if (!customer) {
            return res.status(401).json({
                status: 'fail',
                message: 'Incorrect email or password',
            });
        }

        // Check if the provided password is correct
        const isPasswordCorrect = await bcrypt.compare(password, customer.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                status: 'fail',
                message: 'Incorrect email or password',
            });
        }

        // Respond with success
        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            data: {
                customer: {
                    id: customer._id,
                    fname: customer.fname,
                    lname: customer.lname,
                    email: customer.email,
                    phone: customer.phone,
                    city: customer.city,
                    imageUrl: customer.imageUrl,
                },
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};
*/}