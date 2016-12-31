// fixes unknown self variable
global.self = global;

let nlp = require('nlp_compromise');
let qs = require('qs');
let google = require('../config/google.json');
var React = require('React');
var ReactNative = require('react-native');

// nlp.text(text).tags()
//      -> Gives nouns, country etc

// ALGORITHM
// get current location coords
// if words >= 3 only search nouns + adjectives
//      if more than one noun, prioritize capitalized ones
// if words < 3 search whole tags

var places = "https://maps.googleapis.com/maps/api/place/nearbysearch/";

export function parse(text) {
    console.log(text, nlp.text(text).terms());
    var coords = await getCoordinates();
    console.log(coords);
    //return nlp.text(text).topics();
    placesNearby();
}

function placesNearby(query) {
    var init = {
        method: 'GET',
        headers: new Headers(),
        mode: 'cors'
    }

    var param = qs.stringify({
        key: google.mapsAPI,
    })

    console.log(param);

    fetch(places, {
        method: 'GET'
    })
}

async function getCoordinates() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            resolve({latitude, longitude});
        })
    })

}
