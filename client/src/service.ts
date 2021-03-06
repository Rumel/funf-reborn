import axios from 'axios';
import { Action, ActionType, Advancement } from './types';

export const setBootstrap = (dispatch: React.Dispatch<Action>) => {
  axios.get('/api/bootstrap').then(({ data }) => {
    dispatch({ type: ActionType.SET_BOOTSTRAP, payload: data });
  });
};

export const setGame = (dispatch: React.Dispatch<Action>) => {
  axios.get('/api/game').then(({ data }) => {
    dispatch({ type: ActionType.SET_GAME, payload: data });
  });
};

export const setLeague = (dispatch: React.Dispatch<Action>, id: number) => {
  axios.get(`/api/leagues/${id}`).then(({ data }) => {
    dispatch({
      type: ActionType.SET_LEAGUE,
      payload: { data: data },
    });
  });
};

export const setLive = (dispatch: React.Dispatch<Action>, week: number) => {
  axios.get(`/api/live/${week}`).then(({ data }) => {
    const payload = {
      data,
      week,
    };
    dispatch({ type: ActionType.SET_LIVE, payload });
  });
};

export const setPicks = (
  dispatch: React.Dispatch<Action>,
  teamId: number,
  week: number
) => {
  axios.get(`/api/picks/${teamId}/${week}`).then(({ data }) => {
    dispatch({
      type: ActionType.SET_PICKS,
      payload: { teamId: teamId, week: week, data: data },
    });
  });
};

export const setTransactions = (
  dispatch: React.Dispatch<Action>,
  leagueId: number
) => {
  axios.get(`/api/transactions/${leagueId}`).then(({ data }) => {
    dispatch({
      type: ActionType.SET_TRANSACTIONS,
      payload: { leagueId: leagueId, data: data },
    });
  });
};

export const setLeagueId = (dispatch: React.Dispatch<Action>, id: number) => {
  dispatch({ type: ActionType.SET_LEAGUE_ID, payload: { id } });
};

export const setLeagueAdvancement = (
  dispatch: React.Dispatch<Action>,
  advancement: Advancement
) => {
  dispatch({
    type: ActionType.SET_LEAGUE_ADVANCEMENT,
    payload: { advancement },
  });
};
