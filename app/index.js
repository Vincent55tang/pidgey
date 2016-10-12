import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

const firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

firebase.initializeApp(require('./cloud/firebase.json'));

const styles = require('./assets/styles.js');

export default class Pidgey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            googleUser: null,
            firebaseUser: null
        };
    }

    render() {
        if (!this.state.googleUser && !this.state.firebaseUser) {
          return (
            <View style={styles.container}>
              <GoogleSigninButton style={{width: 250, height: 44}} color={GoogleSigninButton.Color.Light} size={GoogleSigninButton.Size.Icon} onPress={() => { this._signIn(); }}/>
            </View>
          );
        }

        else {
          return (
            <View style={styles.container}>
              <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>Welcome {this.state.googleUser.name}</Text>
              <Text>Your email is: {this.state.googleUser.email}</Text>

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
        this._setupGoogleSignin();
    }

    async _setupGoogleSignin() {
        try {
            await GoogleSignin.hasPlayServices({ autoResolve: true });
            await GoogleSignin.configure({
                webClientId: "146428656887-u92vmu6i2oftroo07pclis31mt3uqmbs.apps.googleusercontent.com",
                scopes: ['https://www.googleapis.com/auth/plus.login']
            })
            const user = await GoogleSignin.currentUserAsync();
            console.log(user);
            this.setState({googleUser: user});

            firebase.auth().onAuthStateChanged(function(user) {
                if(user) {
                    console.log('Current Firebase User Async', user);
                    this.setState({firebaseUser: user});
                }
            })
        } catch(err) {
            console.log("Play Services Error!", err.code, err.message);
        }
    }

    _signIn() {
        GoogleSignin.signIn()
            .then((user) => {
                console.log("_signIn", user);
                this.setState({googleUser: user});
                const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);
                firebase.auth().signInWithCredential(credential)
                    .catch(function(error) {
                        console.log("_firebaseSignIn", error);
                    });
            }).done();
    }

    _signOut() {
        GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
            this.setState({googleUser: null});
            this.setState({firebaseUser: null});
            firebase.auth().signOut().then(function() {
            }, function(error) {
                console.log('_signOut', error);
            });
        }).done();
    }
}
