'use strict';

var tasksDB = require('../firebase/tasks');

import { Action } from './types'

function addTask(userID, listID, task): ThunkAction {
    return (dispatch) => {
        var taskID = tasksDB.addTask(userID, listID, task);

        return dispatch({
            type: 'ADD_TASK'
        })
    }
}

function updateTask(userID, listID, taskID, task): ThunkAction {
    return (dispatch) => {
        tasksDB.updateTask(userID, listID, taskID, task);

        return dispatch({
            type: 'UPDATE_TASK'
        })
    }
}

function deleteTask(userID, listID, taskID): ThunkAction {
    return (dispatch) => {
        tasksDB.deleteTask(userID, listID, taskID);

        return dispatch({
            type: 'DELETE_TASK'
        })
    }
}

function checkTask(userID, listID, taskID, task): ThunkAction {
    return (dispatch) => {
        tasksDB.checkTask(userID, listID, taskID, task);

        return dispatch({
            type: 'CHECK_TASK'
        })
    }
}

module.exports = { addTask, updateTask, checkTask, deleteTask };
