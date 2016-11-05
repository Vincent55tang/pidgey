'use strict';

var Navigator = require('Navigator');
var React = require('React');
var ScrollView = require('ScrollView');
var ListView = require('ListView');
var PidgeyListCell = require('./PidgeyListCell')
var ListContainer = require('ListContainer');
var PidgeyButton = require('PidgeyButton');
var Dimensions = require('Dimensions');

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
            dataSource: ds.cloneWithRows([
                {title: 'List 1'},
                {title: 'List 2'},
                {title: 'List 3'},
                {title: 'List 4'},
                {title: 'List 5'},
            ]),
        };
    }

    render() {
        return (
            <ListContainer title="My Lists">
                <View style={styles.container}>
                    <ScrollView
                        contentContainerStyle={styles.cellList}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => this.renderRow(rowData)}
                        style={styles.scrollView}
                        horizontal={true}
                        snapToInterval={width*0.8}
                        snapToAlignment={"start"}
                        alwaysBounceHorizontal={true}
                        //renderHeader={this.renderHeader}
                    >
                        <Text style={styles.scrollViewItem}>HELLO </Text>
                        <Text style={styles.scrollViewItem}>HELLO </Text>
                        <Text style={styles.scrollViewItem}>HELLO </Text>
                        <Text style={styles.scrollViewItem}>HELLO </Text>
                        <Text style={styles.scrollViewItem}>HELLO </Text>
                        <Text style={styles.scrollViewItem}>HELLO </Text>
                        <Text style={styles.scrollViewItem}>HELLO </Text>
                        <Text style={styles.scrollViewItem}>HELLO </Text>
                        <Text style={styles.scrollViewItem}>HELLO </Text>
                        <Text style={styles.scrollViewItem}>HELLO </Text>
                        <Text style={styles.scrollViewItem}>HELLO </Text>
                        <Text style={styles.scrollViewItem}>HELLO </Text>
                    </ScrollView>
                    <PidgeyButton
                        style={styles.addButton}
                        caption="+"
                        onPress={()=>null}
                    />
                </View>
            </ListContainer>
        );
    }
}
const width = Dimensions.get("window").width;
var styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    cellList: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    scrollView: {
        height: 300,
    },
    scrollViewItem: {
        width: width*0.8,
    },
    addButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        position: 'absolute',
        bottom: 25,
        right: 25
    }
});

module.exports = MyListsView;
