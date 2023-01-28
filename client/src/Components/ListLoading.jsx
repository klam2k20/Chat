import React from 'react';
import { Stack, Skeleton } from '@chakra-ui/react';

function ListLoading() {
  return (
    <Stack>
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  );
}

export default ListLoading;
