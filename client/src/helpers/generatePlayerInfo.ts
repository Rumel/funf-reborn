import { PickType, Player, PlayerInfo, Position } from '../types';

// element_types: [
//     {
//     id: 1,
//     element_count: 75,
//     singular_name: "Goalkeeper",
//     singular_name_short: "GKP",
//     plural_name: "Goalkeepers",
//     plural_name_short: "GKP"
//     },
//     {
//     id: 2,
//     element_count: 234,
//     singular_name: "Defender",
//     singular_name_short: "DEF",
//     plural_name: "Defenders",
//     plural_name_short: "DEF"
//     },
//     {
//     id: 3,
//     element_count: 269,
//     singular_name: "Midfielder",
//     singular_name_short: "MID",
//     plural_name: "Midfielders",
//     plural_name_short: "MID"
//     },
//     {
//     id: 4,
//     element_count: 87,
//     singular_name: "Forward",
//     singular_name_short: "FWD",
//     plural_name: "Forwards",
//     plural_name_short: "FWD"
//     }
//     ]

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

export const generatePlayerInfo = (player: Player): PlayerInfo => {
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
  };
};

export const generatePlayerInfoFromPick = (
  pick: PickType,
  players: Player[]
) => {
  const player = players.find((p) => p.id === pick.element);

  if (!player) {
    throw Error('Player not Found');
  }

  return generatePlayerInfo(player);
};
