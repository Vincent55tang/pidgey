'use strict';

var listsDB = require('../firebase/lists');

import {
    Action
} from './types'

function createList(userID, title): ThunkAction {
    console.log("ACTIONS: createList");
    return (dispatch) => {
        var listID = listsDB.createList(userID, title);
        console.log("ACTIONS: createList - ID", listID);
        return dispatch({
            type: 'CREATE_LIST',
            currentList: {
                title: title,
                id: listID
            }
        });
    }
}

module.exports = { createList };
