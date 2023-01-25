const notFound404 = (req, res, next) => {
  res.status(404).json({ message: `API Path Unknown: ${req.originalUrl}` });
  next();
};

module.exports = { notFound404 };
