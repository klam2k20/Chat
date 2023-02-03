import React, { useState } from 'react';
import {
  Box,
  InputGroup,
  Input,
  Text,
  InputLeftAddon,
  Divider,
} from '@chakra-ui/react';
import { SearchIcon, EditIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

import { useChat } from '../../Context/ChatProvider';
import ChatsList from '../List/ChatsList';
import ChatModalContainer from '../Modal/ChatModal';
import { getChatName } from '../../Utilities/utilities';

function ChatBarContainer() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const { user, selectedChat, chats } = useChat();

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
    <ChatBar
      search={search}
      handleSearch={handleSearch}
      result={result}
      chats={chats}
      selectedChat={selectedChat}
    />
  );
}

function ChatBar({ search, handleSearch, result, chats, selectedChat }) {
  return (
    <Box
      flex={1}
      bg="#fff"
      borderRadius="md"
      borderTopRightRadius={{
        base: 'md',
        md: 'none',
      }}
      borderBottomRightRadius={{
        base: 'md',
        md: 'none',
      }}
      display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
      flexDirection="column"
      px="1rem"
      py="0.5rem"
      gap="0.5rem"
      h="100%"
      w="30%"
      borderRight={{
        base: '0',
        md: '1px',
      }}
      borderRightColor="#183B77"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text fontSize="xl" fontWeight="bold">
          Messages
        </Text>
        <ChatModalContainer>
          <EditIcon fontSize="lg" />
        </ChatModalContainer>
      </Box>
      <Divider borderColor="#183B77" />
      <Box>
        <InputGroup>
          <InputLeftAddon borderColor="#204FA1" bg="#fff" borderRight="none">
            <SearchIcon fontSize="sm" />
          </InputLeftAddon>
          <Input
            borderColor="#204FA1"
            borderLeft="none"
            type="text"
            placeholder="Search"
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

ChatBar.defaultProps = {
  selectedChat: undefined,
};

ChatBar.propTypes = {
  search: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  result: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      chatName: PropTypes.string,
    }),
  ).isRequired,
  chats: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      chatName: PropTypes.string,
    }),
  ).isRequired,
  selectedChat: PropTypes.shape({
    _id: PropTypes.string,
    chatName: PropTypes.string,
  }),
};
export default ChatBarContainer;
