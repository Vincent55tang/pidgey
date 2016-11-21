var Navigator = require('Navigator');
var React = require('React');
var MapView = require('react-native-maps');
var ListContainer = require('ListContainer');
var StyleSheet = require('StyleSheet');
var Dimensions = require('Dimensions');

var View = require('View');
var Text = require('Text');
var { connect } = require('react-redux');
var { getUserTasksReference } = require('../../firebase/tasks');

import type { TaskList } from '../../reducers/tasks';

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

    constructor(props: Props) {
        super(props);
        this.state = props;
        this.markers = [];
    }

    componentWillMount() {
        this.setState({optimalRoute: this.generateRoute()});
    }

    initialMapSetup() {
        var latMin;
        var latMax;
        var longMin;
        var longMax;
        var taskList = this.props.taskList.s1;
        for (i = 0; i < taskList.length; ++i) {
            var lat = taskList[i].location.lat;
            var long = taskList[i].location.long;
            if (!latMin || latMin > lat) {latMin = lat;}
            if (!latMax || latMax < lat) {latMax = lat;}
            if (!longMin || longMin > long) {longMin = long;}
            if (!longMax || longMax < long) {longMax = long;}
            this.markers[i] = {
                coordinate: {
                    latitude: lat,
                    longitude: long,
                },
                title: taskList[i].location.title,
                description: taskList[i].location.description
            };
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

    generateRoute() {
        var markers = this.props.taskList.s1;
        var result = [];
        result[0] = markers[0];
        result[0].title = "" + 1;
        markers[0].visited = true;

        for (i = 1; i < markers.length; ++i) {
            var minDistance;
            var minJ;
            minDistance = undefined;
            minJ = undefined;

            for(j = 0; j < markers.length; ++j) {
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
            result[i].title = "" + (i+1);
            markers[minJ].visited = true;
        }
        return result;
    }

    dist(marker1, marker2) {
        return Math.sqrt(Math.pow(marker2.location.lat-marker1.location.lat, 2)+Math.pow(marker2.location.long-marker1.location.long, 2))
    }

    render() {
        return (
            <ListContainer title="Map">
                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        initialRegion={this.initialMapSetup()}
                    >
                        {this.markers.map(marker => (
                            <MapView.Marker
                                coordinate={marker.coordinate}
                                title={marker.title}
                                description={marker.description}
                            />
                        ))}
                        <MapView.Polyline
                            coordinates={this.state.optimalRoute.map(marker => (
                                {
                                    latitude: marker.location.lat,
                                    longitude: marker.location.long
                                }
                            ))}
                        />
                    </MapView>
                </View>
            </ListContainer>
        );
    }
}

const DEFAULT_LAT_DELTA = 0.09;
const DEFAULT_LONG_DELTA = 0.04;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    map: {
        flex: 1,
        height: SCREEN_HEIGHT / 2,
        width: SCREEN_WIDTH,
    }
})

function select(store) {
    return {
        userID: store.user.id,
        taskList: store.list.currentList.taskList,
    }
}

module.exports = connect(select)(TaskMapView);
