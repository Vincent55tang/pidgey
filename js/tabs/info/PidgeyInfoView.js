'use strict';

/**
 * @providesModule PidgeyInfoView
 */

var React = require('React');
var ListContainer = require('ListContainer');
var MapView = require('react-native-maps');
var TextInput = require('TextInput');
var PidgeyButton = require('PidgeyButton');
var Info = require('./Info');

var { connect } = require('react-redux');

import { View, Text, StyleSheet } from 'react-native';

import { createList } from '../../actions';

class PidgeyInfoView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCreateListError: false,
            list: {
                title: '',
            },
            results: {
                latitude: '',
                longitude: '',
            }
        }
    }

    render() {
        return (
            <ListContainer
                title="TEST PAGE"
                backgroundImage={require('./img/info-background.png')}
                backgroundColor={'#47BFBF'}>
                    <View style={styles.container}>
                        <Info />
                    </View>
            </ListContainer>
        )
    }


}

var styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
    },
    map: {
        flex: 1,
        height: 500,
        position: 'absolute',
        top:0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    button: {
        width: 50,
    }
});

function select(store) {
    return {
        list: store.list,
        user: store.user
    }
}

module.exports = connect(select)(PidgeyInfoView);
