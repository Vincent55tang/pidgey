var Navigator = require('Navigator');
var React = require('React');
var PureListView = require('../../common/PureListView');

var PidgeyTaskCell = require('./PidgeyTaskCell');

import { View, Text, StyleSheet } from 'react-native';

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

class TaskListView extends React.Component {
    props: Props;
    state: State;
    _innerRef: ?PureListView;

    constructor(props: Props) {
        super(props);
        this.state = {
            taskList: props.taskList
        };

        (this: any).renderRow = this.renderRow.bind(this);
        (this: any).doNothingForNow = this.doNothingForNow.bind(this);
        (this: any).storeInnerRef = this.storeInnerRef.bind(this);
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
                <Text> HELLO! TASK LIST VIEW </Text>

            </View>
        );
    }

    renderList() {
        if(this.props.taskList.tasks.size !==  0) {
            var ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            });
            return null;
        }
    }

    renderRow(task: Task) {
        return (
            <PidgeyTaskCell
                onPress={() => this.doNothingForNow()}
                task={Task}
            />
        );
    }

    doNothingForNow() {
        return;
    }

    storeInnerRef(ref: ?PureListView) {
        this._innerRef = ref;
    }

    scrollTo(...args: Array<any>) {
        this._innerRef && this._innerRef.scrollTo(...args);
    }

    getScrollResponder(): any {
        return this._innerRef && this._innerRef.getScrollResponder();
    }
}


module.exports = TaskListView;
