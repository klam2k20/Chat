const router = require('express').Router();

const { registerUser, filterUsers, loginUser } = require('../controller/userController');
const { authenicateToken } = require('../middleware/middleware');

router.route('/').post(registerUser)
  .get(authenicateToken, filterUsers);

router.route('/login').post(loginUser);

module.exports = router;
