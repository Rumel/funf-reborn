import React, { useEffect } from 'react';
import { Box, Center, Heading } from '@chakra-ui/react';

import { Standings } from './standings';
import { MatchContainer } from './matchContainer';
import { useStateContext } from '../store';
import { setLeague, setLeagueTwo } from '../service';
import { FunfSpinner } from './shared/funfSpinner';
import { useLeagueContext } from '../leagueStore';

type Props = {
  name: string;
  id: string;
};

export const League = (props: Props) => {
  const { state, dispatch } = useStateContext();
  const { leagueState, leagueDispatch } = useLeagueContext();
  const { id } = props;

  const leagueData = state.leagues[id];
  const otherLeagueId = leagueState.id;
  const otherLeague = leagueState.league;

  useEffect(() => {
    if (leagueData == null) {
      setLeague(dispatch, id);
    }
  });

  useEffect(() => {
    if (otherLeague === null) {
      if (otherLeagueId !== null) {
        setLeagueTwo(leagueDispatch, otherLeagueId);
      }
    }
  });

  if (!leagueData) {
    return <FunfSpinner />;
  }

  const { league } = leagueData;
  const leagueEntries = leagueData.league_entries;

  console.log(league);

  console.log('Other League');
  console.log(otherLeague);

  return (
    <Box>
      <Box>
        <Center>
          <Heading>{league.name}</Heading>
        </Center>
      </Box>
      <Standings leagueId={id} />
      <MatchContainer />
    </Box>
  );
};
