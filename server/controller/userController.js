const { User } = require('../model/models');
const { generateJWT } = require('../utilities/utilities');

// POST /api/user/
const registerUser = async (req, res) => {
  const { name, email, password, photo } = req.body;

  // Error Handling
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({
        message: 'Registering a User Requires a Name, Email, and Password',
      });
  }
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(409).json({ message: 'Email Already Registered' });

  const user = User({
    name,
    email,
    password,
    photo,
  });

  await user.save((err, result) => {
    if (!err) {
      return res.status(201).json({
        __id: result._id,
        name: result.name,
        email: result.email,
        photo: result.photo,
        token: generateJWT(result._id),
      });
    }
    return res.status(400).json({ message: `Error While Registering User: ${err.message}` });
  });
};

// POST /api/user/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Logging in a User Requires an Email and Password' });
  const user = await User.findOne({ email });
  if (user && (await user.validatePassword(password))) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      token: generateJWT(user._id),
    });
  }
  return res.status(401).json({ message: 'Invalid Email or Password' });
};

// GET /api/user?search=query
const filterUsers = async (req, res) => {
  let filter = req.query.search;

  // Error Handling
  if (!filter) return res.status(400).json({ message: 'Search Query Missing' });
  // Find with an empty body returns none -({})
  // Find without a body returns all -()
  filter = '^'.concat(filter);

  const query = filter ? {
    $or: [
      { name: { $regex: filter, $options: '-im' } },
      { email: { $regex: filter, $options: '-im' } },
    ],
  } : {};

  const users = await User.find(query).find({ _id: { $ne: req.user._id } });
  return res.json(users);
};

module.exports = { registerUser, loginUser, filterUsers };
