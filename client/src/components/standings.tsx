import { Box } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { setLeague } from '../service';
import { useStateContext } from '../store';
import { StandingsHeader } from './standings/standingsHeader';
import { StandingsRow } from './standings/standingsRow';

type Props = {
  leagueId: string;
};

export const Standings = (props: Props) => {
  const { state, dispatch } = useStateContext();
  const { leagueId } = props;

  const leagueData = state.leagues[leagueId];

  useEffect(() => {
    if (leagueData == null) {
      setLeague(dispatch, leagueId);
    }
  });

  if (!leagueData) {
    return null;
  }

  const { standings } = leagueData;
  const leagueEntries = leagueData.league_entries;

  return (
    <Box>
      <Box>Standings</Box>
      <StandingsHeader></StandingsHeader>
      {standings.map((standing) => {
        const leagueEntry = _.find(
          leagueEntries,
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
