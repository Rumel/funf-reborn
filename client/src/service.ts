import axios from 'axios';
import { Action, ActionType } from './types';

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

export const setLeague = (dispatch: React.Dispatch<Action>, id: string) => {
  axios.get(`/api/leagues/${id}`).then(({ data }) => {
    dispatch({
      type: ActionType.SET_LEAGUE,
      payload: { leagueId: id, data: data },
    });
  });
};

export const setLive = (dispatch: React.Dispatch<Action>, week: number) => {
  axios.get(`/api/live/${week}`).then(({ data }) => {
    dispatch({ type: ActionType.SET_LIVE, payload: data });
  });
};

export const setPicks = (
  dispatch: React.Dispatch<Action>,
  teamId: string,
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
  leagueId: string
) => {
  axios.get(`/api/transactions/${leagueId}`).then(({ data }) => {
    dispatch({
      type: ActionType.SET_TRANSACTIONS,
      payload: { leagueId: leagueId, data: data },
    });
  });
};
