import React, { useEffect } from 'react';
import { Box, Center, Heading } from '@chakra-ui/react';

import { Standings } from './standings';
import { MatchContainer } from './matchContainer';
import { useStateContext } from '../store';
import { setLeague } from '../service';
import { FunfSpinner } from './shared/funfSpinner';

type Props = {
  name: string;
  id: string;
};

export const League = (props: Props) => {
  const { state, dispatch } = useStateContext();
  const { id } = props;

  const leagueData = state.leagues[id];

  useEffect(() => {
    if (leagueData == null) {
      setLeague(dispatch, id);
    }
  });

  if (!leagueData) {
    return <FunfSpinner />;
  }

  const { league } = leagueData;
  const leagueEntries = leagueData.league_entries;

  console.log(league);

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
