import { useEffect, useState } from 'react';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

import { useChat } from '../../Context/ChatProvider';
import SearchInput from '../ChatBar/SearchInput';
import {
  addToGroup,
  removeFromGroup,
  renameGroupChat,
} from '../../Utilities/apiRequests';
import { getAvatarSrc, getChatName } from '../../Utilities/utilities';

function GroupModal({ children, chat }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setSelectedChat, fetch, setFetch } = useChat();
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [chatName, setChatName] = useState(getChatName(user._id, chat));
  const users = chat.users.filter((u) => u._id !== user._id);
  const toast = useToast();

  useEffect(() => {
    setChatName(getChatName(user._id, chat));
  }, [chat, user]);

  const removeUserFromGroup = async (removeUserId) => {
    try {
      const { data } = await removeFromGroup(
        user.token,
        chat._id,
        removeUserId,
      );
      setSelectedChat(data);
      setFetch(!fetch);
    } catch (err) {
      toast({
        title: 'Error Removing User from Group',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  const addUsersToGroup = async () => {
    try {
      if (selectedUsers.length) {
        selectedUsers.forEach(async (u) => {
          const { data } = await addToGroup(user.token, chat._id, u._id);
          setSelectedChat(data);
          setFetch(!fetch);
        });
      }
      setSelectedUsers([]);
    } catch (err) {
      toast({
        title: `Error Adding ${
          selectedUsers.length === 1 ? 'User' : 'Users'
        } To Group`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  const renameChat = async () => {
    try {
      const { data } = await renameGroupChat(user.token, chat._id, chatName);
      setSelectedChat(data);
      setFetch(!fetch);
    } catch (err) {
      toast({
        title: 'Error Renaming Chat',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="0.5rem"
            p="2rem"
          >
            <AvatarGroup size={{ base: 'lg', md: '2xl' }} max={2} mb="1rem">
              {users.map((u) => (
                <Avatar key={u._id} name={u.name} src={getAvatarSrc(u.photo)} />
              ))}
            </AvatarGroup>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              w="100%"
            >
              <Text w="25%" fontWeight="bold">
                Name:
              </Text>
              <Text w="75%" isTruncated>
                <Input
                  border="none"
                  borderRadius="none"
                  p={0}
                  type="text"
                  value={chatName}
                  onChange={(e) => setChatName(e.target.value)}
                  onBlur={() => renameChat()}
                />
              </Text>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              w="100%"
            >
              <Text w="25%" fontWeight="bold">
                Members:
              </Text>
              <Text w="75%" isTruncated>
                {users.length}
              </Text>
            </Box>
            <Box display="flex" flexDirection="column" width="100%">
              {users.map((u) => (
                <MemberItem
                  key={u._id}
                  user={u}
                  handleClick={removeUserFromGroup}
                />
              ))}
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              w="100%"
            >
              <SearchInput
                search={search}
                setSearch={setSearch}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
              />
              <Box as={Button} m="1rem" bg="white" onClick={addUsersToGroup}>
                <AddIcon />
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                removeUserFromGroup(user._id);
                onClose();
              }}
            >
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function MemberItem({ user, handleClick }) {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center" gap="0.5rem">
        <Avatar
          size={{ base: 'xs', md: 'sm' }}
          name={user.name}
          src={getAvatarSrc(user.photo)}
        />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="start"
          maxW="90%"
        >
          <Text fontSize="lg" maxW="100%" isTruncated>
            {user.name}
          </Text>
          <Text fontSize="lg" fontWeight="lighter">
            {user.email}
          </Text>
        </Box>
      </Box>
      <DeleteIcon color="red.500" onClick={() => handleClick(user._id)} />
    </Box>
  );
}

GroupModal.propTypes = {
  children: PropTypes.node.isRequired,
  chat: PropTypes.shape({
    _id: PropTypes.string,
    chatName: PropTypes.string,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        email: PropTypes.string,
        photo: PropTypes.string,
      }),
    ),
  }).isRequired,
};

MemberItem.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default GroupModal;
