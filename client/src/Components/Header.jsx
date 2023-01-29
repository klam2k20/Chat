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
  useDisclosure,
} from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../Context/ChatProvider';
import { getAvatarSrc } from '../Utilities/utilities';
import ProfileModal from './Modal/ProfileModal';

function Header() {
  const { user, setLoggedIn } = useChat();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
            <MenuItem onClick={onOpen}>Profile</MenuItem>
            <MenuDivider />
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <ProfileModal user={user} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default Header;
