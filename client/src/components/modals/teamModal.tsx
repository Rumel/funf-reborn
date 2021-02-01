import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { LeagueEntry, StandingRow } from '../../types';

type Props = {
  leagueEntry: LeagueEntry | undefined;
  standingRow: StandingRow | undefined;
  isOpen: boolean;
  onClose: () => void;
};

export const TeamModal = (props: Props) => {
  const { leagueEntry, standingRow, isOpen, onClose } = props;

  if (!(leagueEntry && standingRow)) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} size='full' onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{leagueEntry.entry_name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Adventure always eat prawns daintily with a claw then lick paws clean
          wash down prawns with a lap of carnation milk then retire to the
          warmest spot on the couch to claw at the fabric before taking a
          catnap, my slave human didn't give me any food so i pooped on the
          floor. Favor packaging over toy chew foot murder hooman toes. Groom
          yourself 4 hours - checked, have your beauty sleep 18 hours - checked,
          be fabulous for the rest of the day - checked.
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
