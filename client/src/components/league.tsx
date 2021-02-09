import React, { useEffect } from 'react';
import { Box, Center, Heading, VStack } from '@chakra-ui/react';

import { Standings } from './standings';
import { GameweekContainer } from './gameweek/gameweekContainer';
import { setLeague } from '../service';
import { FunfSpinner } from './shared/funfSpinner';
import { useLeagueContext } from '../leagueStore';

export const League = () => {
  const { leagueState, leagueDispatch } = useLeagueContext();
  const { id } = leagueState;
  const { league } = leagueState;

  useEffect(() => {
    if (league === null && id !== null) {
      setLeague(leagueDispatch, id);
    }
  }, [league, id, leagueDispatch]);

  if (!league) {
    return <FunfSpinner />;
  }

  return (
    <Box>
      <VStack spacing='1rem' align='stretch'>
        <Box>
          <Center>
            <Heading>{league.name}</Heading>
          </Center>
        </Box>
        <Standings />
        <GameweekContainer />
      </VStack>
    </Box>
  );
};
