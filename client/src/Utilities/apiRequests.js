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

const createUser = (name, email, password) => {
  const headers = { 'context-type': 'application/json' };
  return axios.post(
    baseUrl.concat('/api/user'),
    { name, email, password },
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

const deleteUserChat = (token, chatId) => {
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.delete(
    baseUrl.concat(`/api/chat?id=${chatId}`),
    header,
  );
};

export {
  loginUser,
  createUser,
  getUsers,
  getChats,
  createOrFetchChat,
  createOrFetchGroupChat,
  deleteUserChat,
};
