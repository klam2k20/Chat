import React, { useState } from 'react';
import {
  Box,
  InputGroup,
  InputRightAddon,
  Input,
  Button,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { SearchIcon, EditIcon } from '@chakra-ui/icons';
import { useChat } from '../Context/ChatProvider';
import ChatsList from './ChatsList';
import ChatModal from './Modal/ChatModal';

function ChatBar() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const { chats } = useChat();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <Button bg="white" onClick={onOpen}>
          <EditIcon fontSize="xl" />
        </Button>
        <ChatModal isOpen={isOpen} onClose={onClose} />
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
        result.length > 0 && <ChatsList chats={result} />
      ) : (
        <ChatsList chats={chats} />
      )}
    </Box>
  );
}

export default ChatBar;
