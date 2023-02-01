const getAvatarSrc = (src) => (
  src
      === 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png'
    ? '' : src
);

const getChatName = (userId, chat) => {
  if (chat.groupChat && chat.chatName !== 'group') return chat.chatName;
  return chat.users.reduce((acc, u) => {
    if (u._id === userId) return acc;
    return `${acc + u.name}, `;
  }, '').slice(0, -2);
};

const splitMessages = (messages) => {
  const res = [];
  let chunk = [];
  const lastIndex = messages.length - 1;
  messages.forEach((m, i) => {
    if (m._id !== messages[lastIndex]._id) {
      chunk.push(m);
      if (m.sender._id !== messages[i + 1].sender._id) {
        res.push(chunk);
        chunk = [];
      }
    }
  });
  chunk.push(messages[lastIndex]);
  res.push(chunk);
  return res;
};

export { getAvatarSrc, getChatName, splitMessages };
