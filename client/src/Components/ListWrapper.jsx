import {
  Avatar, Box, Button, Text,
} from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

function ListWrapper({ children }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="0.5rem"
      width="100%"
      py="1rem"
      overflowY="scroll"
      sx={{
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {children}
    </Box>
  );
}

function ListItem({
  handleClick, text, subText, photo, isSelected,
}) {
  return (
    <Button
      display="flex"
      gap="0.5rem"
      justifyContent="justify-start"
      alignItems="center"
      py="1.5rem"
      px="1rem"
      onClick={handleClick}
      bg={isSelected ? '#e0e0e0' : '#f2f2f2'}
      _hover={{ background: '#e0e0e0' }}
      width="full"
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
