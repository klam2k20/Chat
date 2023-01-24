const jwt = require('jsonwebtoken');

const generateJWT = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });

module.exports = { generateJWT };
