import React, { useEffect } from 'react';
import {
  Box, Text, Avatar, Button, useToast, ButtonGroup,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { getChatname } from '../Utilities/utilities';
import { useChat } from '../Context/ChatProvider';
import { getChats } from '../Utilities/apiRequests';

function ChatsList() {
  const { user, chats, setChats } = useChat();
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
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap="0.5rem"
      width="100%"
    >
      {chats.map((chat) => (
        <Chat key={chat._id} chat={chat} />
      ))}
    </Box>
  );
}

function Chat({ chat }) {
  const { user, selectedChat, setSelectedChat } = useChat();

  const selectChat = () => {
    setSelectedChat(chat);
  };

  return (
    <ButtonGroup size="lg" isAttached>
      <Button
        display="flex"
        gap="0.5rem"
        justifyContent="justify-start"
        alignItems="center"
        py="1.5rem"
        px="1rem"
        onClick={selectChat}
        colorScheme="gray"
        _hover={{ background: '#e0e0e0' }}
        bg={selectedChat && selectedChat._id === chat._id ? '#e0e0e0' : '#f2f2f2'}
        width="full"
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
    </ButtonGroup>
  );
}

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
