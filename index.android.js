/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Map from './app/components/Map.js';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class pidgey extends Component {
  render() {
    return (
      <Map/>
    );
  }
}

AppRegistry.registerComponent('pidgey', () => pidgey);
