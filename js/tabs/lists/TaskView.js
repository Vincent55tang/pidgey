var Navigator = require('Navigator');
var React = require('React');
var ListView = require('ListView');
var PidgeyTaskCell = require('./PidgeyTaskCell');
var PidgeyButton = require('PidgeyButton');
var PidgeyTaskModal = require('./PidgeyTaskModal')

var { connect } = require('react-redux');

var { getUserTasksReference } = require('../../firebase/tasks');

import { View, Text, StyleSheet, NativeModules } from 'react-native';
import { openTaskModal, showListMap, switchTab } from '../../actions';
import type { TaskList } from '../../reducers/tasks';

// var TSP = NativeModules.TSP;

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
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            isLoading: true,
        };

        (this: any).renderRow = this.renderRow.bind(this);
    }

    componentDidMount() {
        this.listenForTasks();
    }

    listenForTasks() {
        var taskRef = getUserTasksReference(this.props.userID, this.props.listID);
        taskRef.on('value', (snap) => {
            var tasks = [];
            snap.forEach((child) => {
                tasks.push({
                    title: child.val().title,
                    location: child.val().location,
                    key: child.key
                });
            });
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(tasks),
                isLoading: false,
            });
        });
    }

    showListMap() {
        this.listenForTasks();
        this.props.dispatch(showListMap(this.state.dataSource._dataBlob));
        this.props.dispatch(switchTab('map'));
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.loading}>

                </View>
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={(rowData) => this.renderRow(rowData)}
                >
                </ListView>
                <PidgeyButton
                    style={styles.addButton}
                    caption="+"
                    onPress={()=>this.openEditModal()}
                />
                <PidgeyButton
                    style={styles.mapButton}
                    caption="M"
                    onPress={()=>this.showListMap()}
                />

                <PidgeyTaskModal/>
            </View>
        );
    }

    renderRow(task) {
        console.log(task.key);
        return (
            <PidgeyTaskCell
                title={task.title}
                location={task.location}
                taskID={task.key}
            />
        );
    }


    openEditModal() {
        this.props.dispatch(openTaskModal({}, true));
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
    },
    mapButton: {
        height: 60,
        width: 120
    }
})

function select(store) {
    return {
        userID: store.user.id,
        listID: store.list.currentList.listID,
    }
}

module.exports = connect(select)(TaskView);
