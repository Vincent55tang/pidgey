'use strict';

var React = require('React');
var StyleSheet = require('StyleSheet');
var View = require('View');
var TouchableOpacity = require('TouchableOpacity');
var TouchableHighlight = require('TouchableHighlight');
var PidgeyNumber = require('PidgeyNumber');
var Modal = require('Modal');
var Text = require('Text');
var TextInput = require('TextInput');
var PidgeyColors = require('PidgeyColors');
var PidgeyButton = require('PidgeyButton');
var Dimensions = require('Dimensions');
import { GooglePlacesAutocomplete } from '../../common/GooglePlacesAutocomplete';

var { connect } = require('react-redux');

var googleConfig = require('../../config/google');

import Icon from 'react-native-vector-icons/Ionicons';

import type { Task } from '../../reducers/tasks';
import { closeDeleteListModal, deleteList } from '../../actions';

const DELETE_LIST_TEXT = "Are you sure you want to remove this list?"

class PidgeyTaskModal extends React.Component {
    props: {
        isOpen: boolean;
        listID: string;
    };

    constructor(props: Props) {
        super(props);
    }

    render() {
            return (
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.props.isOpen}
                    onRequestClose={() => {this.closeModal()}}
                    style={styles.deleteListModal}
                >
                    <View style={styles.deleteListModal}>
                        <View style={styles.deleteListModalContent}>
                            <View style={styles.deleteListModalInfo}>
                                <TouchableHighlight>
                                    <View style={styles.closeDeleteListModalButton}>
                                        <TouchableOpacity onPress={() => {
                                            this.closeModal();
                                        }}>
                                            <Icon name="ios-close-outline" size={30} style={styles.closeModalIcon}/>
                                        </TouchableOpacity>
                                    </View>

                                </TouchableHighlight>
                                <Text style={styles.deleteListText}>{DELETE_LIST_TEXT}</Text>
                            </View>
                            <View style={styles.deleteListOptions}>
                                <View style={styles.confirmDeleteContainer}>
                                    <TouchableOpacity
                                        onPress={() => this.deleteList()}>
                                        <View style={styles.createListButtonModal}>
                                            <Text style={styles.createListButtonText}>
                                                Yes
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.closeDeleteContainer}>
                                    <TouchableHighlight
                                        onPress={() => console.log("no")}>
                                        <View>
                                            <TouchableOpacity onPress={() => {
                                                this.closeModal();
                                            }}>
                                                <Text>Close</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
        )
    }

    closeModal() {
        this.props.dispatch(closeDeleteListModal());
    }

    deleteList() {
        this.props.dispatch(deleteList(this.props.userID, this.props.listID));
        this.props.dispatch(closeDeleteListModal());
    }
}

const height = Dimensions.get('window').height * 0.9;

var styles = StyleSheet.create({
    deleteListModal: {
        backgroundColor: PidgeyColors.modalDark,
        flex: 1,
        padding: PidgeyNumber.defaultPadding,
        justifyContent: 'center',
    },
    deleteListModalContent: {
        backgroundColor: PidgeyColors.colorBackground,
        justifyContent: 'center',
    },
    deleteListModalInfo: {
        padding: PidgeyNumber.defaultPadding,
    },
    deleteListText: {
        //color: '#fff',
        fontSize: 18,
    },
    closeDeleteListModalButton: {
        //flex: 1,
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
    confirmDeleteContainer: {
        flex: 0.8,
        padding: PidgeyNumber.defaultPadding,
        backgroundColor: PidgeyColors.listDone,
        alignItems: 'center',
    },
    closeDeleteContainer: {
        backgroundColor: PidgeyColors.yellow,
        padding: PidgeyNumber.defaultPadding,
        alignItems: 'center',
        flex: 0.2,
    },
    deleteListOptions: {
        alignItems: 'flex-start',
        flexDirection: 'row',
    }
});

function select(store) {
    return {
        isOpen: store.modal.isDeleteOpen,
        listID: store.modal.deleteList,
        userID: store.user.id,
    }
}

module.exports = connect(select)(PidgeyTaskModal);
