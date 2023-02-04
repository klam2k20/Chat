import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  MenuDivider,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

import { useChat } from '../../Context/ChatProvider';
import ProfileModal from '../Modal/ProfileModal';
import { ReactComponent as Logo } from '../../imgs/logo.svg';
import { getAvatarSrc } from '../../Utilities/utilities';

function Header() {
  const { user, setLoggedIn, setUser, setSelectedChat, setChats } = useChat();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user-info');
    setLoggedIn(false);
    setUser();
    setSelectedChat();
    setChats([]);
    navigate('/');
  };

  return <HeaderDisplay user={user} logout={logout} />;
}

function HeaderDisplay({ user, logout }) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="#fff"
      borderRadius="md"
      px="1rem"
      h="12%"
    >
      <Box display="flex" alignItems="center">
        <Logo />
        <Text
          fontSize={{ base: '2xl', md: '4xl', xl: '5xl' }}
          fontWeight="bold"
        >
          Connect-Me
        </Text>
      </Box>
      <Menu>
        <MenuButton
          as={Button}
          bg="#fff"
          _hover={{ background: '#e0e0e0' }}
          size={{ base: 'sm', md: 'lg' }}
          rightIcon={<ChevronDownIcon />}
        >
          <Avatar
            size={{ base: 'sm', xl: 'md' }}
            cursor="pointer"
            name={user.name}
            src={getAvatarSrc(user.photo)}
          />
        </MenuButton>
        <MenuList>
          <ProfileModal user={user}>
            <MenuItem>Profile</MenuItem>
          </ProfileModal>
          <MenuDivider />
          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}

HeaderDisplay.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
  logout: PropTypes.func.isRequired,
};

export default Header;
