import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Box, Container, Grid, Table } from '@material-ui/core';
import { getBootstrap } from './service';
import { useStateContext } from './store';

function App() {
  const { state, dispatch } = useStateContext();

  const { bootstrap } = state;

  useEffect(() => {
    if (bootstrap === null) {
      getBootstrap(dispatch);
    }
  }, [bootstrap, dispatch]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box>Test</Box>
        </Grid>
        <Grid item xs={12}>
          <Box maxHeight="64px">
            <img src={logo} style={{ maxHeight: '48px' }} alt="logo" />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Table></Table>
        </Grid>
        <Grid item xs={12}>
          <Box component="span">{JSON.stringify(bootstrap)}</Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
