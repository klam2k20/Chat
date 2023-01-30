import { Box } from '@chakra-ui/react';
import ChatBar from '../Components/ChatBar';
import ChatWindow from '../Components/ChatWindow';
import Header from '../Components/Header';
import { useChat } from '../Context/ChatProvider';

function Chatpage() {
  const { user } = useChat();
  return (
    <Box display="flex" flexDirection="column" width="100%" gap="1rem" p="1rem" h="100vh">
      {user && (
      <>
        <Header />
        <Box display="flex" h="90%" gap="1rem">
          <ChatBar />
          <ChatWindow />
        </Box>
      </>
      )}
    </Box>
  );
}

export default Chatpage;
