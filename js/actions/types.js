'use strict';

export type Action =
    { type: 'TOGGLE_TASKS', taskView: 'list' | 'map' }
  | { type: 'SWITCH_TAB', tab: 'info' | 'tasks' }
  | { type: 'LOGIN_REQUEST'}
  ;

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
