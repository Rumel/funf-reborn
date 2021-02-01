import React, { useContext, useReducer } from 'react';
import LeagueReducer from './leagueReducer';
import { LeagueContext, LeagueInterface } from './types';

const initialState: LeagueContext = {
  id: null,
  league: null,
  league_entries: null,
  standings: null,
  matches: null,
  picks: {},
  transactions: {},
};

const context = React.createContext<LeagueInterface>({
  leagueState: initialState,
  leagueDispatch: () => {},
});

export const useLeagueContext = () => useContext(context);

const LeagueStore = ({ id, children }: { id: number; children: any }) => {
  initialState.id = id;
  const [leagueState, leagueDispatch] = useReducer(LeagueReducer, initialState);

  return (
    <context.Provider value={{ leagueState, leagueDispatch }}>
      {children}
    </context.Provider>
  );
};

export default LeagueStore;
