import React from 'react';
import {
  Box, Text, Avatar, Button,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { getAvatarSrc } from '../Utilities/utilities';

function UsersList({ users }) {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" gap="0.5rem">
      {users.map((user) => <User key={user._id} user={user} />)}
    </Box>
  );
}

function User({ user }) {
  return (
    <Button
      display="flex"
      gap="0.5rem"
      justifyContent="justify-start"
      alignItems="center"
      py="1.5rem"
      px="1rem"
      bg="#f2f2f2"
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
  users: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  })).isRequired,
};

User.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }).isRequired,
};

export default UsersList;
