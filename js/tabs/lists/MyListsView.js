'use strict';

import React, { Component, PropTypes } from 'react';
import { View, Text, Navigator, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, TextInput, ListView, ScrollView } from 'react-native';
import { createList, selectList, switchTab } from '../../actions';
import Icon from 'react-native-vector-icons/Ionicons';
import type { TaskList } from '../../reducers/tasks';

var ListContainer = require('ListContainer');
var Modal = require('Modal');
var PidgeyListCell = require('./PidgeyListCell')
var PidgeyButton = require('PidgeyButton');
var PidgeyColors = require('PidgeyColors');
var PidgeyNumber = require('PidgeyNumber');
var TaskMapView = require('./TaskMapView');

var { connect } = require('react-redux');
var ListDeleteModal = require('./ListDeleteModal');
var { getUserListReference } = require('../../firebase/lists');

class MyListsView extends React.Component {
    props: Props;
    state: State;

    constructor(props: Props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            modalVisible: false,
            deleteModalVisible: false,
            lists: [
                {title: ''}
            ],
            list: {
                title: ''
            },
            dataSource: ds.cloneWithRows([
                {title: 'List 1'},
                {title: 'List 2'},
                {title: 'List 3'},
                {title: 'List 4'},
                {title: 'List 5'},
            ]),
        };
    }

    listenForListItems() {
        var itemRef = getUserListReference(this.props.userID).orderByKey();

        itemRef.on('value', (snap) => {
            var items = [];
            snap.forEach((child)=> {
                items.push({
                    title: child.val().title,
                    listID: child.key,
                    key: child.key
                });
            });
            this.setState({
                lists: items
            })
        })
    }

    componentDidMount() {
        this.listenForListItems();
    }

    createList(listName) {
        if(listName === '') {
            this.setState({showCreateListError: true});
            return;
        }
        this.props.dispatch(createList(this.props.userID, listName));
        this.setModalVisible(false);
    }

    selectList(listID, listName) {
        this.props.dispatch(selectList(listID, listName));
        this.props.dispatch(switchTab('tasks'));
    }

    render() {
        const createListCell = (item) => (
            <PidgeyListCell
                title={item.title}
                listID={item.listID}
                onPress={()=>this.selectList(item.listID, item.title)}
            />
        );

        return (
            <ListContainer title="My Lists">
                <View style={styles.container}>
                    <ScrollView
                        style={styles.scrollView}
                        dataSource={this.state.dataSource}
                        snapToAlignment={"start"}
                        showHorizontalScrollIndicator={false}
                        alwaysBounceHorizontal={true}
                        contentContainerStyle={styles.scrollViewContentStyle}
                    >
                        {this.state.lists.map(createListCell)}
                    </ScrollView>
                    <PidgeyButton
                        style={styles.addListButton}
                        caption="+"
                        onPress={()=>{this.setModalVisible(true)}}
                    />
                </View>

                {this.renderModal()}
                <ListDeleteModal />

            </ListContainer>
        );
    }

    setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        })
    }

    renderModal() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {this.setModalVisible(false)}}
                style={styles.addListModal}
            >
                <View style={styles.addListModal}>
                    <View style={styles.addListModalContent}>
                        <View style={styles.listTitleEdit}>
                            <TouchableOpacity onPress={() => {
                                this.setModalVisible(false);
                            }}>
                                <Icon name="ios-close-outline" size={30} style={styles.closeModalIcon}/>
                            </TouchableOpacity>
                            <TextInput
                                style={styles.listTitleInput}
                                editable={true}
                                onChangeText={
                                    (text) => this.setState({
                                        list: {
                                            title: text
                                        }
                                    })
                                }
                                placeholder={NEW_LIST_TITLE_PLACEHOLDER}
                                onChangeSubmit={(text) => this.createList(this.state.list.title)}
                                autoFocus={true}
                            />
                        </View>
                        <View>
                            <TouchableHighlight
                                style={styles.createListButtonModal}
                                onPress={() => this.createList(this.state.list.title)}>
                                <View style={styles.createListButtonModal}>
                                    <Text style={styles.createListButtonText}>
                                        {NEW_LIST_BUTTON_PLACEHOLDER}
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const NEW_LIST_TITLE_PLACEHOLDER = "What do you need to organize?";
const NEW_LIST_BUTTON_PLACEHOLDER = "Create List!";

const HEIGHT = Dimensions.get("window").height;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 100,
        flexDirection: 'row',
        backgroundColor: '#f0f7a8'
    },
    cellList: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    scrollViewContentStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        height: HEIGHT*0.88,
    },
    scrollViewItem: {
        backgroundColor: '#f0f0f0',
        margin: 10,
        height: 300,
    },
    addListButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        position: 'absolute',
        bottom: PidgeyNumber.defaultPadding,
        right: PidgeyNumber.defaultPadding,
    },
    addListCellicon: {
        color: 'white',
    },
    addListButtonContainer: {
        flex: 1,
    },
    addListCell: {
        backgroundColor: '#e0e0e0',
    },
    addListModal: {
        backgroundColor: PidgeyColors.modalDark,
        flex: 1,
        padding: PidgeyNumber.defaultPadding,
        justifyContent: 'center',
    },
    addListModalContent: {
        backgroundColor: 'white',
    },
    listTitleEdit: {
        backgroundColor: PidgeyColors.colorBackground,
        padding: 15,
    },
    listTitleInput: {
        fontSize: 18,
        color: '#fff'
    },
    closeModalIcon: {
        color: '#fff',
    },
    createListButtonModal: {
        backgroundColor: PidgeyColors.gradientLight,
        flex: 1,
        height: 50,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    createListButtonText: {
        color: '#fff',
        fontSize: 16,
    }
});

function select(store) {
    return {
        userID: store.user.id,
    }
}

module.exports = connect(select)(MyListsView);
