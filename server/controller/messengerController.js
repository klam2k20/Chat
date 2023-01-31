const { Message, Chat, User } = require('../model/models');
const { validateId } = require('../utilities/utilities');

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
      await result.populate([{ path: 'sender', select: '-password' }, { path: 'chat' }]);
      await User.populate(result, { path: 'chat.users', select: '-password' });
      Chat.findByIdAndUpdate(result._id, { latestMessage: result });
      return res.json(result);
    }
    return res.status(400).json({ message: `Error While Sending Message ${err.message}` });
  });
};

// const getMessages = async (req, res) => {
//   console.log('get messages');
// };

module.exports = { sendMessage };
