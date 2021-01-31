import React from 'react';
import { Grid } from '@chakra-ui/react';

import { Match } from './match';

export const MatchContainer = () => {
  return (
    <Grid templateColumns='repeat(2, 1fr)'>
      <Match></Match>
      <Match></Match>
      <Match></Match>
      <Match></Match>
    </Grid>
  );
};
