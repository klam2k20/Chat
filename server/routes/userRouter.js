const router = require('express').Router();

const controller = require('../controller/userController');

router.route('/').post(controller.registerUser);

router.route('/login').post(controller.loginUser);

module.exports = router;
