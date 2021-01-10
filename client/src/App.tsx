import React, { useEffect } from 'react';
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

  return <div>App</div>;
}

export default App;
