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
  });

  useEffect(() => {
    if (game === null) {
      setGame(dispatch);
    }
  });

  return (
    <Container maxW='4xl'>
      <Stack spacing={3}>
        <LeagueStore id={11831}>
          <League />
        </LeagueStore>
        <LeagueStore id={41399}>
          <League />
        </LeagueStore>
      </Stack>
    </Container>
  );
}

export default App;
