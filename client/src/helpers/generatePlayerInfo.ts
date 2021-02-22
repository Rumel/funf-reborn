import _ from 'lodash';
import {
  Fixture,
  LiveData,
  PickType,
  Player,
  PlayerInfo,
  Position,
  TeamInfo,
} from '../types';
import { getTeam } from './teams';

const getPosition = (elementType: number): Position => {
  switch (elementType) {
    case 1: {
      return Position.GKP;
    }
    case 2: {
      return Position.DEF;
    }
    case 3: {
      return Position.MID;
    }
    case 4: {
      return Position.FWD;
    }
    default: {
      return Position.GKP;
    }
  }
};

type MatchTeamInfo = {
  home: boolean;
  team: TeamInfo;
};

const getOpposingTeams = (
  id: number,
  fixtures: Fixture[] | undefined
): MatchTeamInfo[] => {
  const matches = _.filter(fixtures, (f) => f.team_a === id || f.team_h === id);
  const opposingTeams = _.map(matches, (m) =>
    m.team_a === id
      ? { home: true, team: getTeam(m.team_h) }
      : { home: false, team: getTeam(m.team_a) }
  );

  return opposingTeams;
};

const getMatchString = (matches: MatchTeamInfo[]): string | undefined => {
  if (matches.length === 0) {
    return undefined;
  }

  return _.join(
    _.map(matches, (m) =>
      m.home ? `(${m.team.shortName})` : `(@ ${m.team.shortName})`
    ),
    ' '
  );
};

export const generatePlayerInfo = (
  player: Player,
  live?: LiveData
): PlayerInfo => {
  const fixtures = live?.fixtures;
  const opposingTeams = getOpposingTeams(player.team, fixtures);

  return {
    id: player.id,
    name: `${player.first_name} ${player.second_name}`,
    firstName: player.first_name,
    lastName: player.second_name,
    code: player.code,
    webName: player.web_name,
    url: `https://resources.premierleague.com/premierleague/photos/players/110x140/p${player.code}.png`,
    position: getPosition(player.element_type),
    form: player.form,
    matches: getMatchString(opposingTeams),
  };
};

export const generatePlayerInfoFromPick = (
  pick: PickType,
  players: Player[],
  live?: LiveData
): PlayerInfo => {
  const player = players.find((p) => p.id === pick.element);

  if (!player) {
    throw Error('Player not Found');
  }

  return generatePlayerInfo(player, live);
};
