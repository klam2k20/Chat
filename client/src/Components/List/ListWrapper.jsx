import React from 'react';
import { Avatar, Box, Button, Skeleton, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function ListWrapper({ children }) {
  return (
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
  );
}

function ListItem({ handleClick, text, subText, photo, isSelected, loading }) {
  return (
    <Skeleton isLoaded={!loading} fadeDuration={1}>
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
    </Skeleton>
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
  loading: PropTypes.bool.isRequired,
};

export default ListWrapper;
export { ListItem };
