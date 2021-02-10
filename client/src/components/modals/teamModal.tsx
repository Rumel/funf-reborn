import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Center,
  Container,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { LeagueEntry, StandingRow } from '../../types';
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
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent
        my={0}
        maxW='100%'
        w='100%'
        maxH='100%'
        h='100%'
        borderRadius='none'>
        <ModalHeader>{leagueEntry.entry_name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Container maxW='4xl'>
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
                  <TeamLayout
                    leagueEntry={leagueEntry}
                    standingRow={standingRow}
                  />
                ) : null}
                {activeTab === TABS.STATS ? <Stats team={leagueEntry} /> : null}
                {activeTab === TABS.MATCHES ? (
                  <TeamMatchContainer team={leagueEntry} />
                ) : null}
                {activeTab === TABS.TRANSACTIONS ? (
                  <TeamTransactions leagueEntry={leagueEntry} />
                ) : null}
              </VStack>
            </Container>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
