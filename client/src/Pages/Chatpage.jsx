import { Box } from '@chakra-ui/react';
import Header from '../Components/Header';
import { useChat } from '../Context/ChatProvider';

function Chatpage() {
  const { user } = useChat();
  return (
    <Box display="flex" flexDirection="column" width="100%" gap="1rem" p="1rem">
      {user && (
      <>
        <Header />
        <Box display="flex" flex={9} gap="1rem">
          <Box flex={1} bg="white" borderRadius="md" p="0.5rem">
            {' '}
            Chats
          </Box>
          <Box flex={3} bg="white" borderRadius="md" p="0.5rem">
            {' '}
            Window
          </Box>
        </Box>
      </>
      )}
    </Box>
  );
}

export default Chatpage;
