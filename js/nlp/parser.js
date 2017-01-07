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
//      remove names too
// if words < 3 search whole tags

var places = "https://maps.googleapis.com/maps/api/place/textsearch/json?";

async function parse(text) {
    var query = removePeopleAndVerbs(text);
    var coords = await getCoordinates();
    // //return nlp.text(text).topics();
    return placesNearby(coords, query);
    // if(places.length === 0) {
    //     query = keywordify(text);
    // }
}

function removePeopleAndVerbs(text) {
    var terms = nlp.text(text).terms();
    console.log(terms);
    var keep = [];
    for(var i = 0; i < terms.length; i++) {
        if(!terms[i].pos.Verb && !terms[i].pos.Person && !terms[i].pos.Preposition) {
            keep.push(terms[i].text);
        }
    }

    var returnee = "";

    for(var i = 0; i < keep.length; i++) {
        returnee += keep[i] + " ";
    }
    return returnee;
}

function placesNearby(coords, query) {
    var param = qs.stringify({
        key: google.mapsAPI,
        location: coords.latitude+','+coords.longitude,
        query: query
    });

    const request = new Request(places + param,
        {
            method: 'GET'
        }
    );

    return new Promise((resolve, reject) => {
        return fetch(request)
            .then((response) => response.json())
            .then((result) => {
                resolve(result.results);
            }).catch((error) => {
                console.log(error);
                return [];
            })
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

module.exports = { parse }