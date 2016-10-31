'use strict';

import type {Action} from '../actions/types';

export type List = {
    key: string;
    title: string;
    tasks: Array<Task>;
};

export Type Task = {
    title: string;
    location: Location;
    isDone: boolean;
    isRouted: boolean;
};

export Type Location = {
    lat: number;
    long: number;
    placeId: string;
};

function tasks(state: State = {}, action: Action): State {
    switch(action.type) {
        case 'EDIT_TASK':
            return action.task;
    }
}

module.exports = tasks;
