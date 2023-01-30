import { ChatIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, Divider, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { useChat } from '../Context/ChatProvider';
import { getChatName } from '../Utilities/utilities';
import ProfileModal from './Modal/ProfileModal';

function ChatWindow() {
  const { selectedChat } = useChat();

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
          <Input type="text" placeholder="Message..." />
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
        <Text>{getChatName(user, selectedChat)}</Text>
        <ProfileModal user={selectedChat.users.filter((u) => u._id !== user._id)[0]}>
          <InfoOutlineIcon />
        </ProfileModal>
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
