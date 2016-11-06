'use strict';

var listsDB = require('../firebase/lists');

import {
    Action
} from './types'

function createList(userID, title): ThunkAction {
    console.log("ACTIONS: createList");
    return (dispatch) => {
        var listID = listsDB.createList(userID, title);
        return dispatch({
            type: 'CREATE_LIST',
            list: {
                title: title,
                id: listID
            }
        });
    }
}

function selectList(listID, title): ThunkAction {
    return (dispatch) => {
        return dispatch({
            type: 'SELECT_LIST',
            currentList: {
                title: title,
                id: listID
            }
        });
    }
}

module.exports = { createList, selectList };
