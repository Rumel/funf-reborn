import { Box, HStack, Text } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { FORM_COLORS } from '../constants';
import { LeagueEntry, Match } from '../types';

type Props = {
  matches: Match[];
  leagueEntry: LeagueEntry;
};

enum RESULT {
  WIN = 'WIN',
  LOSS = 'LOSS',
  DRAW = 'DRAW',
}

export const renderFormBox = (letter: string, color: string, index: number) => {
  return (
    <Box
      key={index}
      bg={color}
      paddingLeft={1}
      paddingRight={1}
      border='1px'
      borderColor='gray.600'
      borderRadius='0.25rem'>
      <Text fontSize='md' fontWeight='bold' fontFamily='Courier New'>
        {letter}
      </Text>
    </Box>
  );
};

const getMatchResult = (match: Match, teamId: number): RESULT => {
  if (match.league_entry_1 === teamId) {
    if (match.league_entry_1_points > match.league_entry_2_points) {
      return RESULT.WIN;
    } else if (match.league_entry_1_points === match.league_entry_2_points) {
      return RESULT.DRAW;
    } else {
      return RESULT.LOSS;
    }
  } else {
    if (match.league_entry_2_points > match.league_entry_1_points) {
      return RESULT.WIN;
    } else if (match.league_entry_2_points === match.league_entry_1_points) {
      return RESULT.DRAW;
    } else {
      return RESULT.LOSS;
    }
  }
};

export const Form = ({ matches, leagueEntry }: Props) => {
  // TODO: Make this look cleaner
  const teamMatches = _.takeRight(
    _.filter(
      _.filter(matches, (m) => m.finished === true),
      (m) =>
        m.league_entry_1 === leagueEntry.id ||
        m.league_entry_2 === leagueEntry.id
    ),
    5
  );

  return (
    <HStack>
      {teamMatches.map((m, index) => {
        const { id } = leagueEntry;
        const result = getMatchResult(m, id);

        if (result === RESULT.WIN) {
          return renderFormBox('W', FORM_COLORS.WIN, index);
        } else if (result === RESULT.DRAW) {
          return renderFormBox('D', FORM_COLORS.DRAW, index);
        } else {
          return renderFormBox('L', FORM_COLORS.LOSS, index);
        }
      })}
    </HStack>
  );
};
