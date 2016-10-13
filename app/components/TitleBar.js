'use strict';
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
const styles = require('../assets/styles.js');

class TitleBar extends Component {
    render() {
        return (
            <View>
              <StatusBar
                animated={this.state.animated}
                barStyle={this.state.barStyle}
              />
              <TouchableHighlight
                style={styles.wrapper}
                onPress={this._onChangeBarStyle}>
                <View style={styles.button}>
                  <Text>style: '{getValue(barStyles, this._barStyleIndex)}'</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.wrapper}
                onPress={this._onChangeAnimated}>
                <View style={styles.button}>
                  <Text>animated: {this.state.animated ? 'true' : 'false'}</Text>
                </View>
              </TouchableHighlight>
            </View>
        )
    }
}
