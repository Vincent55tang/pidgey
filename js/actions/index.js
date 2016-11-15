'use strict';
//const loginActions = require('./login');
const navigationActions = require('./navigation');
const authActions = require('./auth');
const modalActions = require('./modal');
const listActions = require('./lists');
const taskActions = require('./tasks');

module.exports = {
    ...navigationActions,
    ...authActions,
    ...modalActions,
    ...listActions,
    ...taskActions,
};
