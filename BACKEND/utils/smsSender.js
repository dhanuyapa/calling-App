const fetch = require('node-fetch');
let token;
let transactionId;

// Function to generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
};

// Function to generate unique transaction ID
const generateTransactionId = () => {
  const timestamp = Date.now();
  const randomValue = Math.floor(Math.random() * 1000);
  transactionId = `${timestamp}${randomValue}`;
};

// Get SMS Token
const getSmsToken = (numbers, message) => {
  fetch('https://e-sms.dialog.lk/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'your_username',  // Replace with your Dialog API username
      password: 'your_password',  // Replace with your Dialog API password
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      token = data.token;
      sendSMS(numbers, message); // Send SMS after token is obtained
    })
    .catch((err) => {
      console.log(err.message || err.error);
    });
};

// Send SMS
const sendSMS = (numbers, message) => {
  if (token) {
    generateTransactionId();
    fetch('https://e-sms.dialog.lk/api/v1/sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({
        msisdn: [numbers],
        sourceAddress: 'YourSource', // Replace with your source address
        message: message,
        transaction_id: transactionId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message || err.error);
      });
  } else {
    getSmsToken(numbers, message); // Get token if it's not available
  }
};

module.exports = { generateOTP, sendSMS };
