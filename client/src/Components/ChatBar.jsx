import React, { useState } from 'react';
import {
  Box,
  InputGroup,
  Input,
  Text,
  InputLeftAddon,
} from '@chakra-ui/react';
import { SearchIcon, EditIcon } from '@chakra-ui/icons';
import { useChat } from '../Context/ChatProvider';
import ChatsList from './ChatsList';
import ChatModal from './Modal/ChatModal';
import { getChatName } from '../Utilities/utilities';

function ChatBar() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const { user, chats } = useChat();

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearch(query);
    if (query) {
      const filterChats = chats.filter(
        (c) => {
          if (c.chatName !== 'sender' && c.chatName !== 'group') return c.chatName.toLowerCase().startsWith(query.toLowerCase());
          return getChatName(user._id, c)
            .toLowerCase()
            .startsWith(query.toLowerCase());
        },
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
        <ChatModal>
          <EditIcon fontSize="xl" />
        </ChatModal>
      </Box>
      <Box>
        <InputGroup>
          <InputLeftAddon bg="white">
            <SearchIcon fontSize="sm" />
          </InputLeftAddon>
          <Input
            type="text"
            placeholder="Search"
            outline="none"
            value={search}
            onChange={(e) => handleSearch(e)}
          />
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
