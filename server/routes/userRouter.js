const router = require('express').Router();

const controller = require('../controller/userController');
const { authenicateToken } = require('../middleware/middleware');

router.route('/').post(controller.registerUser)
  .get(authenicateToken, controller.filterUsers);

router.route('/login').post(controller.loginUser);

module.exports = router;
