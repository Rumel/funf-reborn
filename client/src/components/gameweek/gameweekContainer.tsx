import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  Select,
  VStack,
} from '@chakra-ui/react';

import { useStateContext } from '../../store';
import { useLeagueContext } from '../../leagueStore';
import _ from 'lodash';
import { GwTransactions } from './gwTransactions';
import { setTransactions } from '../../service';
import { GwMatchContainer } from './gwMatchContainer';

enum TABS {
  MATCHES = 'MATCHES',
  TRANSACTIONS = 'TRANSACTIONS',
}

export const GameweekContainer = () => {
  const { state } = useStateContext();
  const { leagueState, leagueDispatch } = useLeagueContext();
  const [selectedGameweek, setSelectedGameweek] = useState<number | null>(null);
  const { game, players } = state;
  const { id, league_entries, matches, transactions } = leagueState;
  const [activeTab, setActiveTab] = useState(TABS.MATCHES);

  useEffect(() => {
    if (game !== null) {
      setSelectedGameweek(game.current_event);
    }
  }, [game]);

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
    players === null ||
    league_entries === null
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
      <Center>
        <ButtonGroup variant='outline' isAttached>
          <Button
            isActive={activeTab === TABS.MATCHES}
            onClick={() => setActiveTab(TABS.MATCHES)}>
            Matches
          </Button>
          <Button
            isActive={activeTab === TABS.TRANSACTIONS}
            onClick={() => setActiveTab(TABS.TRANSACTIONS)}>
            Transactions
          </Button>
        </ButtonGroup>
      </Center>
      {activeTab === TABS.MATCHES ? (
        <GwMatchContainer
          leagueEntries={league_entries}
          matches={currentMatches}
        />
      ) : null}
      {activeTab === TABS.TRANSACTIONS ? (
        <GwTransactions
          transactions={currentTransactions}
          players={players}
          leagueEntries={league_entries}
        />
      ) : null}
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
