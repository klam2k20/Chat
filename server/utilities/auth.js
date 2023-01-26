const jwt = require('jsonwebtoken');

const generateJWT = (_id) => jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '30d' });

module.exports = { generateJWT };
