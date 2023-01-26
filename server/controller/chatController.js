const { Chat } = require('../model/models');

const createChat = async (req, res) => {
  const errorMsg = 'Creating a Chat Requires a User ID';
  if (!Object.keys(req.body).length) return res.status(400).json({ message: errorMsg });
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: errorMsg });
  const isChat = await Chat.find({
    isGroupChat: false,
    $and: [{ users: userId }, { users: req.user._id }],
  })
    .populate('users', '-password')
    .populate('latestMessage', '-chat');
  // Don't undersstand this yet not sure if needed
  // isChat = await User.populate(isChat, {
  // path: 'latestMessage.sender',
  // select: 'name pic email',
  // });
  if (isChat.length > 0) return res.status(200).json(isChat);

  const chat = Chat({ chatName: 'sender', users: [req.user._id, userId] });
  await chat.save(async (err) => {
    if (!err) {
      const newChat = await Chat.find({ _id: chat._id }).populate('users', '-password');
      return res.status(201).json(newChat);
    }
    return res
      .status(400)
      .json({ message: `Error While Creating Chat: ${err}` });
  });
};

const getUserChats = async (req, res) => {
  const chats = await Chat.find({ users: req.user._id })
    .populate('users', '-password')
    .populate('latestMessage', '-chat')
    .populate('groupAdmin', '-password')
    .sort({ updatedAt: -1 });

  // chats = await User.populate(chats, {
  // path: 'latestMessage.sender',
  // select: 'name pic email',
  // });
  res.status(200).json(chats);
};

const createGroupChat = (req, res) => {
  const errorMsg = 'Creating a Group Chat Requires a Chat Name and a List of User IDs';
  if (!Object.keys(req.body).length) return res.status(400).json({ message: errorMsg });
  const { chatName, userIds } = req.body;
  if (!chatName || !userIds) return res.status(400).json({ message: errorMsg });
};

const renameChat = (req, res) => {
  const errorMsg = 'Renaming a Group Chat Requires a New Name and a Chat ID';
  if (!Object.keys(req.body).length) return res.status(400).json({ message: errorMsg });
  const { chatId, chatName } = req.body;
  if (!chatId || !chatName) return res.status(400).json({ message: errorMsg });
};

const addToGroup = (req, res) => {
  const errorMsg = 'Adding a Member to a Chat Requires a Chat ID and User ID';
  if (!Object.keys(req.body).length) return res.status(400).json({ message: errorMsg });
  const { chatId, userId } = req.body;
  if (!chatId || !userId) return res.status(400).json({ message: errorMsg });
};

const removeFromGroup = (req, res) => {
  const errorMsg = 'Removing a Member from a Chat Requires a Chat ID and User ID';
  if (!Object.keys(req.body).length) return res.status(400).json({ message: errorMsg });
  const { chatId, userId } = req.body;
  if (!chatId || !userId) return res.status(400).json({ message: errorMsg });
};

module.exports = {
  createChat, getUserChats, createGroupChat, renameChat, addToGroup, removeFromGroup,
};
