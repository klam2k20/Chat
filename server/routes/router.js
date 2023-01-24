const router = require('express').Router();

const controller = require('../controller/controller');

router.route('/api/chat').get(controller.getChats);

router.route('/api/chat/:id').get(controller.getChat);

module.exports = router;
