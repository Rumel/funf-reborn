import React, { useState } from 'react';
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
  VStack,
  Link,
  Center,
} from '@chakra-ui/react';
import _ from 'lodash';
import { useLeagueContext } from '../leagueStore';
import { LeagueEntry, StandingRow } from '../types';
import { TeamModal } from './modals/teamModal';
import { PromotionLine } from './promotionLine';
import { RELEGATION_COLORS } from '../constants';
import { useStateContext } from '../store';
import { getTeamLink } from '../helpers/helpers';
import { Form } from './form';
import { FaExternalLinkAlt } from 'react-icons/fa';

const mobileDisplay = ['none', 'none', 'table-cell'];

export const Standings = () => {
  const { state } = useStateContext();
  const { game } = state;
  const { leagueState } = useLeagueContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { league_entries, standings, advancement, matches } = leagueState;
  const [modalLeagueEntry, setModalLeagueEntry] = useState<LeagueEntry>();
  const [modalStandingRow, setModalStandingRow] = useState<StandingRow>();

  if (
    league_entries === null ||
    standings === null ||
    advancement === null ||
    game === null ||
    matches === null
  ) {
    return null;
  }

  const handleRowClick = (leagueEntry: LeagueEntry, standing: StandingRow) => {
    setModalLeagueEntry(leagueEntry);
    setModalStandingRow(standing);
    onOpen();
  };

  const getRowColor = (rank: number): string => {
    if (advancement.promotion.includes(rank)) {
      return RELEGATION_COLORS.PROMOTION;
    } else if (advancement.relegation.includes(rank)) {
      return RELEGATION_COLORS.RELEGATION;
    } else if (advancement.possiblePromotion.includes(rank)) {
      return RELEGATION_COLORS.POSSIBLE_PROMOTION;
    } else if (advancement.possibleRelegation.includes(rank)) {
      return RELEGATION_COLORS.POSSIBLE_RELEGATION;
    }

    return 'unset';
  };

  return (
    <Box>
      <TeamModal
        leagueEntry={modalLeagueEntry}
        standingRow={modalStandingRow}
        isOpen={isOpen}
        onClose={onClose}
      />
      <VStack spacing='0.25rem' align='stretch'>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th>
                <Center>#</Center>
              </Th>
              <Th>Club</Th>
              <Th display={mobileDisplay}>
                <Center>W</Center>
              </Th>
              <Th display={mobileDisplay}>
                <Center>L</Center>
              </Th>
              <Th display={mobileDisplay}>
                <Center>D</Center>
              </Th>
              <Th display={mobileDisplay}>
                <Center>+</Center>
              </Th>
              <Th>
                <Center>Pts</Center>
              </Th>
              <Th>
                <Center>
                  <FaExternalLinkAlt />
                </Center>
              </Th>
            </Tr>
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

              return (
                <Tr
                  key={standing.league_entry}
                  bgColor={getRowColor(standing.rank)}>
                  <Td>
                    <Center>{standing.rank}</Center>
                  </Td>
                  <Td>
                    <Stack spacing={1}>
                      <Link
                        href={getTeamLink(
                          leagueEntry.entry_id,
                          game.current_event
                        )}
                        isExternal>
                        <Text fontSize='md' fontWeight='bold'>
                          {leagueEntry.entry_name}
                        </Text>
                      </Link>

                      <Text fontSize='sm'>
                        {leagueEntry.player_first_name}{' '}
                        {leagueEntry.player_last_name}
                      </Text>
                      <Form leagueEntry={leagueEntry} matches={matches} />
                    </Stack>
                  </Td>
                  <Td display={mobileDisplay}>
                    <Center>{standing.matches_won || 0}</Center>
                  </Td>
                  <Td display={mobileDisplay}>
                    <Center>{standing.matches_lost || 0}</Center>
                  </Td>
                  <Td display={mobileDisplay}>
                    <Center>{standing.matches_drawn || 0}</Center>
                  </Td>
                  <Td display={mobileDisplay}>
                    <Center>{standing.points_for || 0}</Center>
                  </Td>
                  <Td>
                    <Center>{standing.total || 0}</Center>
                  </Td>
                  <Td onClick={() => handleRowClick(leagueEntry, standing)}>
                    <Center>
                      <FaExternalLinkAlt />
                    </Center>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <PromotionLine />
      </VStack>
    </Box>
  );
};
