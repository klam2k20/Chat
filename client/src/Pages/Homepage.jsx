import React, { useEffect } from 'react';
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Login from '../Components/Auth/Login';
import Signup from '../Components/Auth/Signup';
import { useChat } from '../Context/ChatProvider';
import { ReactComponent as Logo } from '../imgs/logo.svg';

function Homepage() {
  const { setUser, setLoggedIn } = useChat();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('user-info');
    if (userInfo) {
      setUser(userInfo);
      navigate('/chats');
      setLoggedIn(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap="1rem"
      h="100vh"
    >
      <Box
        display="flex"
        justifyContent="center"
        borderRadius="md"
        borderWidth="1px"
        py="1rem"
        bg="#f5f5f5"
      >
        <Logo />
        <Text fontSize={{ base: '4xl', md: '5xl' }} fontWeight="bold" color="#0F0D35">
          Connect-Me
        </Text>
      </Box>

      <Box borderRadius="md" borderWidth="1px" w="100%" p={4} bg="#f5f5f5">
        <Tabs isFitted variant="soft-rounded" colorScheme="gray">
          <TabList>
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
