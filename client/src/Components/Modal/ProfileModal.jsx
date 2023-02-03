import {
  Avatar,
  Box, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalOverlay, Text, useDisclosure,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { getAvatarSrc } from '../../Utilities/utilities';

function ProfileModal({ children, user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            gap="1rem"
            p="2rem"
          >
            <Avatar
              name={user.name}
              src={getAvatarSrc(user.photo)}
              size={{ base: 'lg', md: '2xl' }}
            />
            <Text fontSize="xl" fontWeight="bold">{user.name}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

ProfileModal.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
};

export default ProfileModal;
