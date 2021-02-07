import React, { useContext, useEffect, useReducer } from 'react';
import LeagueReducer from './leagueReducer';
import { setLeagueAdvancement, setLeagueId } from './service';
import { Advancement, LeagueContext, LeagueInterface } from './types';

const initialState: LeagueContext = {
  id: null,
  league: null,
  league_entries: null,
  standings: null,
  matches: null,
  picks: {},
  transactions: null,
  advancement: null,
};

const context = React.createContext<LeagueInterface>({
  leagueState: initialState,
  leagueDispatch: () => {},
});

export const useLeagueContext = () => useContext(context);

type Props = {
  id: number;
  advancement: Advancement;
  children: any;
};

const LeagueStore = ({ id, children, advancement }: Props) => {
  const [leagueState, leagueDispatch] = useReducer(LeagueReducer, initialState);

  useEffect(() => {
    if (leagueState.id === null) {
      setLeagueId(leagueDispatch, id);
    }
  }, [id, leagueState, leagueDispatch]);

  useEffect(() => {
    if (leagueState.advancement === null) {
      setLeagueAdvancement(leagueDispatch, advancement);
    }
  }, [advancement, leagueState, leagueDispatch]);

  return (
    <context.Provider value={{ leagueState, leagueDispatch }}>
      {children}
    </context.Provider>
  );
};

export default LeagueStore;
