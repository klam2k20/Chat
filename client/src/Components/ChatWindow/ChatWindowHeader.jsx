import { Box, Text } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';

import { useChat } from '../../Context/ChatProvider';
import GroupModal from '../Modal/GroupModal';
import ProfileModal from '../Modal/ProfileModal';
import { getChatName } from '../../Utilities/utilities';

function ChatWindowHeader() {
  const { user, selectedChat } = useChat();
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Text fontSize="xl">{getChatName(user._id, selectedChat)}</Text>
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
  );
}

export default ChatWindowHeader;
