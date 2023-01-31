const express = require('express');
const { sendMessage, getMessages } = require('../controller/messengerController');
const { authenicateToken } = require('../middleware/middleware');

const router = express.Router();

router.route('/').post(authenicateToken, sendMessage);
router.route('/:chat').get(authenicateToken, getMessages);

module.exports = router;
