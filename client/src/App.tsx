import { Container } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { League } from './components/league';
import LeagueStore from './leagueStore';
import { setBootstrap } from './service';
import { useStateContext } from './store';

function App() {
  const { state, dispatch } = useStateContext();

  const { bootstrap } = state;

  useEffect(() => {
    if (bootstrap === null) {
      setBootstrap(dispatch);
    }
  }, [bootstrap, dispatch]);

  return (
    <Container maxW='4xl'>
      <LeagueStore id={11831}>
        <League />
      </LeagueStore>
      <LeagueStore id={41399}>
        <League />
      </LeagueStore>
    </Container>
  );
}

export default App;
