'use strict';

var { combineReducers } = require('redux');

module.exports = combineReducers({
    navigation: require('./navigation'),
    user: require('./user'),
    modal: require('./modal'),
    //tasks: require('./tasks')
});
