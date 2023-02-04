import { Box } from '@chakra-ui/react';

import { useChat } from '../Context/ChatProvider';
import ChatBarContainer from '../Components/ChatBar/ChatBar';
import ChatWindow from '../Components/ChatWindow/ChatWindow';
import Header from '../Components/ChatBar/Header';

function Chatpage() {
  const { user } = useChat();
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="1rem"
      p="1rem"
      w="100%"
      h="100vh"
    >
      {user && (
        <>
          <Header />
          <Box display="flex" h="88%">
            <ChatBarContainer />
            <ChatWindow />
          </Box>
        </>
      )}
    </Box>
  );
}

export default Chatpage;
