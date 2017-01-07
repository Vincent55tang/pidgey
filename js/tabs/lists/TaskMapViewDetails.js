'use strict';

import React, { Component, PropTypes } from 'react';
import { View, Text, Navigator, StyleSheet, Dimensions } from 'react-native';

var PidgeyNumber = require('PidgeyNumber');
var PidgeyColors = require('PidgeyColors');
var PixelRatio = require('PixelRatio');

var { connect } = require('react-redux');

class TaskMapViewDetails extends React.Component {
    props: Props;
    state: State;

    constructor(props: Props) {
        super(props);
    }

    render() {
        if (this.props.selected) {
            return (
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <View style={styles.number}>
                            <Text style={styles.numberText}>{this.props.selected.index}</Text>
                        </View>
                        <View style={styles.textTitleContainer}>
                            <Text style={styles.taskTitle}>
                                {this.props.selected.title}
                            </Text>
                        </View>                        
                    <Text style={styles.taskDescription}>{this.props.selected.location.description}</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.emptyText}>Click a marker to view the task!</Text>
                </View>
            );
        }
    }
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        height: SCREEN_HEIGHT / 3 - 60,
        width: SCREEN_WIDTH,
        padding: PidgeyNumber.defaultPadding,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 18
    },
    taskTitle: {
        fontSize: 24,
    },
    number: {
        height: 30,
        width: 30,
        borderRadius: 40 / PixelRatio.get(),
        backgroundColor: PidgeyColors.gradientLight,
        borderColor: '#fff',
        borderWidth: 1 / PixelRatio.get(),
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'column',
        marginRight: 7,
    }, 
    numberText: {
        color: '#fff',
    },
    titleContainer: {
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row',
    },
    taskDescription: {
        marginLeft: 37,
    }
})

module.exports = connect()(TaskMapViewDetails);
