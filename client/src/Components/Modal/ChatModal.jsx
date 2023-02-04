import { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

import { useChat } from '../../Context/ChatProvider';
import SearchInput from '../ChatBar/SearchInput';
import { createOrFetchChat, createOrFetchGroupChat } from '../../Utilities/apiRequests';

function ChatModalContainer({ children }) {
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [active, setActive] = useState(false);
  const { user, setSelectedChat, fetch, setFetch } = useChat();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    setActive(selectedUsers.length > 0);
  }, [selectedUsers]);

  const createChat = async () => {
    try {
      const { data } =
        selectedUsers.length === 1
          ? await createOrFetchChat(user.token, selectedUsers[0]._id)
          : await createOrFetchGroupChat(
            user.token,
            'group',
            JSON.stringify(selectedUsers.map((u) => u._id)),
          );
      setSelectedChat(data);
      setSelectedUsers([]);
      setFetch(!fetch);
      onClose();
    } catch (e) {
      toast({
        title: 'Error Creating Chat!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  return (
    <ChatModal
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      search={search}
      setSearch={setSearch}
      selectedUsers={selectedUsers}
      setSelectedUsers={setSelectedUsers}
      active={active}
      createChat={createChat}
    >
      {' '}
      {children}
    </ChatModal>
  );
}

function ChatModal({
  children,
  isOpen,
  onOpen,
  onClose,
  search,
  setSearch,
  selectedUsers,
  setSelectedUsers,
  active,
  createChat,
}) {
  return (
    <>
      <Button
        bg="#fff"
        _hover={{ background: '#e0e0e0' }}
        size="sm"
        onClick={onOpen}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#fff">
          <ModalHeader
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            fontWeight="bold"
            fontSize="xl"
          >
            <ArrowBackIcon cursor="pointer" onClick={onClose} />
            Message
            <Button
              bg="#fff"
              _hover={{ background: '#e0e0e0' }}
              cursor="pointer"
              isDisabled={!active}
              onClick={createChat}
            >
              Chat
            </Button>
          </ModalHeader>
          <ModalBody>
            <SearchInput
              search={search}
              setSearch={setSearch}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
            />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}

ChatModalContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

ChatModal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  selectedUsers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
  setSelectedUsers: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  createChat: PropTypes.func.isRequired,
};

export default ChatModalContainer;
