'use strict';

import type {Action} from '../actions/types';

export type State = {
    isLoggedIn: boolean;
    id: ?string;
    name: ?string;
    email: ?string;
    photo: ?string;
    token: ?string;
};

const initialState = {
    isLoggedIn: false,
    id: null,
    name: null,
    email: null,
    photo: null,
    token: null
};

function user(state: State = initialState, action: Action): State {
    if (action.type === 'SIGN_IN_SUCCESS') {
        let {id, name, email, photo, token} = action.data;
        return {
            isLoggedIn: true,
            id,
            name,
            email,
            photo,
            token
        }
    }
    if(action.type === 'SIGN_OUT') {
        return initialState;
    }
    else {
        return state;
    }
}

module.exports = user;
