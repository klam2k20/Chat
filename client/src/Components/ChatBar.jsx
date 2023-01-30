import React, { useState } from 'react';
import {
  Box,
  InputGroup,
  InputRightAddon,
  Input,
  Button,
  Text,
} from '@chakra-ui/react';
import { SearchIcon, EditIcon } from '@chakra-ui/icons';
import { useChat } from '../Context/ChatProvider';
import ChatsList from './ChatsList';
import ChatModal from './Modal/ChatModal';

function ChatBar() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const [fetch, setFetch] = useState(false);
  const { chats } = useChat();

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearch(query);
    if (query) {
      const filterChats = chats.filter(
        (c) => c.chatName.toLowerCase().startsWith(query.toLowerCase()),
      );
      setResult(filterChats);
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
      w="30%"
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
        <ChatModal
          fetch={fetch}
          setFetch={setFetch}
        >
          <EditIcon fontSize="xl" />
        </ChatModal>
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
        result.length > 0 && <ChatsList chats={result} fetch={fetch} />
      ) : (
        <ChatsList chats={chats} fetch={fetch} />
      )}
    </Box>
  );
}

export default ChatBar;
