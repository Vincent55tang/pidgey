var {firebaseDB} = require('../firebase');

export function checkTask(userID, listID, taskID, checked) {
    console.log("_TASKS - CHECKING");
    var itemRef = 'users/' + userID + '/lists/' + listID + '/tasks/' + taskID + '/checked';

    var updates = {}
    updates[itemRef] = !checked;

    firebaseDB.ref().update(updates);
    return itemRef;
}


export function addTask(userID, listID, task) {
    console.log("_TASKS", userID, task);
    var listRef = 'users/' + userID + '/lists/' + listID + "/tasks/";

    var newTaskRef = firebaseDB.ref().child(listRef).push().key;
    var updates = {};
    updates[listRef + newTaskRef] = {
        title: task.title,
        location: task.location,
        checked: false,
    }
    firebaseDB.ref().update(updates);
    return newTaskRef;
}

export function deleteTask(userID, listID, taskID) {
    var itemRef = 'users/' + userID + '/lists/' + listID + '/tasks/' + taskID;
    firebaseDB.ref(itemRef).remove();
}

export function updateTask(userID, listID, taskID, task) {
    console.log("_TASKS", userID, task);
    var listRef = 'users/' + userID + '/lists/' + listID + "/tasks/" + taskID;
    var updates = {};

    if (task.location.lat === undefined) {
        updates[listRef] = {
            title: task.title,
            location: {}
        }
    } else {
        updates[listRef] = {
            title: task.title,
            location: task.location
        }
    }
    firebaseDB.ref().update(updates);
    return listRef;
}

// USE THIS IF YOU WANNA WATCH
export function getUserTasksReference(userID, listID) {
    var ref = '/users/' + userID + '/lists/' + listID + '/tasks/';
    return firebaseDB.ref(ref);
}
