const { User } = require('../model/models');
const { generateJWT } = require('../utilities/auth');

const registerUser = async (req, res) => {
  if (!Object.keys(req.body).length) return res.status(400).json({ message: 'Registration Body is Required' });
  const {
    name, email, password, photo,
  } = req.body;

  // Validation
  if (!name || !email || !password) return res.status(400).json({ message: 'Please Enter all Required Fields' });
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

const loginUser = async (req, res) => {
  if (!Object.keys(req.body).length) return res.status(400).json({ message: 'Login Body is Required' });
  const { email, password } = req.body;
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

module.exports = { registerUser, loginUser };
