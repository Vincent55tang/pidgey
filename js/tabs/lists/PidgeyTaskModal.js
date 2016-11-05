'use strict';

var React = require('React');
var StyleSheet = require('StyleSheet');
var View = require('View');
var TouchableOpacity = require('TouchableOpacity');
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
import { closeTaskModal } from '../../actions';

const NEW_TASK_TITLE_PLACEHOLDER = "What do you need to do?";
const NEW_TASK_LOCATION_PLACEHOLDER = "Where can this be done?";
const ADD_TASK_BUTTON_TEXT = "Add Task!";
const UPDATE_TASK_BUTTON_TEXT = "Update Task!";

class PidgeyTaskModal extends React.Component {
    props: {
        isOpen: boolean;
        task: Task;
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            task: {
                title: '',
                location: {
                    name: '',
                    lat: undefined,
                    long: undefined
                }
            },
            displayMap: false
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        console.log("PidgeyTaskModal Received Props", nextProps);
        if(nextProps.isOpen !== this.props.isOpen) {
            if(!nextProps.isOpen) {
                this.closeModal();
            }
        }
        if(nextProps.task !== this.props.task) {
            this.setState({
                task: {
                    ...nextProps.task,
                    location: {
                        name: '',
                        lat: undefined,
                        long: undefined,
                    }
                }
            })
        }
    }

    onLocationSelect(data, details) {
        console.log(data, details);
        this.setState({
            task: {
                title: this.state.task.title,
                location: {
                    name: data.structured_formatting.main_text,
                    subtitle: data.structured_formatting.secondary_text,
                    placeID: data.place_id,
                    lat: details.geometry.location.lat,
                    long: details.geometry.location.lng,
                    types: details.types,
                    description: data.description
                }
            }
        });
    }

    clearLocationSelect() {
        this.setState({
            task: {
                title: this.state.task.title,
                location: {
                    lat: undefined,
                    long: undefined,
                    name: '',
                    placeID: ''
                }
            },
            displayMap: false,
        });
        console.log("_clearLocationSelect");
    }

    render() {
        return(
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.props.isOpen}
                onRequestClose={() => {this.closeModal();}}
                style={styles.container}
            >
                <View style={styles.container}>
                    <View style={styles.edit}>
                        <View style={styles.titleEdit}>
                            <TouchableOpacity onPress={() => {
                                this.closeModal();
                            }}>
                                <Icon name="ios-close-outline" size={30} style={styles.close}/>
                            </TouchableOpacity>
                            <TextInput
                                style={styles.titleInput}
                                onChangeText={(text) => this.setState({task:{title:text}})}
                                value={this.state.task.title}
                                placeholder={NEW_TASK_TITLE_PLACEHOLDER}
                            />
                        </View>
                        <View style={styles.locationEdit}>
                            <GooglePlacesAutocomplete
                                placeholder={NEW_TASK_LOCATION_PLACEHOLDER}
                                autoFocus={false}
                                listViewDisplayed='auto'
                                fetchDetails={true}
                                onPress={(data,details = null) => this.onLocationSelect(data, details)}
                                clearData={() => this.clearLocationSelect()}
                                getDefaultValue={()=> {
                                    return '';
                                }}
                                query={{
                                    key: googleConfig.mapsAPI,
                                    language: 'en'
                                }}
                                styles={{
                                    container: styles.autocompleteContainer,
                                    description: styles.autocompleteDescription,
                                    textInputContainer: styles.autocompleteTextInputContainer,
                                    textInput: styles.autocompleteTextInput,
                                    locationIcon: styles.locationIcon,
                                    clearIcon: styles.clearIcon,
                                    locationMain: styles.locationMain,
                                    setLocationContainer: styles.setLocationContainer,
                                    locationSecondary: styles.locationSecondary,
                                }}
                                currentLocation={false}
                                currentLocationLabel="CurrentLocation"
                                nearbyPlacesAPI='GooglePlacesSearch'
                                GooglePlacesSearchQuery={{
                                    rankby: 'distance'
                                }}
                                showMap={true}
                            />
                        </View>
                        <View style={styles.updateTaskContainer}>
                            <PidgeyButton
                                style={styles.updateButton}
                                caption={this.renderUpdateAddButtonText()}
                                onPress={() => {}}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    renderUpdateAddButtonText() {
        if(this.props.isAdd) {
            return ADD_TASK_BUTTON_TEXT.toUpperCase();
        } else {
            return UPDATE_TASK_BUTTON_TEXT.toUpperCase();
        }
    }

    closeModal() {
        this.props.dispatch(closeTaskModal());
    }
}

const height = Dimensions.get('window').height * 0.9;

var styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 25,
        minHeight: height,
    },
    edit: {
        backgroundColor: '#fff',
        flex: 1,
    },
    titleEdit: {
        backgroundColor: PidgeyColors.colorBackground,
        padding: 15,
    },
    titleInput: {
        fontSize: 18,
        color: '#fff'
    },
    autocompleteContainer: {
        flex: 1,
        margin: 0,
        padding: 0,
    },
    autocompleteDescription: {
        color: '#000',
    },
    autocompleteTextInputContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopWidth: 0,
        paddingHorizontal: 15,
        height: 80,
    },
    autocompleteTextInput: {
        flex: 1,
    },
    setLocationContainer: {
        flex: 1,
    },
    locationMain: {
        fontSize: 16,
    },
    locationSecondary: {
        fontSize: 12,
        fontStyle: 'italic'
    },
    locationEdit: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        //paddingHorizontal: 15,
        flex: 1,
    },
    locationInput: {
        flex: 1,
    },
    locationIcon: {
        paddingRight: 10,
    },
    clearIcon: {
        paddingLeft: 8,
    },
    close: {
        color: '#fff'
    },
    updateTaskContainer: {
        //backgroundColor: PidgeyColors.buttonBackground,
        //padding: 10,
        alignItems: 'center',
    },
    updateTaskText: {
        color: '#fff',
        fontSize: 16,
        letterSpacing: 1,
    },
    updateButton: {
        backgroundColor: PidgeyColors.buttonBackground,
        flex: 1,
        width: 500,
    }
});

function select(store) {
    return {
        isOpen: store.modal.isOpen,
        task: store.modal.task
    }
}

module.exports = connect(select)(PidgeyTaskModal);
