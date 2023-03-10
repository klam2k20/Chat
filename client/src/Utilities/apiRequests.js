import axios from 'axios';

const baseUrl = 'http://localhost:8080';

const loginUser = (email, password) => {
  const headers = { 'context-type': 'application/json' };
  return axios.post(
    baseUrl.concat('/api/user/login'),
    { email, password },
    headers,
  );
};

const createUser = (name, email, password, photo) => {
  const headers = { 'context-type': 'application/json' };
  return axios.post(
    baseUrl.concat('/api/user'),
    { name, email, password, photo },
    headers,
  );
};

const getUsers = (token, query) => {
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(baseUrl.concat(`/api/user?search=${query}`), header);
};

const getChats = (token) => {
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(baseUrl.concat('/api/chat'), header);
};

const createOrFetchChat = (token, userId) => {
  const header = {
    'context-type': 'application/json',
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.post(baseUrl.concat('/api/chat'), { userId }, header);
};

const createOrFetchGroupChat = (token, chatName, userIds) => {
  const header = {
    'context-type': 'application/json',
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.post(baseUrl.concat('/api/chat/group'), { chatName, userIds }, header);
};

const renameGroupChat = (token, chatId, chatName) => {
  const header = {
    'context-type': 'application/json',
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.put(
    baseUrl.concat('/api/chat/renameGroupChat'),
    { chatId, chatName },
    header,
  );
};

const addToGroup = (token, chatId, userId) => {
  const header = {
    'context-type': 'application/json',
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.put(
    baseUrl.concat('/api/chat/addToGroup'),
    { chatId, userId },
    header,
  );
};

const removeFromGroup = (token, chatId, userId) => {
  const header = {
    'context-type': 'application/json',
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.put(
    baseUrl.concat('/api/chat/removeFromGroup'),
    { chatId, userId },
    header,
  );
};

const sendMessage = (token, chat, content) => {
  const header = {
    'context-type': 'application/json',
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.post(baseUrl.concat('/api/message'), { chat, content }, header);
};

const getMessages = (token, chatId) => {
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(baseUrl.concat(`/api/message/${chatId}`), header);
};

export {
  loginUser,
  createUser,
  getUsers,
  getChats,
  createOrFetchChat,
  createOrFetchGroupChat,
  renameGroupChat,
  addToGroup,
  removeFromGroup,
  sendMessage,
  getMessages,
};
