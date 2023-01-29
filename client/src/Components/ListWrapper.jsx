import { Box } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

function ListWrapper({ children }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="0.5rem"
      width="100%"
      py="0.5rem"
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

ListWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ListWrapper;
