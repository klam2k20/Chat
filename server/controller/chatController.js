const { mongoose } = require('mongoose');
const { Chat, User } = require('../model/models');

const createChat = async (req, res) => {
  const missingFieldMsg = 'Creating a Chat Requires a User ID';
  const conflictMsg = 'Creating a Chat Requires a User ID Besides Yours';
  const { userId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(userId)) { return res.status(400).json({ message: 'Invalid User ID' }); }
  if (userId === req.user._id.toString()) return res.status(400).json({ message: conflictMsg });
  if (!userId) return res.status(400).json({ message: missingFieldMsg });
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

  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(404).json({ message: 'User Not Found' });
  }

  const chat = Chat({ chatName: user.name, users: [req.user._id, userId] });
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

const deleteUserChat = async (req, res) => {
  const errorMsg = 'Deleting a Chat Requires a Chat ID';
  const chatId = req.query.id;
  if (!chatId) return res.status(400).json({ message: errorMsg });
  try {
    await Chat.deleteOne({ _id: chatId });
    return res.status(200).json({ message: 'Chat Deleted Successfully' });
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error While Deleting Chat: ${err.message}` });
  }
};

const createGroupChat = async (req, res) => {
  const missingRequiredMsg = 'Creating a Group Chat Requires a Chat Name and a List of User IDs';
  const userIdsLengthMsg = 'Creating a Group Chat Requires at Least 2 Additional User IDs Besides Yours';
  const { chatName, userIds } = req.body;
  console.log('1');
  if (!chatName || !userIds) return res.status(400).json({ message: missingRequiredMsg });
  console.log('2');
  let allUserIds = JSON.parse(userIds);
  console.log('3');
  allUserIds = allUserIds.filter((id) => id !== req.user._id.toString());
  console.log('4');
  const allObjectIds = allUserIds.map((id) => mongoose.Types.ObjectId(id));
  console.log('5');
  allObjectIds.push(req.user._id);
  console.log('6');
  if (allObjectIds.length < 3) return res.status(400).json({ message: userIdsLengthMsg });
  console.log('7');
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
  console.log('8');
  if (isGroupChat.length) return res.status(200).json(isGroupChat[0]);
  console.log('9');
  const groupChat = Chat({
    chatName,
    groupChat: true,
    users: [...allUserIds, req.user._id.toString()],
    groupAdmin: req.user._id.toString(),
  });
  console.log('10');
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
  const errorMsg = 'Renaming a Chat Requires a Chat ID and Chat Name';
  const { chatId, chatName } = req.body;
  if (!chatId || !chatName) return res.status(400).json({ message: errorMsg });
  const chat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true },
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password');
  if (!chat) return res.status(404).json('Chat Not Found');
  // Status Code 204 Doesn't Return Anything
  return res.json(chat);
};

const addToGroup = async (req, res) => {
  const errorMsg = 'Adding a Member to a Chat Requires a Chat ID and User ID';
  const { chatId, userId } = req.body;
  if (!chatId || !userId) return res.status(400).json({ message: errorMsg });
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
  const errorMsg = 'Removing a Member from a Chat Requires a Chat ID and User ID';
  const { chatId, userId } = req.body;
  if (!chatId || !userId) return res.status(400).json({ message: errorMsg });
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

module.exports = {
  createChat,
  getUserChats,
  deleteUserChat,
  createGroupChat,
  renameChat,
  addToGroup,
  removeFromGroup,
};
