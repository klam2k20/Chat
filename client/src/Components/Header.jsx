import React from 'react';
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
import { useNavigate } from 'react-router-dom';
import { useChat } from '../Context/ChatProvider';
import { getAvatarSrc } from '../Utilities/utilities';
import ProfileModal from './Modal/ProfileModal';

function Header() {
  const { user, setLoggedIn } = useChat();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setLoggedIn(false);
    navigate('/');
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      borderRadius="md"
      px="1rem"
      h="10%"
    >
      <Text fontSize={['xl', '2xl', '3xl', '4xl']}>Connect-Me</Text>
      <Menu>
        <MenuButton
          as={Button}
          size={{ base: 'xs', md: 'sm' }}
          rightIcon={<ChevronDownIcon />}
        >
          <Avatar
            size={{ base: 'xs', md: 'sm' }}
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

export default Header;
