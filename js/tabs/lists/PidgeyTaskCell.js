'use strict';

var PidgeyColors = require('PidgeyColors');
var Image = require('Image');
var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text } = require('PidgeyText');
var TouchableOpacity = require('TouchableOpacity');
var View = require('View');
var Alert = require('Alert');
import Icon from 'react-native-vector-icons/Ionicons';

var { connect } = require('react-redux');

import type { Task } from '../../reducers/tasks';
import { openTaskModal } from '../../actions';

type Props = {
    task: Task;
    style: any;
    navigator: Navigator;
}

type State = {
    isComplete: boolean;
    isEditing: boolean;
}

class PidgeyTaskCell extends React.Component {
    props: Props;
    state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            isComplete: false,
            isEditing: false
        };
    }

    render() {
        var task = this.props.task;

        var cell =
            <View style={styles.container}>
                <View style={[styles.cell, this.props.style]}>
                    <View style={styles.taskTitle}>
                        <Text style={styles.titleText}>
                            {task.title}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.editIcon}
                        onPress={()=> this.openEditModal()}>
                        <Icon name="md-create" size={30} />
                    </TouchableOpacity>
                </View>
            </View>;

        return cell;
    }

    openEditModal() {
        this.props.dispatch(openTaskModal(this.props.task));
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
  cell: {
    paddingVertical: 15,
    paddingLeft: 17,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flex: 1,
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 17,
    lineHeight: 24,
    color: PidgeyColors.darkText,
    marginBottom: 4,
    marginRight: 10,
  },
  editIcon: {
      width: 30
  },
  added: {
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 0,
    top: 0,
  },
});

function select(store, props) {
    return {

    }
}

module.exports = connect(select)(PidgeyTaskCell);
