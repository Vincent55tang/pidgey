'use strict'
import React, { Component } from 'react'
import MapView from 'react-native-maps'
const styles = require('../assets/styles.js')

export default class Map extends Component {
  constructor() {
    super();
  };

  _getInitialRegion() {
    return {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }

  render() {
    return (
      <MapView
        style={ styles.map }
        initialRegion={ this._getInitialRegion() }
      />
    );
  }
}
