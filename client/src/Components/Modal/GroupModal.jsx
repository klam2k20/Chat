import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

function GroupModal({ isOpen, onClose }) {
  return (
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
          <Button bg="white" cursor="pointer">
            Chat
          </Button>
        </ModalHeader>
        <ModalBody
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="0.5rem"
        >
          <Input type="text" placeholder="Name" />
          <Input type="text" placeholder="To" />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}

GroupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default GroupModal;
