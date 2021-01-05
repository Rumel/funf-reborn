import axios from 'axios';
import { Action, ActionType } from './types';

export const getBootstrap = (dispatch: React.Dispatch<Action>) => {
  axios.get('/api/bootstrap').then(({ data }) => {
    dispatch({ type: ActionType.SET_BOOTSTRAP, payload: data });
  });
};
