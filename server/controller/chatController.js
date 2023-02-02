const { mongoose } = require('mongoose');
const { Chat, User } = require('../model/models');
const { validateId } = require('../utilities/utilities');

// POST /api/chat
const createChat = async (req, res) => {
  const { userId } = req.body;

  // Error Handling
  if (!userId) {
    return res
      .status(400)
      .json({ message: 'Creating a Chat Requires a User ID' });
  } if (!validateId(userId)) {
    return res.status(400).json({ message: `Invalid User ID ${userId}` });
  } if (userId === req.user._id.toString()) {
    return res
      .status(400)
      .json({ message: 'Creating a Chat Requires a User ID Besides Yours' });
  }
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(404).json({ message: 'User Not Found' });
  }

  let isChat = await Chat.findOne({
    groupChat: false,
    $and: [{ users: userId }, { users: req.user._id }],
  }).populate('users', '_id name email photo')
    .populate('latestMessage', '_id sender content');
  isChat = await User.populate(isChat, {
    path: 'latestMessage.sender',
    select: '_id name email photo',
  });
  if (isChat) return res.status(200).json(isChat);

  const chat = Chat({ chatName: 'sender', users: [req.user._id, userId] });
  await chat.save(async (err, result) => {
    if (!err) {
      const newChat = await Chat.find({ _id: result._id }).populate(
        'users',
        '_id name email photo',
      );
      return res.status(201).json(newChat[0]);
    }
    return res
      .status(400)
      .json({ message: `Error While Creating Chat: ${err}` });
  });
};

// GET /api/chat
const getUserChats = async (req, res) => {
  const chats = await Chat.find(
    { $and: [{ users: req.user._id }, { latestMessage: { $ne: null } }] },
  )
    .populate('users', '_id name email photo')
    .populate('latestMessage', '_id sender content')
    .populate('groupAdmin', '_id name email photo')
    .sort({ updatedAt: -1 });
  await User.populate(chats, {
    path: 'latestMessage.sender',
    select: '_id name pic email',
  });
  return res.status(200).json(chats);
};

// POST /api/chat/group
const createGroupChat = async (req, res) => {
  const { userIds } = req.body;

  // Error Handling
  if (!userIds) {
    return res
      .status(400)
      .json({
        message:
        'Creating a Group Chat Requires a List of User IDs',
      });
  }
  let allUserIds = JSON.parse(userIds);
  allUserIds.push(req.user._id.toString());
  allUserIds = [...new Set(allUserIds)];
  let allObjectIds;
  try {
    allObjectIds = allUserIds.map((id) => {
      if (!validateId(id)) throw Error(`Invalid User ID ${id}`);
      return mongoose.Types.ObjectId(id);
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  if (allObjectIds.length < 3) {
    return res
      .status(400)
      .json({
        message:
        'Creating a Group Chat Requires at Least 2 Additional User IDs Besides Yours',
      });
  }

  const isGroupChat = await Chat.find({
    isGroupChat: true,
    $and: [
      { users: { $size: allObjectIds.length } },
      { users: { $all: allObjectIds } },
      // { $setEquals: ['users', allUserIds] },
    ],
  })
    .populate('users', '_id name email photo')
    .populate('groupAdmin', '_id name email photo')
    .populate('latestMessage', '_id sender content');
  if (isGroupChat.length) {
    User.populate(isGroupChat[0], { path: 'latestMessage.sender', select: '_id name email photo' });
    return res.status(200).json(isGroupChat[0]);
  }

  const groupChat = Chat({
    chatName: 'group',
    groupChat: true,
    users: allUserIds,
    groupAdmin: req.user._id.toString(),
  });
  groupChat.save(async (err, result) => {
    if (!err) {
      const chat = await Chat.find({ _id: result._id })
        .populate('users', '_id name email photo')
        .populate('groupAdmin', '_id name email photo');
      return res.status(201).json(chat[0]);
    }
    return res.status(400).json({ message: `Error While Creating Group Chat ${err.message}` });
  });
};

// PUT /api/chat/renameGroupChat
const renameGroupChat = async (req, res) => {
  const { chatId, chatName } = req.body;

  // Error Handling
  if (!chatId || !chatName) {
    return res
      .status(400)
      .json({ message: 'Renaming a Chat Requires a Chat ID and Chat Name' });
  } if (!validateId(chatId)) {
    return res.status(400).json({ message: `Invalid Chat ID ${chatId}` });
  }

  const chat = await Chat.findByIdAndUpdate(chatId, { chatName }, { new: true })
    .populate('users', '_id name email photo')
    .populate('groupAdmin', '_id name email photo');
  if (!chat) return res.status(404).json('Chat Not Found');
  // Status Code 204 Doesn't Return Anything
  await User.populate(chat, { path: 'latestMessage.sender', sender: '_id name email photo' });
  return res.json(chat);
};

// PUT /api/chat/addToGroup
const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  // Error Handling
  if (!chatId || !userId) {
    return res
      .status(400)
      .json({
        message: 'Adding a Member to a Chat Requires a Chat ID and User ID',
      });
  } if (!validateId(chatId)) {
    return res.status(400).json({ message: `Invalid Chat ID ${chatId}` });
  } if (!validateId(userId)) {
    return res.status(400).json({ message: `Invalid User ID ${userId}` });
  }

  const chat = await Chat.findByIdAndUpdate(
    chatId,
    { $addToSet: { users: userId } },
    { new: true },
  )
    .populate('users', '_id name email photo')
    .populate('groupAdmin', '_id name email photo');
  if (!chat) return res.status(404).json('Chat Not Found');
  await User.populate(chat, { path: 'latestMessage.sender', select: '_id name email photo' });
  return res.json(chat);
};

// PUT /api/chat/removeFromGroup
const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;
  // Error Handling
  if (!chatId || !userId) {
    return res
      .status(400)
      .json({
        message: 'Removing a Member from a Chat Requires a Chat ID and User ID',
      });
  } if (!validateId(chatId)) {
    return res.status(400).json({ message: `Invalid Chat ID ${chatId}` });
  } if (!validateId(userId)) {
    return res.status(400).json({ message: `Invalid User ID ${userId}` });
  }

  const chat = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true },
  )
    .populate('users', '_id name email photo')
    .populate('groupAdmin', '_id name email photo');
  if (!chat) return res.status(404).json('Chat Not Found');
  await User.populate(chat, {
    path: 'latestMessage.sender',
    select: '_id name email photo',
  });
  return res.json(chat);
};

module.exports = {
  createChat,
  getUserChats,
  createGroupChat,
  renameGroupChat,
  addToGroup,
  removeFromGroup,
};
