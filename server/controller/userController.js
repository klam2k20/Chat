const { User } = require('../model/models');
const { generateJWT } = require('../utilities/auth');

// POST /api/user/
const registerUser = async (req, res) => {
  const errorMsg = 'Registering a User Requires a Name, Email, and Password';
  const {
    name, email, password, photo,
  } = req.body;

  // Validation
  if (!name || !email || !password) return res.status(400).json({ message: errorMsg });
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(409).json({ message: 'Email Already Registered' });

  const user = User({
    name,
    email,
    password,
    photo,
  });

  await user.save((err) => {
    if (!err) {
      return res.status(201).json({
        __id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo,
        token: generateJWT(user._id),
      });
    }
    return res.status(400).json({ message: `Error While Registering User: ${err}` });
  });
};

// POST /api/user/login
const loginUser = async (req, res) => {
  const errorMsg = 'Logging in a User Requires an Email and Password';
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: errorMsg });
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
  const filter = req.query.search;
  if (!filter) return res.status(400).json({ message: 'Search Query Missing' });
  // Find with an empty body returns none -({})
  // Find without a body returns all -()
  const query = filter ? {
    $or: [
      { name: { $regex: filter, $options: '-i' } },
      { email: { $regex: filter, $options: '-i' } },
    ],
  } : {};
  const users = await User.find(query).find({ _id: { $ne: req.user._id } });
  res.json(users);
};

module.exports = { registerUser, loginUser, filterUsers };
