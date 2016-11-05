'use strict';
//const loginActions = require('./login');
const navigationActions = require('./navigation');
const authActions = require('./auth');
const modalActions = require('./modal');
const listActions = require('./lists');

module.exports = {
    ...navigationActions,
    ...authActions,
    ...modalActions,
    ...listActions
};
