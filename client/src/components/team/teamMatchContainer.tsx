import React from 'react';
import { useLeagueContext } from '../../leagueStore';
import { FunfSpinner } from '../shared/funfSpinner';
import { LeagueEntry, Match } from '../../types';
import _ from 'lodash';
import { Center, Grid, Heading, VStack } from '@chakra-ui/react';
import { MatchBox } from '../matchBox';
import { MATCH_RESULT_COLORS } from '../../constants';

type Props = {
  team: LeagueEntry;
};

const getResult = (x: number, y: number): string => {
  if (x > y) {
    return MATCH_RESULT_COLORS.WIN;
  } else if (x === y) {
    return MATCH_RESULT_COLORS.DRAW;
  } else {
    return MATCH_RESULT_COLORS.LOSS;
  }
};

const getColoredResult = (match: Match, teamId: number): string => {
  if (teamId === match.league_entry_1) {
    return getResult(match.league_entry_1_points, match.league_entry_2_points);
  } else {
    return getResult(match.league_entry_2_points, match.league_entry_1_points);
  }
};

export const TeamMatchContainer = ({ team }: Props) => {
  const { leagueState } = useLeagueContext();
  const { league_entries, matches } = leagueState;

  if (league_entries === null || matches === null) {
    return <FunfSpinner />;
  }

  const teamMatches = _.reverse(
    _.filter(
      matches,
      (m) =>
        (m.league_entry_1 === team.id || m.league_entry_2 === team.id) &&
        m.finished
    )
  );

  return (
    <Grid templateColumns={['auto', 'auto', 'repeat(2, 1fr)']} gridGap={4}>
      {teamMatches.map((m, i) => {
        const away = _.find(league_entries, (le) => le.id === m.league_entry_1);
        const home = _.find(league_entries, (le) => le.id === m.league_entry_2);

        const color = getColoredResult(m, team.id);

        if (away && home) {
          return (
            <VStack key={i} align='stretch' spacing={2}>
              {/* Add logic to render background color */}
              <Center>
                <Heading size='lg'>Gameweek {m.event}</Heading>
              </Center>
              <MatchBox
                away={away}
                home={home}
                match={m}
                color={color}></MatchBox>
            </VStack>
          );
        }

        return null;
      })}
    </Grid>
  );
};
