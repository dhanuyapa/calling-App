const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    staffNo: {
        type: String,
        required: true,
        unique: true
    },
    nic: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
