import * as firebase from 'firebase';
import type { Task, List } from '../reducers/tasks';

var database = firebase.database();

export function createList(userID, title) {
    var userRef = '/users/' + userID;

    var newListRef = database.ref().child(userRef).push().key;

    newListRef.push().set({
        title: title
    });
}
