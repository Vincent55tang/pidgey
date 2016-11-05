'use strict';

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

var promise = require('./promise');
var array = require('./array');
var analytics = require('./analytics');
var reducers = require('../reducers');
var createLogger = require('redux-logger');
import { persistStore, autoRehydrate } from 'redux-persist';
var { AsyncStorage } = require('react-native');

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

var logger = createLogger({
    predicate: (getState, action) => isDebuggingInChrome,
    collapsed: true,
    duration: true,
});

var createPidgeyStore = applyMiddleware(thunk, promise, array, analytics, logger)(createStore);

function configureStore(onComplete: ?() => void) {
    const store = autoRehydrate()(createPidgeyStore)(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    persistStore(store, { storage: AsyncStorage, blacklist: ['modal'] }, onComplete);

    return store;
}

module.exports = configureStore;
