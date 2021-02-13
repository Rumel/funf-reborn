import { Action, ActionType, StateContext } from './types';

const Reducer = (state: StateContext, action: Action) => {
  switch (action.type) {
    case ActionType.SET_BOOTSTRAP:
      const { elements, element_types, element_stats, teams } = action.payload;
      return {
        ...state,
        players: elements,
        playerTypes: element_types,
        playerStatCategories: element_stats,
        teams: teams,
      };
    case ActionType.SET_GAME:
      return { ...state, game: action.payload };
    case ActionType.SET_LIVE:
      return {
        ...state,
        live: { ...state.live, [action.payload.week]: action.payload.data },
      };
    default:
      return state;
  }
};

export default Reducer;
