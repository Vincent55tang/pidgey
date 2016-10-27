'use strict';
//const loginActions = require('./login');
const navigationActions = require('./navigation');
const authActions = require('./auth');

module.exports = {
    ...navigationActions,
    ...authActions
};
