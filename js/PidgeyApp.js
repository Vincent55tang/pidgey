'use strict';

/**
 * @providesModule PidgeyApp
 */

var React = require('React');
var AppState = require('AppState'); // can tell you if the app is in the foreground or background, and notify you when the state changes
var StyleSheet = require('StyleSheet');

var PidgeyLogin = require('PidgeyLogin');
var PidgeyNavigator = require('PidgeyNavigator');
var View = require('View');
var StatusBar = require('StatusBar');

import * as firebase from 'firebase';
import { GoogleSignin } from 'react-native-google-signin';
const firebaseApp = firebase.initializeApp(require('./config/firebase.json'));

// var {
//
// } = require('./actions'); // IMPORT ALL START UP ACTIONS

var { connect } = require('react-redux');

var PidgeyApp = React.createClass({
    conponentDidMount: function() {
        AppState.addEventListener('change', this.handleAppStateChange);
        GoogleSignin.hasPlayServices({ autoResolve: true })
        .then(() => {
            GoogleSignin.configure({
                webClientId: "146428656887-u92vmu6i2oftroo07pclis31mt3uqmbs.apps.googleusercontent.com",
                scopes: ['https://www.googleapis.com/auth/plus.login']
            });
        });

        // DISPATCH ALL THE ACTIONS
    },

    componenetWillUnmount: function() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    },

    handleAppStateChange: function(appState) {
        if (appState === 'active') {
            // DO STUFF
        }
    },

    render: function() {
        if (!this.props.isLoggedIn) {
            return <PidgeyLogin />
        }
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={true}
                    backgroundColor = "rgba(0,0,0,0.2)"
                    barStyle="light-content"
                />
                <PidgeyNavigator />
            </View>
        )
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

function select(store) {
    return {
        isLoggedIn: store.user.isLoggedIn,
    };
}

module.exports = connect(select)(PidgeyApp);
