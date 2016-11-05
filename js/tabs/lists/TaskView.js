var Navigator = require('Navigator');
var React = require('React');
var ListView = require('ListView');
var PidgeyTaskCell = require('./PidgeyTaskCell');
var PidgeyButton = require('PidgeyButton');
var PidgeyTaskModal = require('./PidgeyTaskModal')

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

class TaskView extends React.Component {
    props: Props;
    state: State;

    constructor(props: Props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            taskList: props.taskList,
            dataSource: ds.cloneWithRows([
                {title: 'Task 1'},
                {title: 'Task 2'},
                {title: 'Task 3'},
                {title: 'Task 4'},
                {title: 'Task 5'},
                {title: 'Task 6'},
                {title: 'Task 7'},
                {title: 'Task 8'},
                {title: 'Task 9'},
                {title: 'Task 10'},
                {title: 'Task 11'},
                {title: 'Task 12'},
            ]),
        };

        (this: any).renderRow = this.renderRow.bind(this);
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
            <View style={styles.container}>
                <ListView

                  dataSource={this.state.dataSource}
                  renderRow={(rowData) => this.renderRow(rowData)}
                >
                </ListView>
                <PidgeyButton
                    style={styles.addButton}
                    caption="+"
                    onPress={()=>null}
                />

                            <PidgeyTaskModal/>
            </View>
        );
    }

    renderList(): ?ReactElement {
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
                task={task}
            />
        );
    }
}

styles = StyleSheet.create({
    container: {
        flex: 1
    },
    addButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        position: 'absolute',
        bottom: 25,
        right: 25
    }
})


module.exports = TaskView;
