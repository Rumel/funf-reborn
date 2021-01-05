export enum ActionType {
  SET_BOOTSTRAP = 'SET_BOOTSTRAP',
}

export type Action = {
  type: ActionType;
  payload: any;
};

export interface StateContext {
  bootstrap: any;
}

export interface StoreInterface {
  state: StateContext;
  dispatch: React.Dispatch<Action>;
}
