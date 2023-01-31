const express = require('express');
const {
  createChat,
  getUserChats,
  createGroupChat,
  renameGroupChat,
  addToGroup,
  removeFromGroup,
} = require('../controller/chatController');
const { authenicateToken } = require('../middleware/middleware');

const router = express.Router();

router.route('/').post(authenicateToken, createChat)
  .get(authenicateToken, getUserChats);

router.route('/group').post(authenicateToken, createGroupChat);
router.route('/renameGroupChat').put(authenicateToken, renameGroupChat);
router.route('/addToGroup').put(authenicateToken, addToGroup);
router.route('/removeFromGroup').put(authenicateToken, removeFromGroup);

module.exports = router;
