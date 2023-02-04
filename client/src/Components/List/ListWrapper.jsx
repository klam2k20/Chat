import React from 'react';
import { Avatar, Box, Button, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import LoadingList from './LoadingList';

function ListWrapper({ children, loading }) {
  return (
    loading ? <LoadingList /> : (
      <Box
        display="flex"
        flexDirection="column"
        w="100%"
        overflowY="scroll"
        sx={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {children}
      </Box>
    )
  );
}

function ListItem({ handleClick, text, subText, photo, isSelected }) {
  return (
    <Button
      display="flex"
      gap="0.5rem"
      justifyContent="justify-start"
      alignItems="center"
      py="2rem"
      px="1rem"
      w="100%"
      onClick={handleClick}
      borderColor="#204FA1"
      bg={isSelected ? '#e0e0e0' : '#fff'}
      _hover={{ background: '#e0e0e0' }}
    >
      <Avatar size={{ base: 'xs', md: 'sm' }} name={text} src={photo} />
      <Box display="flex" flexDirection="column" alignItems="start" maxW="90%">
        <Text fontSize="lg" maxW="100%" isTruncated>
          {text}
        </Text>
        <Text fontSize="lg" fontWeight="lighter" maxW="100%" isTruncated>
          {subText}
        </Text>
      </Box>
    </Button>
  );
}
ListWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
};

ListItem.defaultProps = {
  isSelected: false,
};

ListItem.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
};

export default ListWrapper;
export { ListItem };
