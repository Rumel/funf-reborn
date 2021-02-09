import React from 'react';
import { Grid } from '@chakra-ui/react';
import { LeagueEntry, Match } from '../../types';
import { MatchBox } from '../matchBox';
import _ from 'lodash';

type Props = {
  matches: Match[];
  leagueEntries: LeagueEntry[];
};

export const GwMatchContainer = ({ matches, leagueEntries }: Props) => {
  return (
    <Grid templateColumns={['auto', 'auto', 'repeat(2, 1fr)']} gridGap={4}>
      {matches.map((m, i) => {
        const away = _.find(leagueEntries, (le) => le.id === m.league_entry_1);
        const home = _.find(leagueEntries, (le) => le.id === m.league_entry_2);

        if (away && home) {
          return (
            <MatchBox key={i} away={away} home={home} match={m}></MatchBox>
          );
        }

        return null;
      })}
    </Grid>
  );
};
