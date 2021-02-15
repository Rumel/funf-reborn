import React, { useEffect } from 'react';
import { Center, Flex, Grid, Heading, VStack } from '@chakra-ui/react';
import { LeagueEntry } from '../../types';
import { useLeagueContext } from '../../leagueStore';
import { FunfSpinner } from '../shared/funfSpinner';
import { setTransactions } from '../../service';
import _ from 'lodash';
import * as ss from 'simple-statistics';

type Props = {
  team: LeagueEntry;
};

const renderStatLabel = (
  label: string,
  size?: '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | undefined
) => {
  return (
    <Flex align='stretch' flexFlow='row-reverse'>
      <Heading size={size ? size : 'md'}>{label} |</Heading>
    </Flex>
  );
};

const renderStat = (
  stat: string | number,
  size?: '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | undefined
) => {
  return (
    <Flex align='stretch' flexFlow='row' pl={2}>
      <Heading size={size ? size : 'md'}>{stat}</Heading>
    </Flex>
  );
};

const renderStatBox = (
  heading: string,
  stats: { stat: string | number; label: string }[]
) => {
  return (
    <VStack align='stretch'>
      <Center>
        <Heading size='2xl'>{heading}</Heading>
      </Center>
      <Grid gridTemplateColumns='repeat(2, 1fr)'>
        {stats.map((item, index) => (
          <React.Fragment key={index}>
            {renderStatLabel(item.label)}
            {renderStat(item.stat)}
          </React.Fragment>
        ))}
      </Grid>
    </VStack>
  );
};

export const Stats = ({ team }: Props) => {
  const { leagueState, leagueDispatch } = useLeagueContext();
  const { id, matches, standings, transactions } = leagueState;

  useEffect(() => {
    if (transactions === null && id !== null) {
      setTransactions(leagueDispatch, id);
    }
  }, [transactions, id, leagueDispatch]);

  if (matches === null || standings === null || transactions === null) {
    return <FunfSpinner />;
  }

  const standingRow = _.find(standings, (st) => st.league_entry === team.id);

  if (!standingRow) {
    return null;
  }

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

  const transfers = _.filter(transactions, (t) => t.entry === team.entry_id);
  const acceptedTransfers = _.filter(transfers, (t) => t.result === 'a').length;
  const failedTransfers = _.filter(transfers, (t) => t.result !== 'a').length;

  return (
    <VStack align='stretch' spacing={4}>
      {renderStatBox('League Stats', [
        { label: 'Rank', stat: standingRow.rank },
        { label: 'Wins', stat: standingRow.matches_won },
        { label: 'Losses', stat: standingRow.matches_lost },
        { label: 'Draws', stat: standingRow.matches_drawn },
        { label: 'Pts For', stat: standingRow.points_for },
        { label: 'Pts Against', stat: standingRow.points_against },
        { label: 'Team Pts', stat: standingRow.total },
      ])}
      {renderStatBox('Match Stats', [
        { label: 'Average', stat: average },
        { label: 'Median', stat: median },
        { label: 'Mode', stat: mode },
        { label: 'Std. Dev.', stat: stdv },
        { label: 'High', stat: high },
        { label: 'Low', stat: low },
      ])}
      {renderStatBox('Transfers', [
        { label: 'Accepted', stat: acceptedTransfers },
        { label: 'Failed', stat: failedTransfers },
      ])}
    </VStack>
  );
};
