const getAvatarSrc = (src) => (
  src
      === 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png'
    ? '' : src
);

const getChatname = (user, chat) => {
  if (chat.groupChat) return chat.chatName;
  return chat.users[0]._id === user._id ? chat.users[1].name : chat.users[0].name;
};
export { getAvatarSrc, getChatname };
