'use strict';
import firebase from 'firebase';
import type { Action } from './types';

export function createTask(task) {
    return dispatch => {
        taskList.push({
            task,
            completed: false
        }).catch(error => dispatch(createTaskError(error)));
    }
}

export function createTaskError(error) {
    return {
        type: CREATE_TASK_ERROR,
        payload: error
    };
}

export function createTaskSuccess(task) {
    return {
        type: CREATE_TASK_SUCCESS,
        payload: task
    }
}
