'use strict';

var PidgeyColors = require('PidgeyColors');
var PidgeyNumber = require('PidgeyNumber');
var Image = require('Image');
var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text } = require('PidgeyText');
var TouchableOpacity = require('TouchableOpacity');
var View = require('View');
var Alert = require('Alert');
var PidgeyCheckbox = require('PidgeyCheckbox');
import Icon from 'react-native-vector-icons/Ionicons';

var { connect } = require('react-redux');

import type { Task } from '../../reducers/tasks';
import { openTaskModal, checkTask, deleteTask } from '../../actions';


type Props = {
    title: string,
    location: object,
    style: any,
    navigator: Navigator,
    onCheck: func;
    checked: bool,
}

type State = {
    isComplete: boolean;
    isEditing: boolean;
}

class PidgeyTaskCell extends React.Component {
    props: Props;
    state: State;

    static defaultProps: {
        checked: false,
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            isComplete: false,
            isEditing: false,
        };
    }

    render() {
        var location = "";
        if (this.props.location !== undefined) {
            location = <Text style={styles.locationText}>
                {this.props.location.name}
            </Text>;
        }

        var cellStyle = {};
        if(this.props.checked) {
            cellStyle = {opacity: 0.25}
        }

        var title = (
            <View style={[styles.titleContainer, cellStyle]}>
                <Text style={styles.titleText}>
                    {this.props.title}
                </Text>
                {location}
            </View>
        )

        var icon = this.props.checked ? "ios-trash-outline" : "ios-create-outline"

        var editIcon = (
            <View style={[styles.editIconContainer, cellStyle]}>
                <TouchableOpacity
                    style={styles.editIcon}
                    onPress={()=> this.editIconAction()}>
                    <Icon name={icon} size={30} />
                </TouchableOpacity>
            </View>
        )

        var cell =
            <View style={styles.container}>
                <View style={[styles.cell, this.props.style]}>
                    <View style={[styles.checkboxContainer, cellStyle]}>
                        <PidgeyCheckbox
                            size={24}
                            checked={this.props.checked}
                            onPress={() => this.checkTask()}
                        />
                    </View>
                    {title}
                    {editIcon}
                </View>
            </View>;

        return cell;
    }

    checkTask() {
        var checked;
        if (this.props.checked === undefined) {
            checked = false
        } else {
            checked = this.props.checked
        }
        this.props.dispatch(
            checkTask(
                this.props.userID, this.props.listID, this.props.taskID, checked
            )
        );
    }

    editIconAction() {
        if(!this.props.checked) {
            this.props.dispatch(
                openTaskModal({
                    title: this.props.title,
                    taskID: this.props.taskID,
                    location: this.props.location
                }, false)
            );
        } else {
            this.props.dispatch(
                deleteTask(this.props.userID, this.props.listID, this.props.taskID)
            )
        }
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cell: {
        //paddingLeft: 17,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleContainer: {
        flex: 1,
        paddingVertical: PidgeyNumber.defaultPadding,
        paddingHorizontal: 10,
    },
    titleText: {
        fontSize: 16,
        color: PidgeyColors.darkText,
    },
    locationText: {
        fontSize: 12,
        fontStyle: 'italic',
    },
    editIcon: {
        paddingHorizontal: PidgeyNumber.defaultPadding,
        paddingVertical: PidgeyNumber.defaultPadding,
    },
    added: {
        position: 'absolute',
        backgroundColor: 'transparent',
        right: 0,
        top: 0,
    },
    checkboxContainer: {
        flexDirection: 'column',
    }
});


PidgeyTaskCell.defaultProps = {
}

function select(store, props) {
    return {
        userID: store.user.id,
        listID: store.list.currentList.listID,
    }
}

module.exports = connect(select)(PidgeyTaskCell);
