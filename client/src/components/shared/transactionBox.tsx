import { Box, Center, Flex, Heading, Image, VStack } from '@chakra-ui/react';
import React from 'react';
import { LeagueEntry, PlayerInfo, Transaction } from '../../types';
import { FaArrowDown, FaTrashAlt } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { TRANSFER_COLORS } from '../../constants';

type Props = {
  inPlayer: PlayerInfo;
  outPlayer: PlayerInfo;
  transaction: Transaction;
  team?: LeagueEntry;
};

export const getBackgroundColor = (transaction: Transaction): string => {
  if (transaction.result === 'a') {
    return TRANSFER_COLORS.ACCEPTED;
  }

  return TRANSFER_COLORS.DENIED;
};

export const TransactionBox = ({
  inPlayer,
  outPlayer,
  transaction,
  team,
}: Props) => {
  return (
    <Box
      border='1px solid black'
      p={2}
      borderRadius='0.5rem'
      bgColor={getBackgroundColor(transaction)}>
      <Flex align='stretch' justify='space-between'>
        <VStack>
          <Image w='4rem' src={inPlayer.url} />
          <p>{inPlayer.webName}</p>
          {transaction.result === 'a' ? <FaArrowDown /> : null}
        </VStack>
        <VStack>
          <Image w='4rem' src={outPlayer.url} />
          <p>{outPlayer.webName}</p>
          {transaction.result === 'a' ? <FaTrashAlt /> : null}
        </VStack>
      </Flex>
      {transaction.result !== 'a' ? (
        <Center>
          <GrClose />
        </Center>
      ) : null}
      {team ? (
        <Center>
          <Heading size='l'>{team.entry_name}</Heading>
        </Center>
      ) : null}
    </Box>
  );
};
