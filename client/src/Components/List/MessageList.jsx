import React from 'react';
import { Avatar, Box, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { MessageLoadingList } from './LoadingList';
import { getAvatarSrc } from '../../Utilities/utilities';

function MessageList({ messages, userId, loading }) {
  return (
    loading ? <MessageLoadingList /> : (
      <Box
        display="flex"
        flexDirection="column-reverse"
        mt="auto"
        gap="1rem"
        w="100%"
        overflowY="scroll"
        sx={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {messages.reverse().map((messageBlock) => (
          <Box
            key={uuidv4()}
            display="flex"
            gap="0.5rem"
            alignSelf={messageBlock[0].sender._id === userId ? 'end' : 'start'}
            maxW="50%"
          >
            <Box h="100%" display="flex" alignItems="end">
              {messageBlock[0].sender._id === userId ? (
                <Box />
              ) : (
                <Avatar
                  size={{ base: 'xs', md: 'sm' }}
                  name={messageBlock[0].sender.name}
                  src={getAvatarSrc(messageBlock[0].sender.photo)}
                />
              )}
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems={messageBlock[0].sender._id === userId ? 'end' : 'start'}
              gap="0.15rem"
              w="100%"
            >
              {messageBlock.map((m) => (
                <Text
                  key={m._id}
                  borderRadius="xl"
                  py=".25rem"
                  px=".5rem"
                  bg={m.sender._id === userId ? '#204FA1' : '#f5f5f5'}
                  color={m.sender._id === userId ? 'white' : 'black'}
                >
                  {m.content}
                </Text>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    )
  );
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        sender: PropTypes.shape({
          _id: PropTypes.string,
          name: PropTypes.string,
          photo: PropTypes.string,
        }),
      }),
    ),
  ).isRequired,
  userId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default React.memo(MessageList);
