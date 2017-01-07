'use strict';

import React, { Component, PropTypes } from 'react';
import { View, Text, Navigator, StyleSheet, Dimensions, PixelRatio } from 'react-native';
import Qs from 'qs';
import type { TaskList } from '../../reducers/tasks';

var ListContainer = require('ListContainer');
var MapView = require('react-native-maps');
var PidgeyColors = require('PidgeyColors');
var TaskMapViewDetails = require('./TaskMapViewDetails');
var TaskNavigationBar = require('./TaskNavigationBar');

var googleConfig = require('../../config/google');

var { connect } = require('react-redux');
var { getUserTasksReference } = require('../../firebase/tasks');
var { switchTab } = require('../../actions');

type Props = {
    taskView: string;
    taskList: TaskList;
    navigator: Navigator;
};

// USE THIS FOR FILTERS!
type State = {
    taskList: TaskList;
};

class TaskMapView extends React.Component {
    props: Props;
    state: State;
    markers: any;

    constructor(props: Props) {
        super(props);
        this.state = props;
        this.markers = [];
    }

    componentWillMount() {
        this.setState({
            selected: undefined,
            polylineCoordinates: undefined,
            selectedIndex: 0
        });
        this.markers = this.generateRoute();
    }

    componentDidMount() {
        this.fetchPolyline();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!(this.state.polylineCoordinates === nextState.polylineCoordinates )) { return true; }
        if (!(this.state.selected === nextState.selected)) { return true; }
        return false;
    }

    initialMapSetup() {
        var latMin;
        var latMax;
        var longMin;
        var longMax;
        var taskList = this.props.taskList;
        for (var i = 0; i < taskList.length; ++i) {
            var lat = taskList[i].location.lat;
            var long = taskList[i].location.long;
            if (!latMin || latMin > lat) {latMin = lat;}
            if (!latMax || latMax < lat) {latMax = lat;}
            if (!longMin || longMin > long) {longMin = long;}
            if (!longMax || longMax < long) {longMax = long;}
        }
        return (
            {
                latitude: (latMin+latMax)/2 || 0,
                longitude: (longMin+longMax)/2 || 0,
                latitudeDelta: ((latMax-latMin) || 0) + DEFAULT_LAT_DELTA,
                longitudeDelta: ((longMax-longMin) || 0) + DEFAULT_LONG_DELTA
            }
        );
    }

    fetchPolyline() {
        if (!this.markers || this.markers.length == 0) return;
        var self = this;
        var list = this.markers;
        var waypoints = list.slice(1,list.length).map((w) => {
            return 'place_id:'+w.location.placeID;
        }).join('|');

        const request = new Request('https://maps.googleapis.com/maps/api/directions/json?' +
            Qs.stringify({
                    origin: 'place_id:' + list[0].location.placeID,
                    destination: 'place_id:' + list[0].location.placeID,
                    key: googleConfig.mapsAPI,
                    waypoints: waypoints
                }),
            {
                method: 'GET',
            })

        fetch(request)
        .then((response) => response.json())
        .then((responseJSON) => {
            self.setState({polylineCoordinates: this.decode(responseJSON.routes[0].overview_polyline.points, false)});
        })
        .catch((error) => {
            // TODO: Handle error responses somehow
            console.log(error);
        })
    }

    generateRoute() {
        var result = [];
        if (!this.props.taskList || this.props.taskList.length == 0) return result;

        var markers = this.props.taskList;
        result[0] = markers[0];
        result[0].index = "" + 1;
        markers[0].visited = true;

        for (var i = 1; i < markers.length; ++i)
            markers[i].visited = false;

        for (var i = 1; i < markers.length; ++i) {
            var minDistance;
            var minJ;
            minDistance = undefined;
            minJ = undefined;

            for(var j = 0; j < markers.length; ++j) {
                var dist;
                if(!markers[j].visited) {
                    dist = this.dist(markers[j], result[i-1]);
                    if (!(minDistance < dist)) {
                        minDistance = dist;
                        minJ = j;
                    }
                }
            }
            // j contains index of closest marker
            result[i] = markers[minJ];
            result[i].index = "" + (i+1);
            markers[minJ].visited = true;
        }
        return result;
    }

    showMarkerDetails(marker) {
        this.setState({selected: marker});
        this.setState({selectedIndex: marker.index});
    }

    dist(marker1, marker2) {
        return Math.sqrt(Math.pow(marker2.location.lat-marker1.location.lat, 2)+Math.pow(marker2.location.long-marker1.location.long, 2))
    }

    // Decode google maps polyline string
    decode(str, precision) {
        var index = 0,
            lat = 0,
            lng = 0,
            coordinates = [],
            shift = 0,
            result = 0,
            byte = null,
            latitude_change,
            longitude_change,
            factor = Math.pow(10, precision || 5);

        // Coordinates have variable length when encoded, so just keep
        // track of whether we've hit the end of the string. In each
        // loop iteration, a single coordinate is decoded.
        while (index < str.length) {

            // Reset shift, result, and byte
            byte = null;
            shift = 0;
            result = 0;

            do {
                byte = str.charCodeAt(index++) - 63;
                result |= (byte & 0x1f) << shift;
                shift += 5;
            } while (byte >= 0x20);

            latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

            shift = result = 0;

            do {
                byte = str.charCodeAt(index++) - 63;
                result |= (byte & 0x1f) << shift;
                shift += 5;
            } while (byte >= 0x20);

            longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

            lat += latitude_change;
            lng += longitude_change;

            coordinates.push([lat / factor, lng / factor]);
        }

        return coordinates;
    }

    render() {
        if (!this.props.taskList) {
            return(<ListContainer title={this.props.title}>
                <View style={styles.container}>
                    <Text>
                        Nothing to show!
                    </Text>
                </View>
            </ListContainer>);
        } else if (this.state.polylineCoordinates) {
            return (
                <ListContainer title={this.props.title}>
                    <View style={styles.container}>
                        <MapView
                            style={styles.map}
                            initialRegion={this.initialMapSetup()}
                        >
                            {this.markers.map(marker => (
                                <MapView.Marker
                                    coordinate={{latitude: marker.location.lat, longitude: marker.location.long}}
                                    onPress={()=>this.showMarkerDetails(marker)}>
                                    {this.state.selectedIndex == marker.index ? (
                                        <View style={styles.selectedMarkerContainer}>
                                            <Text style={styles.markerText}>
                                                {marker.index}
                                            </Text>
                                        </View>
                                    ) : (
                                        <View style={styles.markerContainer}>
                                            <Text style={styles.markerText}>
                                                {marker.index}
                                            </Text>
                                        </View>
                                    )}


                                </MapView.Marker>
                            ))}

                            <MapView.Polyline
                                coordinates={this.state.polylineCoordinates.map((p) => (
                                    {
                                        latitude: p[0],
                                        longitude: p[1]
                                    }
                                ))}
                                strokeWidth={4}
                                strokeColor={PidgeyColors.gradientDark}
                            />
                        </MapView>
                        <TaskMapViewDetails selected={this.state.selected}/>
                        <TaskNavigationBar
                            showMap={false}
                            showAdd={false}
                            listOnPress={()=>this.props.dispatch(switchTab('list'))}
                        />
                    </View>
                </ListContainer>
            );
        } else {
            return (
                <ListContainer title="Map">
                    <View style={styles.container}>
                        <Text>
                            Loading...
                        </Text>
                    </View>
                    <TaskMapViewDetails selected={this.state.selected}/>
                    <TaskNavigationBar
                        showMap={false}
                        showAdd={false}
                        listOnPress={()=>this.props.dispatch(switchTab('list'))}
                    />
                </ListContainer>
            );
        }
    }
}

const DEFAULT_LAT_DELTA = 0.09;
const DEFAULT_LONG_DELTA = 0.04;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    map: {
        flex: 1,
        height: SCREEN_HEIGHT / 2,
        width: SCREEN_WIDTH,
    },
    markerContainer: {
        height: 25,
        width: 25,
        borderRadius: 25 / PixelRatio.get(),
        backgroundColor: PidgeyColors.yellow,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff',
        borderWidth: 1/PixelRatio.get()
    },
    selectedMarkerContainer: {
        height: 25,
        width: 25,
        borderRadius: 25 / PixelRatio.get(),
        backgroundColor: PidgeyColors.gradientLight,
        alignItems: 'center',
        justifyContent: 'center'
    },
    markerText: {
        color: '#fff'
    }
})

function select(store) {
    return {
        userID: store.user.id,
        taskList: store.list.currentList.taskList,
        title: store.list.currentList.listTitle,
    }
}

module.exports = connect(select)(TaskMapView);
