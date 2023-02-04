import { Box, Text, Button, Show, Divider } from '@chakra-ui/react';
import { ArrowBackIcon, InfoOutlineIcon } from '@chakra-ui/icons';

import { useChat } from '../../Context/ChatProvider';
import GroupModal from '../Modal/GroupModal';
import ProfileModal from '../Modal/ProfileModal';
import { getChatName } from '../../Utilities/utilities';

function ChatWindowHeader() {
  const { user, selectedChat, setSelectedChat } = useChat();
  return (
    <Box display="flex" flexDirection="column" gap="0.5rem">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Show below="sm">
          <Button bg="#fff" _hover={{ background: '#E0E0E0' }} size="sm">
            <ArrowBackIcon
              fontSize="md"
              onClick={() => setSelectedChat(null)}
            />
          </Button>
        </Show>
        <Text fontSize={{ base: 'lg', md: 'xl' }} maxW="75%" isTruncated>
          {getChatName(user._id, selectedChat)}
        </Text>
        {selectedChat.groupChat ? (
          <GroupModal chat={selectedChat}>
            <InfoOutlineIcon />
          </GroupModal>
        ) : (
          <ProfileModal
            user={selectedChat.users.filter((u) => u._id !== user._id)[0]}
          >
            <InfoOutlineIcon />
          </ProfileModal>
        )}
      </Box>
      <Divider borderColor="#204FA1" />
    </Box>
  );
}

export default ChatWindowHeader;
