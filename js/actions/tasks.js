'use strict';
var tasksDB = require('../firebase/tasks');

import {
    Action
} from './types'

function addTask(userID, listID, task): ThunkAction {
    console.log("ACTIONS: addTask", task);
    return (dispatch) => {
        var taskID = tasksDB.addTask(userID, listID, task);

        return dispatch({
            type: 'ADD_TASK'
        })
    }
}

function updateTask(userID, listID, taskID, task): ThunkAction {
    console.log("ACTIONS: updateTask");
    return (dispatch) => {
        tasksDB.updateTask(userID, listID, taskID, task);

        return dispatch({
            type: 'UPDATE_TASK'
        })
    }
}

module.exports = { addTask, updateTask };
