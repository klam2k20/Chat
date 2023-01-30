const jwt = require('jsonwebtoken');
const { mongoose } = require('mongoose');

const generateJWT = (_id) => jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '1d' });

const validateId = (userId) => mongoose.Types.ObjectId.isValid(userId);

module.exports = { generateJWT, validateId };
