import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { LeagueEntry, PlayerInfo, Position, StandingRow } from '../../types';
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

enum TABS {
  TEAM = 'TEAM',
  MATCHES = 'MATCHES',
  TRANSACTIONS = 'TRANSACTIONS',
}

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

export const TeamModal = (props: Props) => {
  const { state, dispatch } = useStateContext();
  const { game, players } = state;
  const { leagueState, leagueDispatch } = useLeagueContext();
  const { picks } = leagueState;
  const { leagueEntry, standingRow, isOpen, onClose } = props;
  const [activeTab, setActiveTab] = useState(TABS.TEAM);

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
  const subs = teamPicks.picks
    .filter((p) => p.position > 11)
    .map((p) => generatePlayerInfoFromPick(p, players));

  const keepers = _.filter(teamPlayers, (p) => p.position === Position.GKP);
  const defenders = _.filter(teamPlayers, (p) => p.position === Position.DEF);
  const midfielders = _.filter(teamPlayers, (p) => p.position === Position.MID);
  const forwards = _.filter(teamPlayers, (p) => p.position === Position.FWD);

  return (
    <Modal isOpen={isOpen} size='full' onClose={onClose}>
      <ModalOverlay />
      <ModalContent my={0}>
        <ModalHeader>{leagueEntry.entry_name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align='stretch' padding={2}>
            <Center>
              <ButtonGroup variant='outline' isAttached>
                <Button
                  isActive={activeTab === TABS.TEAM}
                  onClick={() => setActiveTab(TABS.TEAM)}>
                  Team
                </Button>
                <Button
                  isActive={activeTab === TABS.MATCHES}
                  onClick={() => setActiveTab(TABS.MATCHES)}>
                  Matches
                </Button>
                <Button
                  isActive={activeTab === TABS.TRANSACTIONS}
                  onClick={() => setActiveTab(TABS.TRANSACTIONS)}>
                  Transactions
                </Button>
              </ButtonGroup>
            </Center>
            {activeTab === TABS.TEAM ? (
              <VStack spacing='0.5rem'>
                {generateLine(keepers)}
                {generateLine(defenders)}
                {generateLine(midfielders)}
                {generateLine(forwards)}
                {generateLine(subs)}
              </VStack>
            ) : null}
            {activeTab === TABS.MATCHES ? (
              <Center>
                <Heading size='xl'>Not Yet Implemented</Heading>
              </Center>
            ) : null}
            {activeTab === TABS.TRANSACTIONS ? (
              <Center>
                <Heading size='xl'>Not Yet Implemented</Heading>
              </Center>
            ) : null}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
