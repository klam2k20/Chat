import React, { useEffect } from 'react';
import {
  Box, Text, Avatar, Button, useToast,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getChatname } from '../Utilities/utilities';
import { useChat } from '../Context/ChatProvider';

function ChatsList() {
  const { user, chats, setChats } = useChat();
  const toast = useToast();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const header = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        const res = await axios.get('http://localhost:8080/api/chat', header);
        setChats(res.data);
      } catch (err) {
        toast({
          title: 'Invalid Search',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
      }
    };

    fetchChats();
  }, [setChats, toast, user.token]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap="0.5rem"
    >
      {chats.map((chat) => (
        <Chat key={chat._id} chat={chat} />
      ))}
    </Box>
  );
}

function Chat({ chat }) {
  const { user } = useChat();

  return (
    <Button
      display="flex"
      gap="0.5rem"
      justifyContent="justify-start"
      alignItems="center"
      py="1.5rem"
      px="1rem"
      bg="#f2f2f2"
    >
      <Avatar
        size={{ base: 'xs', md: 'sm' }}
        name={getChatname(user, chat)}
      />
      <Box display="flex" flexDirection="column" alignItems="start">
        <Text fontSize="lg">{getChatname(user, chat)}</Text>
        <Text fontSize="lg" fontWeight="lighter">
          {/* {chat.latestMessage} */}
          Latest Message
        </Text>
      </Box>
    </Button>
  );
}

Chat.propTypes = {
  chat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    chatName: PropTypes.string.isRequired,
    groupChat: PropTypes.bool.isRequired,
    latestMessage: PropTypes.string,
  }).isRequired,
};

export default ChatsList;
