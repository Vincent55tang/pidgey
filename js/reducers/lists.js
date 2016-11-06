'use strict';

import type {Action} from '../actions/types';

export type State = {
    currentList: {
        listID: string;
        listTitle: string;
    };
};

const initialState = {
    currentList: {
        listID: '',
        listTitle: '',
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
    } else {
        return state;
    }
}

module.exports = list;
