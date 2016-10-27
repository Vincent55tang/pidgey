var Navigator = require('Navigator');
var React = require('React');
var MapView = require('react-native-maps');

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

    render() {
        return (
            <View>
                <Text>MapView</Text>
            </View>
        );
    }
}


module.exports = TaskMapView;
