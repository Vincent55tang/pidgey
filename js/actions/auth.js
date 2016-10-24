import firebase from 'firebase';
import GoogleSignin from 'react-native-google-signin';

import {
    SIGN_IN_REQUEST,
    SIGN_IN_ERROR,
    SIGN_IN_SUCCESS,
    SIGN_OUT
} from './types';

async function _signInWithGoogleFirebase(): Promise<Array<Action>> {
    const user = await GoogleSignin.hasPlayServices({ autoResolve: true });
    await GoogleSignin.configure({
        webClientId: "146428656887-u92vmu6i2oftroo07pclis31mt3uqmbs.apps.googleusercontent.com",
        scopes: ['https://www.googleapis.com/auth/plus.login']
    })
    const user = await GoogleSignin.currentUserAsync();
    const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);
    const login = await firebase.auth().signInWithCredential(credential);

    const action = {
        type: 'SIGN_IN_SUCCESS',
        login
    }

    return Promise.all([
        Promise.resolve(action),
        // do other things here once logged in
    ])
}

function signInWithGoogle(): ThunkAction {
    return (dispatch) => {
        const login = _signInWithGoogleFirebase();

        login.then(
            (result) => {
                dispatch(result);
                // DO OTHER THINGS HERE ONCE LOGGED IN
            }
        );
        return login;
    };
}

function signOut(): ThunkAction {
    return (dispatch) => {
        GoogleSignin.signOut();
        firebase.auth().signOut();

        return dispatch({
            type: 'SIGN_OUT'
        })
    }
}

module.exports = { signInWithGoogle, signOut };
