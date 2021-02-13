import { Box, Link, Text } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { getTeamLink } from '../helpers/helpers';
import { useLeagueContext } from '../leagueStore';
import { setLive, setPicks } from '../service';
import { useStateContext } from '../store';
import { LeagueEntry, Match as MatchType } from '../types';
import { FunfSpinner } from './shared/funfSpinner';

type Props = {
  away: LeagueEntry;
  home: LeagueEntry;
  match: MatchType;
  color?: string;
};

export const MatchBox = ({ away, home, match, color }: Props) => {
  const { state, dispatch } = useStateContext();
  const { live } = state;
  const { leagueState, leagueDispatch } = useLeagueContext();
  const { picks } = leagueState;
  const awayPicks = picks[`${away.entry_id}-${match.event}`];
  const homePicks = picks[`${home.entry_id}-${match.event}`];
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
    if (!live && !match.finished) {
      setLive(dispatch, match.event);
    }
  }, [live, dispatch, match]);

  if (
    !match.finished &&
    (awayPicks === null || homePicks === null || live === null)
  ) {
    return <FunfSpinner />;
  }

  if (!match.finished && live && homePicks && awayPicks) {
    awayScore =
      _.reduce(
        _.map(
          _.filter(awayPicks.picks, (p) => p.position < 12),
          (p) => live.elements[p.element].stats.total_points
        ),
        (x, y) => x + y
      ) || 0;

    homeScore =
      _.reduce(
        _.map(
          _.filter(homePicks.picks, (p) => p.position < 12),
          (p) => live.elements[p.element].stats.total_points
        ),
        (x, y) => x + y
      ) || 0;
  }

  return (
    <Box border='1px solid black' margin={1} borderRadius='0.5rem' bg={color}>
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
  );
};
