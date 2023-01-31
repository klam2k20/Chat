const express = require('express');
const { sendMessage } = require('../controller/messengerController');
const { authenicateToken } = require('../middleware/middleware');

const router = express.Router();

router.route('/').post(authenicateToken, sendMessage);
// router.route('/:chatId').get(authenicateToken, getMessages);

module.exports = router;
