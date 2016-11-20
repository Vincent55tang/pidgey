'use strict';

import type { Action } from '../actions/types';

export type State = {
    task: Task,
    isOpen: boolean,
    isNewTask: boolean,
};

const initialState = {
    task: {
        title: '',
        location: {
            title: '',
        }
    },
    isOpen: false,
    isDeleteOpen: false,
    isNewTask: false,
};

function modal(state: State = initialState, action: Action): State {
    switch (action.type) {
        case 'OPEN_TASK_MODAL':
            return {
                task: action.task,
                isOpen: true,
                isNewTask: action.isNewTask,
            }
        case 'CLOSE_TASK_MODAL':
            return initialState;
        case 'OPEN_DELETE_LIST_MODAL':
            return {
                isDeleteOpen: true,
                deleteList: action.deleteList,
            }
        case 'CLOSE_DELETE_LIST_MODAL':
            return initialState;
        default:
            return state;
    }
}

module.exports = modal;
