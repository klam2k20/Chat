import React, { useState } from 'react';
import {
  Box,
  InputGroup,
  InputRightAddon,
  Input,
  Button,
  useToast,
  Text,
} from '@chakra-ui/react';
import { SearchIcon, EditIcon } from '@chakra-ui/icons';
import { useChat } from '../Context/ChatProvider';
import UsersList from './UsersList';
import ChatsList from './ChatsList';
import { getUsers } from '../Utilities/apiRequests';

function ChatBar() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const toast = useToast();
  const { user } = useChat();

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearch(query);
    if (query) {
      try {
        const res = await getUsers(user.token, query);
        setResult(res.data);
      } catch (err) {
        toast({
          title: 'Invalid Search',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
      }
    } else {
      setResult([]);
    }
  };

  return (
    <Box
      flex={1}
      bg="white"
      borderRadius="md"
      p="0.5rem"
      display="flex"
      flexDirection="column"
      h="100%"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py="0.5rem"
      >
        <Text fontSize="xl" fontWeight="bold">
          Messages
        </Text>
        <Button bg="white">
          <EditIcon fontSize="xl" />
        </Button>
      </Box>
      <Box>
        <InputGroup>
          <Input
            type="text"
            placeholder="Search"
            outline="none"
            value={search}
            onChange={(e) => handleSearch(e)}
          />
          <InputRightAddon as={Button} bg="white">
            <SearchIcon fontSize="sm" />
          </InputRightAddon>
        </InputGroup>
      </Box>

      {search ? (
        result.length > 0 && <UsersList users={result} clearSearch={() => setSearch('')} />
      ) : (
        <ChatsList />
      )}

    </Box>
  );
}

export default ChatBar;
