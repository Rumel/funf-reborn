import React, { useEffect } from 'react';
import {
  Box,
  Center,
  HStack,
  Image,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
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

const generateLine = (
  line: PlayerInfo[],
  imageWidth: string | undefined,
  textHeight: string | undefined
) => {
  return (
    <Center>
      <HStack spacing='1rem'>
        {line.map((p) => {
          return (
            <Box key={p.id}>
              <VStack spacing='0.25rem'>
                <Image w={imageWidth} src={p.url} alt={p.name} />
                <Text size={textHeight}>{p.webName}</Text>
                <Text size={textHeight}>{p.form}</Text>
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
  const imageWidth = useBreakpointValue({ base: '2.5em', md: '3.5em' });
  const textHeight = useBreakpointValue({ base: '0.75rem', md: '1rem' });

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
      {generateLine(keepers, imageWidth, textHeight)}
      {generateLine(defenders, imageWidth, textHeight)}
      {generateLine(midfielders, imageWidth, textHeight)}
      {generateLine(forwards, imageWidth, textHeight)}
      {generateLine(subs, imageWidth, textHeight)}
    </VStack>
  );
};
