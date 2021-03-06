import React, { useContext, useReducer } from 'react';
import Reducer from './reducer';
import { StateContext, StoreInterface } from './types';

const initialState: StateContext = {
  players: null,
  playerTypes: null,
  playerStatCategories: null,
  teams: null,
  game: null,
  live: {},
};

const context = React.createContext<StoreInterface>({
  state: initialState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

export const useStateContext = () => useContext(context);

const Store = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
  );
};

export default Store;
