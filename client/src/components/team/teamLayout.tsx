import React, { useEffect, useState } from 'react';
import {
  Box,
  Center,
  HStack,
  Image,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { LeagueEntry, LiveData, PlayerInfo, Position } from '../../types';
import { useStateContext } from '../../store';
import { useLeagueContext } from '../../leagueStore';
import { setLive, setPicks } from '../../service';
import { generatePlayerInfoFromPick } from '../../helpers/generatePlayerInfo';
import _ from 'lodash';
import { FunfSpinner } from '../shared/funfSpinner';

type Props = {
  leagueEntry: LeagueEntry;
  event?: number;
};

const generateLine = (
  line: PlayerInfo[],
  live: LiveData | null,
  imageWidth: string | undefined,
  textHeight: string | undefined,
  smallerTextHeight: string | undefined
) => {
  return (
    <Center>
      <HStack spacing='1rem'>
        {line.map((p) => {
          let points = 0;
          if (live) {
            points = live.elements[p.id].stats.total_points;
          }

          return (
            <Box key={p.id}>
              <VStack spacing='0.25rem'>
                <Image w={imageWidth} src={p.url} alt={p.name} />
                <Text fontSize={textHeight}>{p.webName}</Text>
                {p.matches ? (
                  <Text fontSize={smallerTextHeight}>{p.matches}</Text>
                ) : null}
                <Text fontSize={textHeight}>{live ? points : p.form}</Text>
              </VStack>
            </Box>
          );
        })}
      </HStack>
    </Center>
  );
};

export const TeamLayout = ({ leagueEntry, event }: Props) => {
  const { state, dispatch } = useStateContext();
  const { game, live, players } = state;
  const { leagueState, leagueDispatch } = useLeagueContext();
  const { picks } = leagueState;
  const imageWidth = useBreakpointValue({ base: '2.5em', md: '3.5em' });
  const textHeight = useBreakpointValue({ base: '1rem', md: '1rem' });
  const smallerTextHeight = useBreakpointValue({
    base: '0.5rem',
    md: '0.75rem',
  });
  const [gameweek, setGameWeek] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (game) {
      setGameWeek(game.current_event);
    }
  }, [setGameWeek, game]);

  useEffect(() => {
    if (event) {
      setGameWeek(event);
    }
  }, [setGameWeek, event]);

  useEffect(() => {
    if (gameweek) {
      if (!picks[`${leagueEntry.entry_id}-${gameweek}`]) {
        setPicks(leagueDispatch, leagueEntry.entry_id, gameweek);
      }
    }
  }, [gameweek, leagueEntry, picks, leagueDispatch]);

  useEffect(() => {
    if (event && !live[event]) {
      setLive(dispatch, event);
    }
  }, [event, live, dispatch]);

  if (!(gameweek && players)) {
    return <FunfSpinner />;
  }

  if (event && !live[event]) {
    return <FunfSpinner />;
  }

  const teamPicks = picks[`${leagueEntry.entry_id}-${gameweek}`];
  const currentLive = live[gameweek];

  if (!teamPicks) {
    return <FunfSpinner />;
  }

  const teamPlayers = teamPicks.picks
    .filter((p) => p.position < 12)
    .map((p) => generatePlayerInfoFromPick(p, players, currentLive));
  const subs = teamPicks.picks
    .filter((p) => p.position > 11)
    .map((p) => generatePlayerInfoFromPick(p, players, currentLive));

  const keepers = _.filter(teamPlayers, (p) => p.position === Position.GKP);
  const defenders = _.filter(teamPlayers, (p) => p.position === Position.DEF);
  const midfielders = _.filter(teamPlayers, (p) => p.position === Position.MID);
  const forwards = _.filter(teamPlayers, (p) => p.position === Position.FWD);

  return (
    <VStack spacing='0.5rem'>
      {generateLine(
        keepers,
        currentLive,
        imageWidth,
        textHeight,
        smallerTextHeight
      )}
      {generateLine(
        defenders,
        currentLive,
        imageWidth,
        textHeight,
        smallerTextHeight
      )}
      {generateLine(
        midfielders,
        currentLive,
        imageWidth,
        textHeight,
        smallerTextHeight
      )}
      {generateLine(
        forwards,
        currentLive,
        imageWidth,
        textHeight,
        smallerTextHeight
      )}
      {generateLine(
        subs,
        currentLive,
        imageWidth,
        textHeight,
        smallerTextHeight
      )}
    </VStack>
  );
};
