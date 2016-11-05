import firebase from 'firebase';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

import {
    SIGN_IN_SUCCESS,
    SIGN_OUT
} from './types';

async function _signInWithGoogleFirebase(): Promise<Array<Action>> {
    const hello = await GoogleSignin.hasPlayServices({ autoResolve: true });

    const configure = await GoogleSignin.configure({
        webClientId: "146428656887-u92vmu6i2oftroo07pclis31mt3uqmbs.apps.googleusercontent.com",
        scopes: ['https://www.googleapis.com/auth/plus.login']
    });

    const user = await GoogleSignin.signIn();
    const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);
    const login = await firebase.auth().signInWithCredential(credential);

    console.log("_signInWithGoogleFirebase", login.displayName);

    const action = {
        type: 'SIGN_IN_SUCCESS',
        data: {
            id: login.uid,
            name: login.displayName,
            email: login.email,
            photo: login.photoURL,
            token: user.idToken
        }
    }

    return Promise.all([
        Promise.resolve(action),
        // do other things here once logged in
    ])
}

function signInWithGoogle(): ThunkAction {
    console.log("signInWithGoogle");
    return (dispatch) => {
        const login = _signInWithGoogleFirebase();
        login.then(
            (result) => {
                console.log(result);
                dispatch(result);
                // DO OTHER THINGS HERE ONCE LOGGED IN
            }
        );
        return login;
    };
}

function signOut(): ThunkAction {
    console.log('auth.signOut')
    return (dispatch) => {
        GoogleSignin.signOut();
        firebase.auth().signOut()

        return dispatch({
            type: 'SIGN_OUT'
        })
    }
}

module.exports = { signInWithGoogle, signOut };
