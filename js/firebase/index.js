import * as firebase from 'firebase'
export const firebaseRoot = firebase;
export const firebaseApp = firebase.initializeApp(require('../config/firebase.json'));
export const firebaseDB = firebaseApp.database();
export const firebaseAuth = firebaseApp.auth();
