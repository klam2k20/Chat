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
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useChat } from '../Context/ChatProvider';
import { getAvatarSrc } from '../Utilities/utilities';

function Header() {
  const { user, setLoggedIn } = useChat();

  const logout = () => {
    setLoggedIn(false);
    localStorage.clear();
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flex={1}
      bg="white"
      borderRadius="md"
      px="1rem"
    >
      <Text fontSize={['xl', '2xl', '3xl', '4xl']}>Connect-Me</Text>
      <Box display="flex" gap="0.5rem" alignItems="center">
        <BellIcon fontSize={{ base: 'xl', md: '3xl' }} cursor="pointer" />
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
            <MenuItem>Profile</MenuItem>
            <MenuDivider />
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
}

export default Header;
