import React from 'react';
import { Box, Skeleton, Stack } from '@chakra-ui/react';

function LoadingList() {
  return (
    <Stack>
      <Skeleton height="4rem" />
      <Skeleton height="4rem" />
      <Skeleton height="4rem" />
    </Stack>
  );
}

function MessageLoadingList() {
  return (
    <Box
      display="flex"
      flexDirection="column-reverse"
      gap="0.5rem"
      h="100%"
      w="100%"
    >
      <Box display="flex" flexDirection="column" w="50%" gap=".15rem">
        <Skeleton height="2rem" />
        <Skeleton height="2rem" />
        <Skeleton height="2rem" />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        w="50%"
        alignSelf="end"
        gap=".15rem"
      >
        <Skeleton height="2rem" />
        <Skeleton height="2rem" />
        <Skeleton height="2rem" />
      </Box>
      <Box display="flex" flexDirection="column" w="50%" gap=".15rem">
        <Skeleton height="2rem" />
        <Skeleton height="2rem" />
        <Skeleton height="2rem" />
      </Box>
    </Box>
  );
}

export default LoadingList;
export { MessageLoadingList };
