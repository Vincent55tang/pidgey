'use strict';

export type Action =
    { type: 'TOGGLE_TASKS', taskView: 'list' | 'map' }
  | { type: 'SWITCH_TAB', tab: 'info' | 'tasks' | 'myLists' | 'map' }
  | { type: 'SIGN_IN_SUCCESS', data: { id: string; name: string; email: string; photo:string; token: string}}
  | { type: 'SIGN_OUT'}
  | { type: 'OPEN_TASK_MODAL'}
  | { type: 'CLOSE_TASK_MODAL' }
  | { type: 'UPDATE_TASK' }
  ;

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
