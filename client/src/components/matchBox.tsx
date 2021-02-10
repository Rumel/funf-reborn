import { Box, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { getTeamLink } from '../helpers/helpers';
import { LeagueEntry, Match as MatchType } from '../types';

type Props = {
  away: LeagueEntry;
  home: LeagueEntry;
  match: MatchType;
  color?: string;
};

export const MatchBox = ({ away, home, match, color }: Props) => {
  return (
    <Box border='1px solid black' margin={1} borderRadius='0.5rem' bg={color}>
      <Box padding={2}>
        <Box display='flex'>
          <Box flexGrow={1}>
            <Link
              href={getTeamLink(away.entry_id, match.event)}
              fontSize='xl'
              fontWeight='bold'
              isExternal>
              {away.entry_name}
            </Link>
          </Box>
          <Box float='right'>
            <Text>{match.league_entry_1_points}</Text>
          </Box>
        </Box>
        <Box display='flex'>
          <Box flexGrow={1}>
            <Link
              href={getTeamLink(home.entry_id, match.event)}
              fontSize='xl'
              fontWeight='bold'
              isExternal>
              {home.entry_name}
            </Link>
          </Box>
          <Box float='right'>
            <Text>{match.league_entry_2_points}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
