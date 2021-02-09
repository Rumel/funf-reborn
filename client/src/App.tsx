import { Container, Stack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { League } from './components/league';
import LeagueStore from './leagueStore';
import { setBootstrap, setGame } from './service';
import { useStateContext } from './store';

function App() {
  const { state, dispatch } = useStateContext();

  const { game, players, playerTypes, playerStatCategories, teams } = state;

  useEffect(() => {
    if (
      players === null ||
      playerTypes === null ||
      playerStatCategories === null ||
      teams === null
    ) {
      setBootstrap(dispatch);
    }
  }, [players, playerTypes, playerStatCategories, teams, dispatch]);

  useEffect(() => {
    if (game === null) {
      setGame(dispatch);
    }
  });

  return (
    <Container maxW='4xl'>
      <Stack spacing={3}>
        <LeagueStore
          id={11831}
          advancement={{
            possiblePromotion: [],
            possibleRelegation: [6],
            relegation: [7, 8],
            promotion: [],
          }}>
          <League />
        </LeagueStore>
        <LeagueStore
          id={41399}
          advancement={{
            possiblePromotion: [3],
            possibleRelegation: [],
            relegation: [],
            promotion: [1, 2],
          }}>
          <League />
        </LeagueStore>
      </Stack>
    </Container>
  );
}

export default App;
