import { Center, Container, Link, Stack, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { League } from './components/league';
import LeagueStore from './leagueStore';
import { setBootstrap, setGame } from './service';
import { useStateContext } from './store';
import { FaAws, FaGithub } from 'react-icons/fa';

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
    <Container maxW='4xl' pt={4} pb={4}>
      <Stack spacing={3}>
        <LeagueStore
          id={26216}
          advancement={{
            possiblePromotion: [],
            possibleRelegation: [6],
            relegation: [7, 8],
            promotion: [],
          }}>
          <League />
        </LeagueStore>
        <LeagueStore
          id={93935}
          advancement={{
            possiblePromotion: [3],
            possibleRelegation: [],
            relegation: [],
            promotion: [1, 2],
          }}>
          <League />
        </LeagueStore>
        <Center>
          <FaAws size='2rem' />
          <Text pl={4}>Powered by AWS Lambda</Text>
        </Center>
        <Center>
          <FaGithub size='2rem' />
          <Link isExternal pl={4} href='https://github.com/Rumel/funf-reborn'>
            <Text>Source Code</Text>
          </Link>
        </Center>
      </Stack>
    </Container>
  );
}

export default App;
