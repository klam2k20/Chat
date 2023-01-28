/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import {
  Box, InputGroup, InputRightAddon, Input, Button, useToast, Avatar,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useChat } from '../Context/ChatProvider';
import ListLoading from './ListLoading';
import UsersList from './UsersList';
import ChatsList from './ChatsList';

function ChatBar() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  // const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user } = useChat();

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearch(query);
    if (query) {
      // setLoading(true);
      try {
        const header = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        const res = await axios.get(
          `http://localhost:8080/api/user?search=${query}`,
          header,
        );
        setResult(res.data);
        // setLoading(false);
      } catch (err) {
        toast({
          title: 'Invalid Search',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
      }
    } else { setResult([]); }
  };

  return (
    <Box flex={1} bg="white" borderRadius="md" p="0.5rem">
      <Box>
        <InputGroup>
          <Input type="text" placeholder="Search" outline="none" value={search} onChange={(e) => handleSearch(e)} />
          <InputRightAddon as={Button}>
            <SearchIcon />
          </InputRightAddon>
        </InputGroup>
      </Box>
      <Box py="0.5rem">
        {
          search ? (result.length > 0 && <UsersList users={result} />) : <ChatsList />
        }
      </Box>
    </Box>
  );
}

export default ChatBar;
