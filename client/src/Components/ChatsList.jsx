import React, { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { getAvatarSrc, getChatName } from '../Utilities/utilities';
import { useChat } from '../Context/ChatProvider';
import { getChats } from '../Utilities/apiRequests';
import ListWrapper, { ListItem } from './ListWrapper';

function ChatsList({ chats, fetch }) {
  const { user, setChats } = useChat();
  const toast = useToast();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await getChats(user.token);
        setChats(res.data);
      } catch (err) {
        toast({
          title: 'Error While Fetching Chats',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
      }
    };

    fetchChats();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetch]);

  return (
    <ListWrapper>
      {chats.map((chat) => (
        <Chat key={chat._id} chat={chat} />
      ))}
    </ListWrapper>
  );
}

function Chat({ chat }) {
  const { user, selectedChat, setSelectedChat } = useChat();

  const selectChat = () => {
    setSelectedChat(chat);
  };

  return (
    <ListItem
      handleClick={selectChat}
      text={getChatName(user._id, chat)}
      subText="Latest Message"
      photo={getAvatarSrc(user.photo)}
      isSelected={(selectedChat && selectedChat._id === chat._id)}
    />
  );
}

ChatsList.propTypes = {
  chats: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      chatName: PropTypes.string.isRequired,
      groupChat: PropTypes.bool.isRequired,
      latestMessage: PropTypes.string,
      groupAdmin: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
      }),
    }),
  ).isRequired,
  fetch: PropTypes.bool.isRequired,
};

Chat.propTypes = {
  chat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    chatName: PropTypes.string.isRequired,
    groupChat: PropTypes.bool.isRequired,
    latestMessage: PropTypes.string,
    groupAdmin: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ChatsList;
