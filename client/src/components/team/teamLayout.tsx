import React, { useEffect } from 'react';
import { Box, Center, HStack, Image, VStack } from '@chakra-ui/react';
import { LeagueEntry, PlayerInfo, Position, StandingRow } from '../../types';
import { useStateContext } from '../../store';
import { useLeagueContext } from '../../leagueStore';
import { setBootstrap, setGame, setPicks } from '../../service';
import { generatePlayerInfoFromPick } from '../../helpers/generatePlayerInfo';
import _ from 'lodash';

type Props = {
  leagueEntry: LeagueEntry;
  standingRow: StandingRow;
};

const generateLine = (line: PlayerInfo[]) => {
  return (
    <Center>
      <HStack spacing='1rem'>
        {line.map((p) => {
          return (
            <Box key={p.id}>
              <VStack spacing='0.25rem'>
                <Image w='45px' src={p.url} alt={p.name} />
                <p>{p.webName}</p>
                <p>{p.form}</p>
              </VStack>
            </Box>
          );
        })}
      </HStack>
    </Center>
  );
};

export const TeamLayout = ({ leagueEntry, standingRow }: Props) => {
  const { state, dispatch } = useStateContext();
  const { game, players } = state;
  const { leagueState, leagueDispatch } = useLeagueContext();
  const { picks } = leagueState;

  useEffect(() => {
    if (!players) {
      setBootstrap(dispatch);
    }
  }, [players, dispatch]);

  useEffect(() => {
    if (game) {
      if (!picks[`${leagueEntry.entry_id}-${game.current_event}`]) {
        setPicks(leagueDispatch, leagueEntry.entry_id, game.current_event);
      }
    } else {
      setGame(dispatch);
    }
  }, [leagueEntry, game, picks, dispatch, leagueDispatch]);

  if (!(game && players)) {
    return null;
  }

  if (!picks[`${leagueEntry.entry_id}-${game.current_event}`]) {
    return null;
  }

  const teamPicks = picks[`${leagueEntry.entry_id}-${game.current_event}`];
  const teamPlayers = teamPicks.picks
    .filter((p) => p.position < 12)
    .map((p) => generatePlayerInfoFromPick(p, players));
  const subs = teamPicks.picks
    .filter((p) => p.position > 11)
    .map((p) => generatePlayerInfoFromPick(p, players));

  const keepers = _.filter(teamPlayers, (p) => p.position === Position.GKP);
  const defenders = _.filter(teamPlayers, (p) => p.position === Position.DEF);
  const midfielders = _.filter(teamPlayers, (p) => p.position === Position.MID);
  const forwards = _.filter(teamPlayers, (p) => p.position === Position.FWD);

  return (
    <VStack spacing='0.5rem'>
      {generateLine(keepers)}
      {generateLine(defenders)}
      {generateLine(midfielders)}
      {generateLine(forwards)}
      {generateLine(subs)}
    </VStack>
  );
};
