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
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useChat } from '../../Context/ChatProvider';
import { getAvatarSrc, getChatName } from '../../Utilities/utilities';

function GroupModal({ children, chat }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useChat();
  const users = chat.users.filter((u) => u._id !== user._id);

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
                <Avatar
                  key={u._id}
                  name={u.name}
                  src={getAvatarSrc(u.photo)}
                />
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
            <Box
              display="flex"
              flexDirection="column"
              width="100%"
            >
              {users.map((u) => <MemberItem key={u._id} user={u} />)}
            </Box>
            <InputGroup w="100%">
              <Input text="text" placeholder="Add..." />
              <InputRightAddon bg="white"><AddIcon /></InputRightAddon>
            </InputGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function MemberItem({ user }) {
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
      <DeleteIcon />
    </Box>
  );
}

GroupModal.propTypes = {
  children: PropTypes.node.isRequired,
  chat: PropTypes.shape({
    chatName: PropTypes.string,
    users: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
    })),
  }).isRequired,
};

MemberItem.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }).isRequired,
};

export default GroupModal;
