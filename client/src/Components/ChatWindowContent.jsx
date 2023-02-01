import { Avatar, Box, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { getAvatarSrc } from '../Utilities/utilities';

function ChatWindowContent({ messages, userId }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      mt="auto"
      gap="1rem"
      width="100%"
      overflowY="scroll"
      sx={{
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }}
      py="0.5rem"
    >
      {messages.map((m) => (
        <Box
          key={uuidv4()}
          display="flex"
          gap="0.5rem"
          alignSelf={m[0].sender._id === userId ? 'end' : 'start'}
          maxW="50%"
        >
          <Box h="100%" display="flex" alignItems="end">
            {m[0].sender._id === userId ? (
              <Box />
            ) : (
              <Avatar
                size={{ base: 'xs', md: 'sm' }}
                name={m[0].sender.name}
                src={getAvatarSrc(m[0].sender.photo)}
              />
            )}
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems={m[0].sender._id === userId ? 'end' : 'start'}
            gap="0.15rem"
            w="100%"
          >
            {m.map((c) => (
              <Text
                key={c._id}
                borderRadius="xl"
                py=".25rem"
                px=".75rem"
                bg={c.sender._id === userId ? '#204FA1' : '#e0e0e0'}
                color={c.sender._id === userId ? 'white' : 'black'}
              >
                {c.content}
              </Text>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

ChatWindowContent.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    sender: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      photo: PropTypes.string,
    }),
  })).isRequired,
  userId: PropTypes.string.isRequired,
};
export default ChatWindowContent;
