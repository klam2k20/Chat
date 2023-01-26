const jwt = require('jsonwebtoken');
const { User } = require('../model/models');

const authenicateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.sendStatus(401);
    req.user = await User.findById(decoded._id).select('-password');
    next();
  });
};

const notFound404 = (req, res, next) => {
  res.status(404).json({ message: `API Path Unknown: ${req.originalUrl}` });
  next();
};

module.exports = { authenicateToken, notFound404 };
