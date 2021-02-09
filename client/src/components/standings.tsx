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
  VStack,
  Link,
} from '@chakra-ui/react';
import _ from 'lodash';
import { useLeagueContext } from '../leagueStore';
import { setGame, setLeague } from '../service';
import { LeagueEntry, StandingRow } from '../types';
import { TeamModal } from './modals/teamModal';
import { PromotionLine } from './promotionLine';
import { RELEGATION_COLORS } from '../constants';
import { useStateContext } from '../store';
import { getTeamLink } from '../helpers/helpers';
import { Form } from './form';

const mobileDisplay = ['none', 'none', 'table-cell'];

export const Standings = () => {
  const { state, dispatch } = useStateContext();
  const { game } = state;
  const { leagueState, leagueDispatch } = useLeagueContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id, league_entries, standings, advancement, matches } = leagueState;
  const [modalLeagueEntry, setModalLeagueEntry] = useState<LeagueEntry>();
  const [modalStandingRow, setModalStandingRow] = useState<StandingRow>();

  useEffect(() => {
    if (
      (league_entries === null || standings === null || matches === null) &&
      id !== null
    ) {
      setLeague(leagueDispatch, id);
    }
  }, [league_entries, standings, matches, id, leagueDispatch]);

  useEffect(() => {
    if (game === null) {
      setGame(dispatch);
    }
  }, [game, dispatch]);

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
        <Table>
          <Thead>
            <Th>#</Th>
            <Th>Club</Th>
            <Th display={mobileDisplay}>W</Th>
            <Th display={mobileDisplay}>L</Th>
            <Th display={mobileDisplay}>D</Th>
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

              return (
                <Tr
                  key={standing.rank}
                  onClick={() => handleRowClick(leagueEntry, standing)}
                  bgColor={getRowColor(standing.rank)}>
                  <Td>{standing.rank}</Td>
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
                  <Td display={mobileDisplay}>{standing.matches_won}</Td>
                  <Td display={mobileDisplay}>{standing.matches_lost}</Td>
                  <Td display={mobileDisplay}>{standing.matches_drawn}</Td>
                  <Td>{standing.points_for}</Td>
                  <Td>{standing.total}</Td>
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
