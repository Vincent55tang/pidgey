'use strict';

/**
 * @providesModule PidgeyInfoView
 */

var React = require('React');
var ListContainer = require('ListContainer');
var PureListView = require('../../common/PureListView');
var MapView = require('react-native-maps');
var TSPButton = require('../../common/TSPButton')
import { View, Text, StyleSheet, NativeModules } from 'react-native';

function PidgeyInfoView() {
    return (
        <ListContainer
            title="Information"
            backgroundImage={require('./img/info-background.png')}
            backgroundColor={'#47BFBF'}>
                <View style={styles.container}>
                    <Text>Test</Text>
                    <Text>Test</Text>
                    <Text>Test</Text>
                    <Text>Test</Text>
                    <Text>Test</Text>
                    <Text>Test</Text>
                    <MapView
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        style={styles.map}
                    />
                    <View style={styles.container}>
                        <Text>HELLO</Text>
                        <Text>HELLO</Text>
                        <Text>HELLO</Text>
                        <Text>HELLO</Text>
                        <Text>HELLO</Text>
                        <Text>HELLO</Text>
                        <Text>HELLO</Text>
                        <Text>HELLO</Text>
                        <Text>HELLO</Text>
                    </View>
                </View>
                <TSPButton source="Drawer" />
        </ListContainer>
    )
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
});

module.exports = PidgeyInfoView;
