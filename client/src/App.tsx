import { Container } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { League } from './components/league';
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
    <Container>
      <League />
      <League />
    </Container>
  );
}

export default App;
