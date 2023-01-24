const chats = require('../data/data');

const getChats = (req, res) => {
  res.send(chats);
};

const getChat = (req, res) => {
  const { id } = req.params;
  const chat = chats.find((c) => c._id === id);
  if (chat) res.send(chat);
  else res.status(400).send({ message: 'Chat Not Found' });
};

module.exports = { getChats, getChat };
