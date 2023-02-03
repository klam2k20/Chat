import { Box, Text } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';

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

export default EmptyChatWindow;
