import {
  Box,
  Center,
  Heading,
  Link,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import _, { matches } from 'lodash';
import React, { useEffect } from 'react';
import { getTeamLink } from '../helpers/helpers';
import { useLeagueContext } from '../leagueStore';
import { setLive, setPicks } from '../service';
import { useStateContext } from '../store';
import { LeagueEntry, Match as MatchType } from '../types';
import { MatchModal } from './modals/matchModal';
import { FunfSpinner } from './shared/funfSpinner';

type Props = {
  away: LeagueEntry;
  home: LeagueEntry;
  match: MatchType;
  color?: string;
};

export const MatchBox = ({ away, home, match, color }: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { state, dispatch } = useStateContext();
  const { live } = state;
  const { leagueState, leagueDispatch } = useLeagueContext();
  const { picks } = leagueState;
  const awayPicks = picks[`${away.entry_id}-${match.event}`];
  const homePicks = picks[`${home.entry_id}-${match.event}`];
  const currentLive = live[match.event];
  let homeScore = 0;
  let awayScore = 0;

  useEffect(() => {
    if (!awayPicks && !match.finished) {
      setPicks(leagueDispatch, away.entry_id, match.event);
    }
  }, [awayPicks, away, match, leagueDispatch]);

  useEffect(() => {
    if (!homePicks && !match.finished) {
      setPicks(leagueDispatch, home.entry_id, match.event);
    }
  }, [homePicks, home, match, leagueDispatch]);

  useEffect(() => {
    if (!match.finished && !currentLive) {
      setLive(dispatch, match.event);
    }
  }, [currentLive, dispatch, match]);

  if (
    !match.finished &&
    (awayPicks === null || homePicks === null || currentLive === null)
  ) {
    return <FunfSpinner />;
  }

  if (!match.finished && currentLive && homePicks && awayPicks) {
    awayScore =
      _.reduce(
        _.map(
          _.filter(awayPicks.picks, (p) => p.position < 12),
          (p) => currentLive.elements[p.element].stats.total_points
        ),
        (x, y) => x + y
      ) || 0;

    homeScore =
      _.reduce(
        _.map(
          _.filter(homePicks.picks, (p) => p.position < 12),
          (p) => currentLive.elements[p.element].stats.total_points
        ),
        (x, y) => x + y
      ) || 0;
  }

  return (
    <Box>
      <MatchModal
        isOpen={isOpen}
        onClose={onClose}
        home={home}
        homeScore={match.finished ? match.league_entry_2_points : homeScore}
        awayScore={match.finished ? match.league_entry_1_points : awayScore}
        away={away}
        event={match.event}
      />
      <Box
        borderLeft='1px solid black'
        borderRight='1px solid black'
        borderTop='1px solid black'
        borderTopLeftRadius='0.5rem'
        borderTopRightRadius='0.5rem'
        mr={1}
        ml={1}
        mt={1}
        bg={color}>
        <Box padding={2}>
          <Box display='flex'>
            <Box flexGrow={1}>
              <Link
                href={getTeamLink(away.entry_id, match.event)}
                fontSize='xl'
                fontWeight='bold'
                isExternal>
                {away.entry_name}
              </Link>
            </Box>
            <Box float='right'>
              <Text>
                {match.finished ? match.league_entry_1_points : awayScore}
              </Text>
            </Box>
          </Box>
          <Box display='flex'>
            <Box flexGrow={1}>
              <Link
                href={getTeamLink(home.entry_id, match.event)}
                fontSize='xl'
                fontWeight='bold'
                isExternal>
                {home.entry_name}
              </Link>
            </Box>
            <Box float='right'>
              <Text>
                {match.finished ? match.league_entry_2_points : homeScore}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        alignContent='stretch'
        borderLeft='1px solid black'
        borderRight='1px solid black'
        borderBottom='1px solid black'
        mr={1}
        ml={1}
        mb={1}
        pt={2}
        pb={2}
        borderBottomLeftRadius='0.5rem'
        borderBottomRightRadius='0.5rem'
        bg={'gray.200'}
        onClick={onOpen}>
        <Center>
          <Heading size='sm'>
            <Link>View Match</Link>
          </Heading>
        </Center>
      </Box>
    </Box>
  );
};
