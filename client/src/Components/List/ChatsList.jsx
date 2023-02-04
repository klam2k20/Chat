import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { useChat } from '../../Context/ChatProvider';
import ListWrapper, { ListItem } from './ListWrapper';
import { getAvatarSrc, getChatName } from '../../Utilities/utilities';
import { getChats } from '../../Utilities/apiRequests';

function ChatsList({ chats }) {
  const { user, setChats, fetch, setLoggedIn } = useChat();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        const res = await getChats(user.token);
        setChats(res.data);
      } catch (err) {
        if (err.response.status === 401) {
          localStorage.removeItem('user-info');
          setLoggedIn(false);
          navigate('/');
        } else {
          toast({
            title: 'Error While Fetching Chats',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
          });
        }
      }
      setLoading(false);
    };

    fetchChats();
  }, [fetch]);

  return (
    <ListWrapper loading={loading}>
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
      subText={chat.latestMessage.content}
      photo={getAvatarSrc(user.photo)}
      isSelected={(selectedChat && selectedChat._id === chat._id)}
    />
  );
}

ChatsList.propTypes = {
  chats: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      latestMessage: PropTypes.shape({
        content: PropTypes.string,
      }),
    }),
  ).isRequired,
};

Chat.propTypes = {
  chat: PropTypes.shape({
    _id: PropTypes.string,
    latestMessage: PropTypes.shape({
      content: PropTypes.string,
    }),
  }).isRequired,
};

export default ChatsList;
