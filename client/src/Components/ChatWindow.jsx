import { ChatIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, Divider, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { useChat } from '../Context/ChatProvider';

function ChatWindow() {
  const { selectedChat } = useChat();

  return (
    <Box flex={3} bg="white" borderRadius="md" p="0.5rem" w="70%">
      {selectedChat ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          h="100%"
        >
          <Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb=".5rem"
              p="0.5rem"
            >
              <Text>{selectedChat.chatName}</Text>
              <InfoOutlineIcon />
            </Box>
            <Divider colorScheme="gray" />
          </Box>
          <Input type="text" placeholder="Message..." />
        </Box>
      ) : (
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
      )}
    </Box>
  );
}

export default ChatWindow;
