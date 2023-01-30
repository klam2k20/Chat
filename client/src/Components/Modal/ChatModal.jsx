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
import { useState, useEffect } from 'react';
import SearchInput from '../SearchInput';
import { useChat } from '../../Context/ChatProvider';
import { createOrFetchChat, createOrFetchGroupChat } from '../../Utilities/apiRequests';

function ChatModal({ children, fetch, setFetch }) {
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [active, setActive] = useState(false);
  const { user, setSelectedChat } = useChat();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    setActive(selectedUsers.length);
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
    <>
      <Button bg="white" onClick={onOpen}>
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            fontWeight="bold"
            fontSize="xl"
          >
            <ArrowBackIcon cursor="pointer" onClick={onClose} />
            New Message
            <Button
              bg="white"
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

ChatModal.propTypes = {
  children: PropTypes.node.isRequired,
  fetch: PropTypes.bool.isRequired,
  setFetch: PropTypes.func.isRequired,
};

export default ChatModal;
