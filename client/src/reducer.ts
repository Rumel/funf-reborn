import { Action, ActionType, StateContext } from './types';

const Reducer = (state: StateContext, action: Action) => {
  switch (action.type) {
    case ActionType.SET_BOOTSTRAP:
      return { ...state, bootstrap: action.payload };
    default:
      return state;
  }
};

export default Reducer;
