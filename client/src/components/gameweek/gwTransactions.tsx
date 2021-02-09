import React from 'react';
import { Center, Grid, Heading, VStack } from '@chakra-ui/react';
import { LeagueEntry, Player, Transaction } from '../../types';
import { generatePlayerInfo } from '../../helpers/generatePlayerInfo';
import { GwTransactionBox } from './gwTransactionBox';
import _ from 'lodash';

type Props = {
  transactions: Transaction[];
  players: Player[];
  leagueEntries: LeagueEntry[];
};

export const GwTransactions = ({
  transactions,
  players,
  leagueEntries,
}: Props) => {
  console.log(transactions);
  return (
    <VStack align='stretch'>
      <Center>
        <Heading size='lg'>Transactions</Heading>
      </Center>
      <Grid
        templateColumns={['auto', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
        gridGap='2rem'>
        {transactions.map((t) => {
          const inP = _.find(players, (p) => p.id === t.element_in);
          const outP = _.find(players, (p) => p.id === t.element_out);
          const team = _.find(leagueEntries, (le) => le.entry_id === t.entry);

          if (inP && outP && team) {
            const inPlayer = generatePlayerInfo(inP);
            const outPlayer = generatePlayerInfo(outP);

            return (
              <GwTransactionBox
                inPlayer={inPlayer}
                outPlayer={outPlayer}
                transaction={t}
                team={team}
              />
            );
          } else {
            return null;
          }
        })}
      </Grid>
    </VStack>
  );
};
