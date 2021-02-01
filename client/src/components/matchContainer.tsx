import React, { useEffect, useState } from 'react';
import { Grid } from '@chakra-ui/react';

import { Match } from './match';
import { useStateContext } from '../store';
import { useLeagueContext } from '../leagueStore';
import _ from 'lodash';

export const MatchContainer = () => {
  const { state, dispatch } = useStateContext();
  const { leagueState, leagueDispatch } = useLeagueContext();
  const [selectedGameweek, setSelectedGameweek] = useState<number | null>(null);
  const { game } = state;
  const { league_entries, matches } = leagueState;

  useEffect(() => {
    if (game !== null) {
      setSelectedGameweek(game.current_event);
    }
  }, [game]);

  if (game === null || matches === null || selectedGameweek === null) {
    return null;
  }

  const currentMatches = _.filter(matches, (m) => m.event === selectedGameweek);

  return (
    <Grid templateColumns='repeat(2, 1fr)'>
      {currentMatches.map((m, i) => {
        const away = _.find(league_entries, (le) => le.id === m.league_entry_1);
        const home = _.find(league_entries, (le) => le.id === m.league_entry_2);

        if (away && home) {
          return <Match key={i} away={away} home={home} match={m}></Match>;
        }

        return null;
      })}
    </Grid>
  );
};
