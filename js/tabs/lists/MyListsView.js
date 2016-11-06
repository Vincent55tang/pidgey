'use strict';

var Navigator = require('Navigator');
var React = require('React');
var ScrollView = require('ScrollView');
var ListView = require('ListView');
var PidgeyListCell = require('./PidgeyListCell')
var ListContainer = require('ListContainer');
var PidgeyButton = require('PidgeyButton');
var Dimensions = require('Dimensions');
var PidgeyNumber = require('PidgeyNumber');
var PidgeyColors = require('PidgeyColors');
var Modal = require('Modal');
var TouchableHighlight = require('TouchableHighlight');
var TouchableOpacity = require('TouchableOpacity');
var TextInput = require('TextInput');
var { connect } = require('react-redux');


import { createList } from '../../actions';


var { getUserListReference } = require('../../firebase/lists');

import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import type { TaskList } from '../../reducers/tasks';


import Icon from 'react-native-vector-icons/Ionicons';

var NEW_LIST_TITLE_PLACEHOLDER = "What do you need to organize?";
var NEW_LIST_BUTTON_PLACEHOLDER = "Create List!";

class MyListsView extends React.Component {
    props: Props;
    state: State;

    constructor(props: Props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            modalVisible: false,
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
        var itemRef = getUserListReference(this.props.userID);

        itemRef.on('value', (snap) => {
            var items = [];
            snap.forEach((child)=> {
                items.push({
                    title: child.val().title,
                    _key: child.key
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

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    createList(listName) {
        if(listName === '') {
            this.setState({showCreateListError: true});
            return;
        }
        console.log("INFO: CREATE LIST");
        this.props.dispatch(createList(this.props.userID, listName));
        this.setModalVisible(false);
    }


    render() {
        const createListCell = (item) => (
            <PidgeyListCell title={item.title} key={item._key} />);

        return (
            <ListContainer title="My Lists">
                <View style={styles.container}>
                    <ScrollView
                        contentContainerStyle={styles.cellList}
                        dataSource={this.state.dataSource}
                        style={styles.scrollView}
                        horizontal={true}
                        snapToInterval={width*0.8}
                        snapToAlignment={"start"}
                        showHorizontalScrollIndicator={false}
                        alwaysBounceHorizontal={true}
                    >
                        {this.state.lists.map(createListCell)}
                        <PidgeyListCell
                            title="Add Task!"
                            onPress={()=>this.setModalVisible(true)}
                            style={styles.addListCell}
                        >
                            <Icon name="ios-add-circle-outline" size={30} style={styles.addListCellicon} />
                        </PidgeyListCell>
                    </ScrollView>
                    <Text>UserID: {this.props.userID}</Text>
                    <PidgeyButton
                        style={styles.addListButton}
                        caption="+"
                        onPress={()=>{this.setModalVisible(true)}}
                    />
                </View>

                {this.renderModal()}

            </ListContainer>
        );
    }

    renderModal() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {alert("Modal has been closed")}}
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

const width = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
    },
    cellList: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    scrollView: {
        height: HEIGHT * 0.5,
        paddingHorizontal: PidgeyNumber.defaultPadding,
        paddingRight: 25,
    },
    scrollViewItem: {
        width: width*0.8,
        backgroundColor: '#06735f',
        margin: 10,
        height: width*0.8,
    },
    addListButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
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
        backgroundColor: PidgeyColors.listDone,
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
