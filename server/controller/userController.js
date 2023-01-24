const models = require('../model/models');
const { generateJWT } = require('../utilities/auth');

const registerUser = async (req, res) => {
  if (!Object.keys(req.body).length) return res.status(400).json({ message: 'User Body is Required' });
  const {
    name, email, password, photo,
  } = req.body;

  // Validation
  if (!name || !email || !password) return res.status(400).json({ message: 'Please Enter all Required Fields' });
  const userExists = await models.User.findOne({ email });
  if (userExists) return res.status(409).json({ message: 'Email Already Registered' });

  const user = models.User({
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

const loginUser = (req, res) => {
  console.log(req, res);
};

module.exports = { registerUser, loginUser };
