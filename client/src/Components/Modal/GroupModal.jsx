import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Avatar,
  AvatarGroup,
  Box,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useChat } from '../../Context/ChatProvider';
import { removeFromGroup } from '../../Utilities/apiRequests';
import { getAvatarSrc, getChatName } from '../../Utilities/utilities';

function GroupModal({ children, chat }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setSelectedChat, fetch, setFetch } = useChat();
  const users = chat.users.filter((u) => u._id !== user._id);
  const toast = useToast();

  const removeUserFromGroup = async (removeUserId) => {
    try {
      const { data } = await removeFromGroup(user.token, chat._id, removeUserId);
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
                {getChatName(user._id, chat)}
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
            <InputGroup w="100%">
              <Input text="text" placeholder="Add..." />
              <InputRightAddon bg="white">
                <AddIcon />
              </InputRightAddon>
            </InputGroup>
          </ModalBody>
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
