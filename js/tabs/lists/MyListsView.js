'use strict';

var Navigator = require('Navigator');
var React = require('React');
var ScrollView = require('ScrollView');
var ListView = require('ListView');
var PidgeyListCell = require('./PidgeyListCell')

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

class MyListsView extends React.Component {
    props: Props;
    state: State;

    constructor(props: Props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            taskList: props.taskList,
            dataSource: ds.cloneWithRows([
                {title: 'List 1'},
                {title: 'List 2'},
                {title: 'List 3'},
                {title: 'List 4'},
                {title: 'List 5'},
            ]),
        };
    }

    renderRow(list) {
        return (
            <PidgeyListCell
                list={list}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.cellList}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => this.renderRow(rowData)}
                    //renderHeader={this.renderHeader}
                    >
                </ScrollView>
            </View>


        );
    }
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    cellList: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    }
})


module.exports = MyListsView;
