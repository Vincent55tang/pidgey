'use strict';

import type { Action } from '../actions/types';

export type State = {
    task: Task,
    isOpen: boolean
};

const initialState = {
    task: {
        title: '',
        location: {
            title: '',
        }
    },
    isOpen: false
};

function modal(state: State = initialState, action: Action): State {
    switch (action.type) {
        case 'OPEN_TASK_MODAL':
            return {
                task: action.task,
                isOpen: true
            }
        case 'CLOSE_TASK_MODAL':
            return initialState;
        default:
            return state;
    }
}

module.exports = modal;
