import React, { useEffect } from 'react';
import {
  Center,
  Container,
  Flex,
  Heading,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { LeagueEntry } from '../../types';
import { useLeagueContext } from '../../leagueStore';
import { FunfSpinner } from '../shared/funfSpinner';
import { setLeague } from '../../service';
import _ from 'lodash';
import * as ss from 'simple-statistics';

type Props = {
  team: LeagueEntry;
};

const renderStatBox = (
  stat: string,
  value: string | number,
  tooltip?: string | undefined
) => {
  return (
    <VStack>
      <Tooltip label={tooltip} placement='top'>
        <Heading
          size='lg'
          pl={2}
          pr={2}
          pb={2}
          borderBottom='0.1rem solid black'>
          {stat}
        </Heading>
      </Tooltip>
      <Heading size='xl'>{value}</Heading>
    </VStack>
  );
};

export const Stats = ({ team }: Props) => {
  const { leagueState, leagueDispatch } = useLeagueContext();
  const { id, matches, standings } = leagueState;

  useEffect(() => {
    if ((matches === null || standings === null) && id !== null) {
      setLeague(leagueDispatch, id);
    }
  }, [matches, standings, id, leagueDispatch]);

  if (matches === null || standings === null) {
    return <FunfSpinner />;
  }

  const standingRow = _.find(standings, (st) => st.league_entry === team.id);

  if (!standingRow) {
    return null;
  }

  console.log(standingRow);

  const teamMatches = _.filter(
    matches,
    (m) =>
      (m.league_entry_1 === team.id || m.league_entry_2 === team.id) &&
      m.finished
  );

  const teamPoints = _.map(teamMatches, (m) =>
    m.league_entry_1 === team.id
      ? m.league_entry_1_points
      : m.league_entry_2_points
  );

  const average = Math.round(ss.average(teamPoints));
  const median = ss.median(teamPoints);
  const mode = ss.mode(teamPoints);
  const stdv = Math.round(ss.standardDeviation(teamPoints));
  const low = ss.min(teamPoints);
  const high = ss.max(teamPoints);

  return (
    <Center>
      <Container size='xl'>
        <VStack spacing={8} align='stretch'>
          <Flex align='stretch' justify='space-around'>
            {renderStatBox('W', standingRow.matches_won, 'Wins')}
            {renderStatBox('L', standingRow.matches_lost, 'Losses')}
            {renderStatBox('D', standingRow.matches_drawn, 'Draws')}
            {renderStatBox('Pts', standingRow.total, 'Total Points')}
          </Flex>
          <Flex align='stretch' justify='space-around'>
            {renderStatBox('Avg', average, 'Average of Match Points')}
            {renderStatBox('Med', median, 'Median of Match Points')}
            {renderStatBox('Mode', mode, 'Mode of Match Points')}
            {renderStatBox('SD', stdv, 'Standard Deviation of Match Points')}
          </Flex>
          <Flex align='stretch' justify='space-around'>
            {renderStatBox('High', high, 'Highest Match Points')}
            {renderStatBox('Low', low, 'Lowest Match Points')}
          </Flex>
        </VStack>
      </Container>
    </Center>
  );
};
