import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import {
  LeagueEntry,
  PickType,
  Player,
  PlayerInfo,
  Position,
  StandingRow,
} from '../../types';
import { useLeagueContext } from '../../leagueStore';
import { useStateContext } from '../../store';
import { setBootstrap, setGame, setPicks } from '../../service';
import _ from 'lodash';
import { generatePlayerInfoFromPick } from '../../helpers/generatePlayerInfo';

type Props = {
  leagueEntry: LeagueEntry | undefined;
  standingRow: StandingRow | undefined;
  isOpen: boolean;
  onClose: () => void;
};

const generateLine = (line: PlayerInfo[]) => {
  return (
    <Center>
      <HStack spacing='1rem'>
        {line.map((p) => {
          return (
            <Box>
              <VStack spacing='0.25rem'>
                <Image w='45px' src={p.url} alt={p.name} />
                <p key={p.id}>{p.webName}</p>
              </VStack>
            </Box>
          );
        })}
      </HStack>
    </Center>
  );
};

export const TeamModal = (props: Props) => {
  const { state, dispatch } = useStateContext();
  const { game, players } = state;
  const { leagueState, leagueDispatch } = useLeagueContext();
  const { picks } = leagueState;
  const { leagueEntry, standingRow, isOpen, onClose } = props;

  console.log(leagueEntry);

  useEffect(() => {
    if (!players) {
      setBootstrap(dispatch);
    }
  }, [players, dispatch]);

  useEffect(() => {
    if (leagueEntry && standingRow) {
      if (game) {
        if (!picks[`${leagueEntry.entry_id}-${game.current_event}`]) {
          setPicks(leagueDispatch, leagueEntry.entry_id, game.current_event);
        }
      } else {
        setGame(dispatch);
      }
    }
  }, [leagueEntry, standingRow, game, picks, dispatch, leagueDispatch]);

  if (!(leagueEntry && standingRow && game && players)) {
    return null;
  }

  if (!picks[`${leagueEntry.entry_id}-${game.current_event}`]) {
    return null;
  }

  const teamPicks = picks[`${leagueEntry.entry_id}-${game.current_event}`];
  const teamPlayers = teamPicks.picks
    .filter((p) => p.position < 12)
    .map((p) => generatePlayerInfoFromPick(p, players));
  //Position isn't position, generate a player info to be passed in
  const keepers = _.filter(teamPlayers, (p) => p.position === Position.GKP);
  const defenders = _.filter(teamPlayers, (p) => p.position === Position.DEF);
  const midfielders = _.filter(teamPlayers, (p) => p.position === Position.MID);
  const forwards = _.filter(teamPlayers, (p) => p.position === Position.FWD);

  return (
    <Modal isOpen={isOpen} size='full' onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{leagueEntry.entry_name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {generateLine(keepers)}
          {generateLine(defenders)}
          {generateLine(midfielders)}
          {generateLine(forwards)}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='ghost'>Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
