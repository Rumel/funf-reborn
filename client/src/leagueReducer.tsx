import { Action, ActionType, LeagueContext } from './types';

const LeagueReducer = (state: LeagueContext, action: Action) => {
  switch (action.type) {
    case ActionType.SET_LEAGUE_ID:
      return { ...state, id: action.payload.id };
    case ActionType.SET_LEAGUE_ADVANCEMENT:
      return { ...state, advancement: action.payload.advancement };
    case ActionType.SET_LEAGUE:
      const {
        league,
        league_entries,
        matches,
        standings,
      } = action.payload.data;

      return {
        ...state,
        league: league,
        league_entries: league_entries,
        matches: matches,
        standings: standings,
      };
    case ActionType.SET_PICKS:
      const { picks } = state;
      const id = `${action.payload.teamId}-${action.payload.week}`;
      picks[id] = {
        picks: action.payload.data.picks,
        subs: action.payload.data.subs,
      };

      return { ...state, picks: picks };
    case ActionType.SET_TRANSACTIONS:
      const { transactions } = action.payload.data;

      return { ...state, transactions: transactions };
    default:
      return state;
  }
};

export default LeagueReducer;
