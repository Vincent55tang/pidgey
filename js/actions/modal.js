'use strict';
import type { Task } from '../reducers/tasks';

import {
    Action
} from './types'

function openTaskModal(task, newTask: boolean): ThunkAction {
    console.log("ACTIONS: openTaskModal");
    return (dispatch) => {
        if(newTask) {
            return dispatch({
                type: 'OPEN_TASK_MODAL',
                task: {},
                isOpen: true,
                isNewTask: true,
            })
        } else {
            return dispatch({
                type: 'OPEN_TASK_MODAL',
                task: task,
                isOpen: true,
                isNewTask: false,
            });
        }
    }
}

function closeTaskModal(): ThunkAction {
    console.log("ACTIONS: closeTaskModal");
    return (dispatch) => {
        return dispatch({
            type: 'CLOSE_TASK_MODAL',
            task: {},
            isOpen: false
        })
    }
}

module.exports = { openTaskModal, closeTaskModal };
