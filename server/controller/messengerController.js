const { Message, Chat, User } = require('../model/models');
const { validateId } = require('../utilities/utilities');

// POST /api/message
const sendMessage = async (req, res) => {
  const { chat, content } = req.body;

  // Error Handling
  if (!chat || !content) {
    return res.status(400).json({ message: 'Sending a Message Requires a ChatId and Message' });
  } if (!validateId(chat)) {
    return res.status(400).json({ message: 'Invalid Chat ID' });
  }

  const message = Message({
    sender: req.user._id,
    content,
    chat,
  });

  await message.save(async (err, result) => {
    if (!err) {
      await result.populate([{ path: 'sender', select: '_id name email photo' }, { path: 'chat' }]);
      await User.populate(result, { path: 'chat.users', select: '_id name email photo' });
      Chat.findByIdAndUpdate(result._id, { latestMessage: result });
      return res.json(result);
    }
    return res.status(400).json({ message: `Error While Sending Message ${err.message}` });
  });
};

// GET /api/message:chat
const getMessages = async (req, res) => {
  const chatId = req.params.chat;

  // Error Handling
  if (!chatId) {
    return res
      .status(400)
      .json({ message: 'Fetching Messages For a Chat Requires a Chat ID' });
  }
  if (!validateId(chatId)) return res.status(400).json({ message: 'Invalid Chat ID' });

  const messages = await Message.find({ chat: chatId })
    .populate('sender', '_id name email photo')
    .populate('chat');
  await User.populate(messages, {
    path: 'chat.users',
    select: '_id name email photo',
  });
  return res.json(messages);
};

module.exports = { sendMessage, getMessages };
