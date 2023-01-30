const { mongoose } = require('mongoose');
const { Chat, User } = require('../model/models');
const { validateId } = require('../utilities/utilities');

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

  const isChat = await Chat.findOne({
    groupChat: false,
    $and: [{ users: userId }, { users: req.user._id }],
  })
    .populate('users', '-password')
    .populate('latestMessage', '-chat');
  // Don't undersstand this yet not sure if needed
  // isChat = await User.populate(isChat, {
  // path: 'latestMessage.sender',
  // select: 'name pic email',
  // });
  if (isChat) return res.status(200).json(isChat);

  const chat = Chat({ chatName: 'sender', users: [req.user._id, userId] });
  await chat.save(async (err) => {
    if (!err) {
      const newChat = await Chat.find({ _id: chat._id }).populate('users', '-password');
      return res.status(201).json(newChat[0]);
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
    .populate('users', '-password')
    .populate('groupAdmin', '-password')
    .populate('latestMessage', '-chat');
  if (isGroupChat.length) return res.status(200).json(isGroupChat[0]);
  const groupChat = Chat({
    chatName: 'group',
    groupChat: true,
    users: allUserIds,
    groupAdmin: req.user._id.toString(),
  });
  groupChat.save(async (err) => {
    if (!err) {
      const chat = await Chat.find({ _id: groupChat._id })
        .populate('users', '-password')
        .populate('groupAdmin', '-password');
      return res.status(201).json(chat[0]);
    }
    return res.status(400).json({ message: `Error While Creating Group Chat ${err.message}` });
  });
};

const renameChat = async (req, res) => {
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
    .populate('users', '-password')
    .populate('groupAdmin', '-password');
  if (!chat) return res.status(404).json('Chat Not Found');
  // Status Code 204 Doesn't Return Anything
  return res.json(chat);
};

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
    .populate('users', '-password')
    .populate('groupAdmin', '-password');
  if (!chat) return res.status(404).json('Chat Not Found');
  return res.json(chat);
};

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
    .populate('users', '-password')
    .populate('groupAdmin', '-password');
  if (!chat) return res.status(404).json('Chat Not Found');
  return res.json(chat);
};

const deleteUserChat = async (req, res) => {
  const chatId = req.query.id;
  // Error Handling
  if (!chatId) {
    return res
      .status(400)
      .json({ message: 'Deleting a Chat Requires a Chat ID' });
  } if (!validateId(chatId)) {
    return res.status(400).json({ message: `Invalid Chat ID ${chatId}` });
  }

  try {
    await Chat.deleteOne({ _id: chatId });
    return res.status(200).json({ message: 'Chat Deleted Successfully' });
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error While Deleting Chat: ${err.message}` });
  }
};

module.exports = {
  createChat,
  getUserChats,
  deleteUserChat,
  createGroupChat,
  renameChat,
  addToGroup,
  removeFromGroup,
};
