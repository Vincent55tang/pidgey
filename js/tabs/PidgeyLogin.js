'use strict';

/**
 * @providesModule PidgeyLogin
 */

import React, { Component, PropTypes } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, StatusBar } from 'react-native';

var LoginButton = require('../common/LoginButton');
var LogoutButton = require('../common/LogoutButton');
var PidgeyColors = require('PidgeyColors');

var { connect } = require('react-redux');

class PidgeyLogin extends React.Component {
    state = {
        anim: new Animated.Value(0),
    };

    componentDidMount() {
        Animated.timing(this.state.anim, {toValue: 3000, duration: 3000}).start();
    }

    render() {
        return (
            <Image
                style={styles.container}
                source={require('./img/login-background.png')}>
            <View style={styles.section}>
                <Animated.Image
                    style={this.fadeIn(0)}
                    source={require('./img/logo.png')}
                />
            </View>
            <Animated.View style={styles.section}>
                <Animated.Text style={[styles.h1, this.fadeIn(500,20)]}>
                    Pidgey
                </Animated.Text>
                <Animated.Text style={[styles.h2, this.fadeIn(600,20)]}>
                    A Productivity App Powered by Location
                </Animated.Text>
            </Animated.View>
            <Animated.View style={[styles.section, this.fadeIn(1000, 20)]}>
                <LoginButton source="Full" />
            </Animated.View>
            </Image>
        )
    }

    fadeIn(delay, from = 0) {
        const {anim} = this.state;
        return {
            opacity: anim.interpolate({
                inputRange: [delay, Math.min(delay + 500, 3000)],
                outputRange: [0, 1],
                extrapolate: 'clamp',
            }),
            transform: [{
                translateY: anim.interpolate({
                    inputRange: [delay, Math.min(delay + 500, 3000)],
                    outputRange: [from, 0],
                    extrapolate: 'clamp',
                }),
            }],
        };
    }
}

const scale = Dimensions.get('window').width / 375;

var styles = StyleSheet.create({
    section: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    h1: {
        textAlign: 'center',
        fontSize: Math.round(64 * scale),
        color: '#fff',
        backgroundColor: 'transparent',
    },
    h2: {
        textAlign: 'center',
        fontSize: Math.round(18 * scale),
        color: '#fff',
        backgroundColor: 'transparent'
    }
})

module.exports = connect()(PidgeyLogin);
