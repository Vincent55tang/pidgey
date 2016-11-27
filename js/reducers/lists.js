'use strict';

import type {Action} from '../actions/types';

export type State = {
    currentList: {
        listID: string;
        listTitle: string;
        taskList: Object;
    };
};

const initialState = {
    currentList: {
        listID: '',
        listTitle: '',
        tasklist: {},
    }
};

function list(state: State = initialState, action: Action): State {
    if(action.type === 'CREATE_LIST') {
        console.log("_reducer", action);
        return {
            currentList: {
                listID: action.list.id,
                listTitle: action.list.title
            }
        }
    } else if (action.type === 'SELECT_LIST') {
        return {
            currentList: {
                listID: action.currentList.id,
                listTitle: action.currentList.title
            }
        }
    } else if (action.type === 'SHOW_LIST_MAP') {
        return {
            currentList: {
                listID: action.currentList.id,
                listTitle: action.currentList.title,
                taskList: action.currentList.taskList,
            }
        }
    } else {
        return state;
    }
}

module.exports = list;
