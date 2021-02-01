import React, { useEffect, useState } from 'react';
import {
  Box,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import _ from 'lodash';
import { useLeagueContext } from '../leagueStore';
import { setLeague } from '../service';
import { LeagueEntry, StandingRow } from '../types';
import { TeamModal } from './modals/teamModal';

export const Standings = () => {
  const { leagueState, leagueDispatch } = useLeagueContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id, league_entries, standings } = leagueState;
  const [modalLeagueEntry, setModalLeagueEntry] = useState<LeagueEntry>();
  const [modalStandingRow, setModalStandingRow] = useState<StandingRow>();

  useEffect(() => {
    if ((league_entries === null || standings === null) && id !== null) {
      setLeague(leagueDispatch, id);
    }
  });

  if (league_entries === null || standings === null) {
    return null;
  }

  const handleRowClick = (leagueEntry: LeagueEntry, standing: StandingRow) => {
    setModalLeagueEntry(leagueEntry);
    setModalStandingRow(standing);
    onOpen();
  };

  return (
    <Box>
      <TeamModal
        leagueEntry={modalLeagueEntry}
        standingRow={modalStandingRow}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Table>
        <Thead>
          <Th>#</Th>
          <Th>Club</Th>
          <Th>W</Th>
          <Th>L</Th>
          <Th>D</Th>
          <Th>+</Th>
          <Th>Pts</Th>
        </Thead>
        <Tbody>
          {standings.map((standing) => {
            const leagueEntry = _.find(
              league_entries,
              (le) => le.id === standing.league_entry
            );

            if (!leagueEntry) {
              return null;
            }

            // Make this a clickable modal?
            return (
              <Tr
                key={standing.rank}
                onClick={() => handleRowClick(leagueEntry, standing)}>
                <Td>{standing.rank}</Td>
                <Td>
                  <Stack spacing={1}>
                    <Text fontSize='md' fontWeight='bold'>
                      {leagueEntry.entry_name}
                    </Text>
                    <Text fontSize='sm'>
                      {leagueEntry.player_first_name}{' '}
                      {leagueEntry.player_last_name}
                    </Text>
                    <Text fontSize='sm'>Form</Text>
                  </Stack>
                </Td>
                <Td>{standing.matches_won}</Td>
                <Td>{standing.matches_lost}</Td>
                <Td>{standing.matches_drawn}</Td>
                <Td>{standing.points_for}</Td>
                <Td>{standing.total}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};
