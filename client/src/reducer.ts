import { Action, ActionType, StateContext } from './types';

const Reducer = (state: StateContext, action: Action) => {
  switch (action.type) {
    case ActionType.SET_BOOTSTRAP:
      return { ...state, bootstrap: action.payload };
    case ActionType.SET_GAME:
      return { ...state, game: action.payload };
    case ActionType.SET_LEAGUE:
      const { leagues } = state;
      leagues[action.payload.leagueId] = action.payload.data;

      return { ...state, leagues: leagues };
    case ActionType.SET_LIVE:
      return { ...state, live: action.payload };
    case ActionType.SET_PICKS:
      const { picks } = state;
      const id = `${action.payload.teamId}-${action.payload.week}`;
      picks[id] = action.payload.data;

      return { ...state, picks: picks };
    case ActionType.SET_TRANSACTIONS:
      const { transactions } = state;
      transactions[action.payload.leagueId] = action.payload.data;

      return { ...state, transactions: transactions };
    default:
      return state;
  }
};

export default Reducer;
