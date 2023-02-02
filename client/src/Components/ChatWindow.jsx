import { ChatIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, Divider, Input, Text, useToast } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import { useChat } from '../Context/ChatProvider';
import { getChatName, splitMessages } from '../Utilities/utilities';
import { getMessages, sendMessage } from '../Utilities/apiRequests';
import GroupModal from './Modal/GroupModal';
import ProfileModal from './Modal/ProfileModal';
import ChatWindowContent from './ChatWindowContent';
import socket from '../Utilities/socket';
import * as animationData from '../Animation/typing.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

function ChatWindow() {
  const { user, selectedChat, setFetch } = useChat();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const toast = useToast();
  let timeout;

  useEffect(() => {
    socket.connect();
    setTimeout(() => socket.emit('setup', user._id), 1000);
    socket.on('typing', () => setTyping(true));
    socket.on('stop typing', () => setTyping(false));
    return function cleanup() { socket.off(user._id); };
  }, [user]);

  useEffect(() => {
    const getChatMessages = async () => {
      if (selectedChat) {
        try {
          const { data } = await getMessages(user.token, selectedChat._id);
          socket.emit('join chat', selectedChat._id);
          setMessages(data);
        } catch (err) {
          toast({
            title: 'Error While Fetching Chat Messages',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
          });
        }
      }
    };

    getChatMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  useEffect(() => {
    socket.on('received message', (newMessage) => {
      setMessages((pre) => [...pre, newMessage]);
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
        toast({
          title: 'Error While Sending Messages',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
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
    <Box flex={3} bg="white" borderRadius="md" p="1rem" w="70%">
      {selectedChat ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          h="100%"
        >
          <ChatWindowHeader />
          {messages.length > 0 &&
            <ChatWindowContent messages={splitMessages(messages)} userId={user._id} />}
          {typing ? <Box maxW="fit-content" maxH="10%"><Lottie options={defaultOptions} /></Box> : <div />}
          <Input
            py="0.25rem"
            px=".5rem"
            type="text"
            placeholder="Message..."
            value={message}
            onChange={(e) => handleTyping(e)}
            onKeyDown={(e) => sendChatMessage(e)}
            onBlur={() => socket.emit('stop typing', selectedChat._id)}
          />
        </Box>
      ) : (
        <EmptyChatWindow />
      )}
    </Box>
  );
}

function ChatWindowHeader() {
  const { user, selectedChat } = useChat();
  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Text>{getChatName(user._id, selectedChat)}</Text>
        {
          selectedChat.groupChat ?
            <GroupModal chat={selectedChat}><InfoOutlineIcon /></GroupModal> : (
              <ProfileModal user={selectedChat.users.filter((u) => u._id !== user._id)[0]}>
                <InfoOutlineIcon />
              </ProfileModal>
            )
        }
      </Box>
      <Divider colorScheme="gray" />
    </Box>
  );
}

function EmptyChatWindow() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      h="100%"
      gap="0.5rem"
    >
      <ChatIcon fontSize={{ base: 'md', md: '5xl' }} />
      <Text fontSize={{ base: 'md', md: 'xl' }}>Your Messages</Text>
      <Text fontWeight="lighter">
        Send private messages to a friend or group.
      </Text>
    </Box>
  );
}

export default ChatWindow;
