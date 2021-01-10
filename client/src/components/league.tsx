import React from 'react';
import { Box, Text } from '@chakra-ui/react';

import { Standings } from './standings';
import { MatchContainer } from './matchContainer';

export const League = () => {
  return (
    <Box>
      <Box>
        <Text fontSize="xl">League</Text>
      </Box>
      <Standings />
      <MatchContainer />
    </Box>
  );
};
