'use strict';

import type { Action } from './types';
type Tab = 'tasks' | 'info' | 'myLists' | 'map';

module.exports = {
    switchTab: (tab: Tab): Action=> ({
        type: 'SWITCH_TAB',
        tab,
    }),

    toggleTasks: (taskView : 'map' | 'list'): Action => ({
        type: 'TOGGLE_TASKS',
        taskView,
    }),
};
