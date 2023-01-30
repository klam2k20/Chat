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

export { getAvatarSrc, getChatName };
