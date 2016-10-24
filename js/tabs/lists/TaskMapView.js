var Navigator = require('Navigator');
var React = require('React');
var MapView = require('react-native-maps');

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

    render() {
        return (
            <MapView
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        );
    }
}


module.exports = TaskMapView;
