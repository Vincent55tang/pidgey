'use strict';

import type { Action } from '../actions/types';

function track(action: Action): void {
    switch (action.type) {
        case '':
            // TODO: LOG EACH ACTION TO FIREBASE ANALYTICS
            break;
    }
}

module.exports = track;
