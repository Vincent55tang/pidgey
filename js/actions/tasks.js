'use strict';
import type { Task } from '../reducers/tasks';

import {
    Action
} from './types'

function updateTask(task: Task, changes): ThunkAction {
    console.log("ACTIONS: updateTask");
    return (dispatch) => {
        return dispatch({
            type: 'UPDATE_TASK',
            task: task,
            isOpen: false,
        });
    }
}
