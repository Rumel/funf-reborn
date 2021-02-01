import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { LeagueEntry, Match as MatchType } from '../types';

type Props = {
  away: LeagueEntry;
  home: LeagueEntry;
  match: MatchType;
};

export const Match = (props: Props) => {
  const { away, home, match } = props;

  return (
    <Box border='1px solid black' margin='0.25rem'>
      <Box padding='0.5rem'>
        <Box display='flex'>
          <Box flexGrow={1}>
            <Text fontSize='xl' fontWeight='bold'>
              {away.entry_name}
            </Text>
          </Box>
          <Box float='right'>
            <Text>{match.league_entry_1_points}</Text>
          </Box>
        </Box>
        <Box display='flex'>
          <Box flexGrow={1}>
            <Text fontSize='xl' fontWeight='bold'>
              {home.entry_name}
            </Text>
          </Box>
          <Box float='right'>
            <Text>{match.league_entry_2_points}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
