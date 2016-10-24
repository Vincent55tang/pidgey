'use strict';

import type { Action } from '../actions/types';

export type Tab =
    'info'
  | 'tasks'
  | 'list'
  ;

export type TaskView = 'list' | 'map';

type State = {
    tab: Tab;
    taskView: TaskView;
};

const initialState: State = { tab: 'tasks', taskView: 'list' };

function navigation(state: State = initialState, action: Action): State {
    if ( action.type === 'TOGGLE_TASKS') {
        return {...state, taskView: action.taskView};
    }
    if ( action.type === 'SWITCH_TAB') {
        return {...state, tab: action.tab};
    }
    if ( action.type === 'LOGGED_OUT') {
        return initialState;
    }

    return state;
}

module.exports = navigation;
