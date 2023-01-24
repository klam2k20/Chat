import React from 'react';
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
import Login from '../Components/Auth/Login';
import Signup from '../Components/Auth/Signup';

function Homepage() {
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        m="2.5rem 0 1rem"
        borderRadius="md"
        borderWidth="1px"
        w="100%"
        bg="white"
      >
        <Text fontSize="4xl" color="#000">
          Connect-Me
        </Text>
      </Box>

      <Box borderRadius="md" borderWidth="1px" w="100%" p={4} bg="white">
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