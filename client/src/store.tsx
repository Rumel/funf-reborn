import React, { useContext, useReducer } from 'react';
import Reducer from './reducer';
import { StateContext, StoreInterface } from './types';

const initialState: StateContext = {
  bootstrap: null,
  game: null,
  live: null,
};

const context = React.createContext<StoreInterface>({
  state: initialState,
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
