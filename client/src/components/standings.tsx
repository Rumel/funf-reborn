import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import _ from 'lodash';
import { useLeagueContext } from '../leagueStore';
import { setLeague } from '../service';
import { StandingsHeader } from './standings/standingsHeader';
import { StandingsRow } from './standings/standingsRow';

export const Standings = () => {
  const { leagueState, leagueDispatch } = useLeagueContext();
  const { id, league_entries, standings } = leagueState;

  useEffect(() => {
    if ((league_entries === null || standings === null) && id !== null) {
      setLeague(leagueDispatch, id);
    }
  });

  if (league_entries === null || standings === null) {
    return null;
  }

  return (
    <Box>
      <Box>Standings</Box>
      <StandingsHeader></StandingsHeader>
      {standings.map((standing) => {
        const leagueEntry = _.find(
          league_entries,
          (le) => le.id === standing.league_entry
        );

        if (!leagueEntry) {
          return null;
        }

        return (
          <StandingsRow
            key={leagueEntry.id}
            leagueEntry={leagueEntry}
            row={standing}></StandingsRow>
        );
      })}
    </Box>
  );
};
