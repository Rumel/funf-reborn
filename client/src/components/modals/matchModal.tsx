import React from 'react';
import {
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { LeagueEntry } from '../../types';
import { useStateContext } from '../../store';
import { useLeagueContext } from '../../leagueStore';
import { TeamLayout } from '../team/teamLayout';

type Props = {
  home: LeagueEntry;
  homeScore: number;
  away: LeagueEntry;
  awayScore: number;
  event: number;
  isOpen: boolean;
  onClose: () => void;
};

export const MatchModal = ({
  isOpen,
  onClose,
  home,
  away,
  homeScore,
  awayScore,
  event,
}: Props) => {
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
        <ModalHeader>
          GW {event}: {away.entry_name} ({awayScore}) vs {home.entry_name} (
          {homeScore})
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Center>
              <Heading>
                {away.entry_name} - {awayScore}
              </Heading>
            </Center>
            <TeamLayout leagueEntry={away} event={event} />
            <Center>
              <Heading>
                {home.entry_name} - {homeScore}
              </Heading>
            </Center>
            <TeamLayout leagueEntry={home} event={event} />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
