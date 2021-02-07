import React from 'react';
import { Box } from '@chakra-ui/react';
import { Player, Transaction } from '../types';
import { generatePlayerInfo } from '../helpers/generatePlayerInfo';
import { TransactionBox } from './transactionBox';
import _ from 'lodash';

type Props = {
  transactions: Transaction[];
  players: Player[];
};

export const Transactions = ({ transactions, players }: Props) => {
  return (
    <Box>
      <h1>Transactions</h1>
      {transactions.map((t) => {
        const inP = _.find(players, (p) => p.id === t.element_in);
        const outP = _.find(players, (p) => p.id === t.element_out);

        if (inP && outP) {
          const inPlayer = generatePlayerInfo(inP);
          const outPlayer = generatePlayerInfo(outP);

          return <TransactionBox inPlayer={inPlayer} outPlayer={outPlayer} />;
        } else {
          return null;
        }
      })}
    </Box>
  );
};
