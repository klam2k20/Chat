import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, useToast } from '@chakra-ui/react';
import Lottie from 'react-lottie';
import PropTypes from 'prop-types';

import { useChat } from '../../Context/ChatProvider';
import MessageList from '../List/MessageList';
import ChatWindowHeader from './ChatWindowHeader';
import EmptyChatWindow from './EmptyChatWindow';
import * as animationData from '../../Animation/typing.json';
import { splitMessages } from '../../Utilities/utilities';
import { getMessages, sendMessage } from '../../Utilities/apiRequests';
import socket from '../../Utilities/socket';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

let selectedChatDuplicate;

function ChatWindow() {
  const { user, selectedChat, setFetch, setLoggedIn } = useChat();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  selectedChatDuplicate = selectedChat;
  let timeout;

  useEffect(() => {
    socket.connect();
    setTimeout(() => socket.emit('setup', user._id), 1000);
    socket.on('typing', (chatId) => {
      if (chatId === selectedChatDuplicate._id) { setTyping(true); }
    });
    socket.on('stop typing', () => setTyping(false));
    return function cleanup() { socket.off(user._id); };
  }, [user]);

  useEffect(() => {
    const getChatMessages = async () => {
      if (selectedChat) {
        try {
          setLoading(true);
          const { data } = await getMessages(user.token, selectedChat._id);
          socket.emit('join chat', selectedChat._id);
          setMessages(data);
        } catch (err) {
          if (err.response.status === 401) {
            localStorage.removeItem('user-info');
            setLoggedIn(false);
            navigate('/');
          } else {
            toast({
              title: 'Error While Fetching Chat Messages',
              status: 'error',
              duration: 5000,
              isClosable: true,
              position: 'bottom',
            });
          }
        }
        setLoading(false);
      }
    };

    getChatMessages();
  }, [selectedChat]);

  useEffect(() => {
    socket.on('received message', (newMessage) => {
      if (selectedChatDuplicate && selectedChatDuplicate._id === newMessage.chat._id) {
        setMessages((pre) => [...pre, newMessage]);
      }
      setFetch((pre) => !pre);
    });
  }, []);

  const sendChatMessage = async (e) => {
    if (message && e.key === 'Enter') {
      try {
        setMessage('');
        const { data } = await sendMessage(user.token, selectedChat._id, message);
        socket.emit('stop typing', selectedChat._id);
        socket.emit('send message', data);
        setMessages([...messages, data]);
        setFetch((pre) => !pre);
      } catch (err) {
        if (err.response.status === 401) {
          localStorage.removeItem('user-info');
          setLoggedIn(false);
          navigate('/');
        } else {
          toast({
            title: 'Error While Sending Messages',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
          });
        }
      }
    }
  };

  const handleTyping = (e) => {
    const stopTyping = () => {
      socket.emit('stop typing', selectedChat._id);
    };

    setMessage(e.target.value);
    if (!typing) {
      socket.emit('typing', selectedChat._id);
    } else {
      clearTimeout(timeout);
    }
    timeout = setTimeout(stopTyping, 5000);
  };

  return (
    <ChatWindowDisplay
      message={message}
      messages={messages}
      loading={loading}
      typing={typing}
      handleTyping={handleTyping}
      sendChatMessage={sendChatMessage}
    />
  );
}

function ChatWindowDisplay({ message, messages, loading, typing, handleTyping, sendChatMessage }) {
  const { user, selectedChat } = useChat();

  return (
    <Box
      flex={3}
      bg="white"
      borderRadius="md"
      borderTopLeftRadius={{
        base: 'md',
        md: 'none',
      }}
      borderBottomLeftRadius={{
        base: 'md',
        md: 'none',
      }}
      w="70%"
      display={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
      justifyContent="center"
      gap="0.5rem"
    >
      {selectedChat ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          h="100%"
          w="100%"
          px="1rem"
          py="0.5rem"
          gap="0.5rem"
        >
          <ChatWindowHeader />
          <MessageList
            messages={splitMessages(messages)}
            userId={user._id}
            loading={loading}
          />
          {typing ? (
            <Box maxW="fit-content" maxH="10%">
              <Lottie options={defaultOptions} />
            </Box>
          ) : (
            <div />
          )}
          <Box
            py="0.25rem"
            px=".5rem"
            border="1px"
            borderRadius="md"
            borderColor="#204FA1"
          >
            <input
              className="input"
              type="text"
              placeholder="Message..."
              value={message}
              onChange={(e) => handleTyping(e)}
              onKeyDown={(e) => sendChatMessage(e)}
              onBlur={() => socket.emit('stop typing', selectedChat._id)}
            />
          </Box>
        </Box>
      ) : (
        <EmptyChatWindow />
      )}
    </Box>
  );
}

ChatWindowDisplay.propTypes = {
  message: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
    }),
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  typing: PropTypes.bool.isRequired,
  handleTyping: PropTypes.func.isRequired,
  sendChatMessage: PropTypes.func.isRequired,
};

export default ChatWindow;
