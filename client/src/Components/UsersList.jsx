/* eslint-disable prefer-destructuring */
import React from 'react';
import {
  Box, Text, Avatar, Button,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { getAvatarSrc } from '../Utilities/utilities';
import { useChat } from '../Context/ChatProvider';
import { createOrFetchChat } from '../Utilities/apiRequests';

function UsersList({ users, clearSearch }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="0.5rem"
      width="100%"
      py="0.5rem"
      overflowY="scroll"
      sx={{
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {users.map((user) => (
        <User key={user._id} user={user} clearSearch={clearSearch} />
      ))}
    </Box>
  );
}

// eslint-disable-next-line no-unused-vars
function User({ user, clearSearch }) {
  const {
    user: loggedInUser, setSelectedChat, chats, setChats,
  } = useChat();

  const createChat = async () => {
    const { data } = await createOrFetchChat(loggedInUser.token, user._id);
    const chat = data[0];
    setSelectedChat(chat);
    if (!chats.some((c) => c._id === chat._id)) {
      setChats([...chats, chat]);
    }
    clearSearch();
  };

  return (
    <Button
      display="flex"
      gap="0.5rem"
      justifyContent="justify-start"
      alignItems="center"
      py="1.5rem"
      px="1rem"
      bg="#f2f2f2"
      width="full"
      onClick={createChat}
    >
      <Avatar
        size={{ base: 'xs', md: 'sm' }}
        name={user.name}
        src={getAvatarSrc(user.photo)}
      />
      <Box display="flex" flexDirection="column" alignItems="start">
        <Text fontSize="lg">{user.name}</Text>
        <Text fontSize="lg" fontWeight="lighter">{user.email}</Text>
      </Box>
    </Button>
  );
}

UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
    }),
  ).isRequired,
  clearSearch: PropTypes.func.isRequired,
};

User.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }).isRequired,
  clearSearch: PropTypes.func.isRequired,
};

export default UsersList;
