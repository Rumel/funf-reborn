import React, { useEffect, useState } from 'react';
import {
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  VStack,
} from '@chakra-ui/react';

import { Match } from './match';
import { useStateContext } from '../store';
import { useLeagueContext } from '../leagueStore';
import _ from 'lodash';
import { Transactions } from './transactions';
import { setBootstrap, setTransactions } from '../service';

export const GameweekContainer = () => {
  const { state, dispatch } = useStateContext();
  const { leagueState, leagueDispatch } = useLeagueContext();
  const [selectedGameweek, setSelectedGameweek] = useState<number | null>(null);
  const { game, players } = state;
  const { id, league_entries, matches, transactions } = leagueState;

  useEffect(() => {
    if (game !== null) {
      setSelectedGameweek(game.current_event);
    }
  }, [game]);

  useEffect(() => {
    if (players === null) {
      setBootstrap(dispatch);
    }
  }, [players, dispatch]);

  useEffect(() => {
    if (transactions === null && id !== null) {
      setTransactions(leagueDispatch, id);
    }
  }, [id, transactions, leagueDispatch]);

  if (
    game === null ||
    matches === null ||
    selectedGameweek === null ||
    transactions === null ||
    players === null
  ) {
    return null;
  }

  const handleGameweekChange = (week: number) => {
    setSelectedGameweek(week);
  };

  const currentMatches = _.filter(matches, (m) => m.event === selectedGameweek);
  const currentTransactions = _.filter(
    transactions,
    (t) => t.event === selectedGameweek
  );
  const gameWeeks = _.reverse(_.range(1, game.current_event + 1));

  return (
    <VStack spacing='1rem' align='stretch'>
      <Center>
        <Heading size='xl'>Gameweek {selectedGameweek}</Heading>
      </Center>
      <Grid templateColumns={['auto', 'auto', 'repeat(2, 1fr)']} gridGap={4}>
        {currentMatches.map((m, i) => {
          const away = _.find(
            league_entries,
            (le) => le.id === m.league_entry_1
          );
          const home = _.find(
            league_entries,
            (le) => le.id === m.league_entry_2
          );

          if (away && home) {
            return <Match key={i} away={away} home={home} match={m}></Match>;
          }

          return null;
        })}
      </Grid>
      <Transactions transactions={currentTransactions} players={players} />
      <Flex align='flex' justifyContent='flex-end' pr={2}>
        <Select
          onChange={(e) => handleGameweekChange(parseInt(e.target.value, 10))}
          value={selectedGameweek}
          w='5rem'>
          {gameWeeks.map((gw) => {
            return <option key={gw}>{gw}</option>;
          })}
        </Select>
      </Flex>
    </VStack>
  );
};
