var {firebaseDB} = require('../firebase');


export function addTask(userID, listID, task) {
    console.log("_TASKS", userID, task);
    var listRef = 'users/' + userID + '/lists/' + listID + "/tasks/";

    var newTaskRef = firebaseDB.ref().child(listRef).push().key;
    var updates = {};
    updates[listRef + newTaskRef] = {
        title: task.title,
        location: task.location
    }
    firebaseDB.ref().update(updates);
    return newTaskRef;
}

export function updateTask(userID, listID, taskID, task) {
    console.log("_TASKS", userID, task);
    var listRef = 'users/' + userID + '/lists/' + listID + "/tasks/" + taskID;
    var updates = {};
    updates[listRef] = {
        title: task.title,
        location: task.location
    }
    firebaseDB.ref().update(updates);
    return listRef;
}

// USE THIS IF YOU WANNA WATCH
export function getUserTasksReference(userID, listID) {
    var ref = '/users/' + userID + '/lists/' + listID + '/tasks/';
    console.log(ref);
    return firebaseDB.ref(ref);
}
