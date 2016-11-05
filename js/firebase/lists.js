var {firebaseDB} = require('../firebase');

export function createList(userID, title) {
    console.log("_LISTS", userID, title);
    var userRef = '/users/' + userID + '/lists/'

    var newListRef = firebaseDB.ref().child(userRef).push().key;

    var updates = {};
    updates[userRef + newListRef] = {
        title: title
    }
    firebaseDB.ref().update(updates);
    return newListRef;
}

export function deleteList(userID, listID) {
    console.log("_LISTS", userID, listID);
    var listRef = '/users/' + userID + '/lists/' + 'listID';

    return firebaseDB.ref(listRef).remove();
}

// USE THIS IF YOU WANNA WATCH
export function getUserListReference(userID) {
    var ref = '/users/' + userID + '/lists';
    return firebaseDB.ref(ref);
}
