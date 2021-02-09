import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Center,
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
import { TeamTransactions } from '../team/teamTransactions';
import { TeamMatchContainer } from '../team/teamMatchContainer';
import { Stats } from '../team/stats';
import { TeamLayout } from '../team/teamLayout';

type Props = {
  leagueEntry: LeagueEntry | undefined;
  standingRow: StandingRow | undefined;
  isOpen: boolean;
  onClose: () => void;
};

enum TABS {
  TEAM = 'TEAM',
  STATS = 'STATS',
  MATCHES = 'MATCHES',
  TRANSACTIONS = 'TRANSACTIONS',
}

export const TeamModal = ({
  leagueEntry,
  standingRow,
  isOpen,
  onClose,
}: Props) => {
  const [activeTab, setActiveTab] = useState(TABS.TEAM);

  if (leagueEntry === undefined || standingRow === undefined) {
    return null;
  }

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
                  isActive={activeTab === TABS.STATS}
                  onClick={() => setActiveTab(TABS.STATS)}>
                  Stats
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
              <TeamLayout leagueEntry={leagueEntry} standingRow={standingRow} />
            ) : null}
            {activeTab === TABS.STATS ? <Stats /> : null}
            {activeTab === TABS.MATCHES ? <TeamMatchContainer /> : null}
            {activeTab === TABS.TRANSACTIONS ? <TeamTransactions /> : null}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
