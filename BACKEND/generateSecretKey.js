const fs = require('fs');
const crypto = require('crypto');

const generateRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};

const jwtSecretKey = generateRandomString(32); // Generate a 32-character random string

// Save the JWT secret key to a .env file
fs.writeFileSync('.env', `JWT_SECRET_KEY=${jwtSecretKey}\n`, { flag: 'a' });

console.log('JWT Secret Key generated and saved to .env file.');