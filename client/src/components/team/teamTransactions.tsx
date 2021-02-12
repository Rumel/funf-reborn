import React, { useEffect } from 'react';
import { Box, Grid, Heading, VStack } from '@chakra-ui/react';
import { LeagueEntry } from '../../types';
import { useLeagueContext } from '../../leagueStore';
import { FunfSpinner } from '../shared/funfSpinner';
import _ from 'lodash';
import { setBootstrap, setTransactions } from '../../service';
import { useStateContext } from '../../store';
import { generatePlayerInfo } from '../../helpers/generatePlayerInfo';
import { TransactionBox } from '../shared/transactionBox';

type Props = {
  leagueEntry: LeagueEntry;
};

export const TeamTransactions = ({ leagueEntry }: Props) => {
  const { state, dispatch } = useStateContext();
  const { players } = state;
  const { leagueState, leagueDispatch } = useLeagueContext();
  const { id, transactions } = leagueState;

  useEffect(() => {
    if (transactions === null && id !== null) {
      setTransactions(leagueDispatch, id);
    }
  }, [id, transactions, leagueDispatch]);

  useEffect(() => {
    if (players === null) {
      setBootstrap(dispatch);
    }
  }, [players, dispatch]);

  if (transactions === null || players === null) {
    return <FunfSpinner />;
  }

  const teamTransactions = _.filter(
    transactions,
    (t) => t.entry === leagueEntry.entry_id
  );

  const transactionsByWeek = _.groupBy(teamTransactions, 'event');
  const weeks = _.reverse(Object.entries(transactionsByWeek));

  return (
    <Box>
      {weeks.map(([w, transfers], index) => {
        const sortedTransfers = _.sortBy(transfers, 'index');

        return (
          <VStack align='stretch' key={index}>
            <Heading>Gameweek {w}</Heading>
            <Grid
              templateColumns={['auto', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
              gridGap='2rem'>
              {sortedTransfers.map((t, index) => {
                const inP = _.find(players, (p) => p.id === t.element_in);
                const outP = _.find(players, (p) => p.id === t.element_out);

                if (inP && outP) {
                  const inPlayer = generatePlayerInfo(inP);
                  const outPlayer = generatePlayerInfo(outP);

                  return (
                    <TransactionBox
                      inPlayer={inPlayer}
                      outPlayer={outPlayer}
                      transaction={t}
                      key={index}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </Grid>
          </VStack>
        );
      })}
    </Box>
  );
};
