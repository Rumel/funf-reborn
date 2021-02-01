import React, { useEffect } from 'react';
import { Box, Center, Heading } from '@chakra-ui/react';

import { Standings } from './standings';
import { MatchContainer } from './matchContainer';
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
  }, []);

  if (!league) {
    return <FunfSpinner />;
  }

  return (
    <Box>
      <Box>
        <Center>
          <Heading>{league.name}</Heading>
        </Center>
      </Box>
      <Standings />
      <MatchContainer />
    </Box>
  );
};
