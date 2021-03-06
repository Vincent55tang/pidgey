'use strict';

import type { Task } from '../reducers/tasks';

import { Action } from './types'

function openTaskModal(task, newTask: boolean): ThunkAction {
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
    return (dispatch) => {
        return dispatch({
            type: 'CLOSE_TASK_MODAL',
            task: {},
            isOpen: false
        })
    }
}

function openDeleteListModal(listID): ThunkAction {
    return (dispatch) => {
        return dispatch({
            type: 'OPEN_DELETE_LIST_MODAL',
            isDeleteOpen: true,
            deleteList: listID,
        });
    }
}

function closeDeleteListModal(): ThunkAction {
    return (dispatch) => {
        return dispatch({
            type: 'CLOSE_DELETE_LIST_MODAL',
            isDeleteOpen: false
        })
    }
}

module.exports = { openTaskModal, closeTaskModal, openDeleteListModal, closeDeleteListModal };
