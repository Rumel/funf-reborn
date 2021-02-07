export const getTeamLink = (entryId: number, gameweek: number): string => {
  return `https://draft.premierleague.com/entry/${entryId}/event/${gameweek}`;
};
