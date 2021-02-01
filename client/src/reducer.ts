import { Action, ActionType, StateContext } from './types';

const Reducer = (state: StateContext, action: Action) => {
  switch (action.type) {
    case ActionType.SET_BOOTSTRAP:
      return { ...state, bootstrap: action.payload };
    case ActionType.SET_GAME:
      return { ...state, game: action.payload };
    case ActionType.SET_LIVE:
      return { ...state, live: action.payload };
    default:
      return state;
  }
};

export default Reducer;
