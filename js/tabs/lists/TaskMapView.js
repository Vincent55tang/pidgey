var Navigator = require('Navigator');
var React = require('React');
var MapView = require('react-native-maps');
var ListContainer = require('ListContainer');
var StyleSheet = require('StyleSheet');
var Dimensions = require('Dimensions');

var View = require('View');
var Text = require('Text');

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
        this.state = {
            taskList: props.taskList
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        if(nextProps.taskList !== this.props.taskList) {
            this.setState({
                taskList: nextProps.taskList
            });
        }
    }

    initialMapSetup() {
        var latMin;
        var latMax;
        var longMin;
        var longMax;
        var i = 0;
        for (location in this.state.taskList) {
            var lat = location.lat;
            var long = location.long;
            if (!latMin || latMin > lat) {latMin = lat;}
            if (!latMax || latMax < lat) {latMax = lat;}
            if (!longMin || longMin > long) {longMin = long;}
            if (!longMax || longMax < long) {longMax = long;}
            this.state.markers['location' + i] = {
                latitutde: lat,
                longitude: long,
                title: i,
                description: location.title
            };
            ++i;
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

    render() {
        return (
            <ListContainer title="Map">
                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        initialRegion={this.initialMapSetup()}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: 0.01,
                                longitude: 0.01,
                            }}
                            title={"test"}
                            description={"ing"}
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

module.exports = TaskMapView;
