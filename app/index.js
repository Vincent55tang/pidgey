import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Firestack from 'react-native-firestack'
import * as firebase from 'firebase';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

const firebaseConfig = require('./cloud/firebase.js');
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestack = new Firestack(firebaseConfig);

const styles = require('./assets/styles.js');

export default class Pidgey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    render() {
        if(!this.state.user) {
            return (
                <View style={styles.container}>
                    <GoogleSigninButton style={{width: 120, height: 44}} color={GoogleSigninButton.Color.Light} size={GoogleSigninButton.Size.Icon} onPress={() => { this._signIn(); }}/>
                </View>
            );
        } else {
            return (
              <View style={styles.container}>
                <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>Welcome {this.state.user.name}</Text>
                <Text>Your email is: {this.state.user.email}</Text>

                <TouchableOpacity onPress={() => {this._signOut(); }}>
                  <View style={{marginTop: 50}}>
                    <Text>Log out</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
        }
    }

    componentWillMount() {
        firestack.listenForAuth(function(evt) {
            if( !evt.authenticated ) {
                console.log("Not Authenticated");
            } else {
                console.log("Authenticated", evt.user);
            }
        }).then(() => console.log('Listening for authentication changes'));
        this._setupGoogleSignin();
    }

    async _setupGoogleSignin() {
        try {
            await GoogleSignin.hasPlayServices({ autoResolve: true });
            await GoogleSignin.configure({
                webClientId: "146428656887-u92vmu6i2oftroo07pclis31mt3uqmbs.apps.googleusercontent.com",
                scopes: ['https://www.googleapis.com/auth/plus.login']
            })
            const user = await GoogleSignin.currentUserAsync().then((user) => {
                console.log('Current User Async', user);
                this.setState({user: user});
            }).done();
        } catch(err) {
            console.log("Play Services Error!", err.code, err.message);
        }
    }

    _signIn() {
        GoogleSignin.signIn()
            .then((user) => {
                console.log("_signIn", user);
                this.setState({user: user});
                // firestack.signInWithProvider('google', user.idToken, user.accessToken) // TODO: Implement Google Provider
                //     .then((user) => {
                //         console.log("FIREUSER", user);
                //     }).catch((err) => {
                //         console.log(err);
                //     })
                firestack.unlistenForAuth();
            }) .catch((err) => {
                console.log("Wrong Signin", err);
            })
            .done();
    }

    _signOut() {
        firestack.listenForAuth(function(evt) {
            if( evt.authenticated ) {
                console.log("Received Authentication");
            }
        }).then(() => console.log('Listening for authentication changes'));

        GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
            this.setState({user: null});
        }).done();
    }
}
