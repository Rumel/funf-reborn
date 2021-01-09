export enum ActionType {
  SET_BOOTSTRAP = 'SET_BOOTSTRAP',
  SET_GAME = 'SET_GAME',
  SET_LEAGUE = 'SET_LEAGUE',
  SET_LIVE = 'SET_LIVE',
  SET_PICKS = 'SET_PICKS',
  SET_TRANSACTIONS = 'SET_TRANSACTIONS',
}

export type Action = {
  type: ActionType;
  payload: any;
};

export interface StateContext {
  bootstrap: any;
  game: any;
  leagues: any;
  live: any;
  picks: any;
  transactions: any;
}

export interface StoreInterface {
  state: StateContext;
  dispatch: React.Dispatch<Action>;
}
