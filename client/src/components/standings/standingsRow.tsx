import { Box } from '@chakra-ui/react';
import React from 'react';
import { LeagueEntry, StandingRow } from '../../types';

type Props = {
  leagueEntry: LeagueEntry;
  row: StandingRow;
};

export const StandingsRow = (props: Props) => {
  const { leagueEntry, row } = props;

  return (
    <Box>
      {leagueEntry.entry_name} - {leagueEntry.player_first_name}{' '}
      {leagueEntry.player_last_name}
    </Box>
  );
};
