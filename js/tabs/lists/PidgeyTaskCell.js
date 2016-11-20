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

import { Checkbox } from 'react-native-material-design';


type Props = {
    title: string,
    location: object,
    style: any,
    navigator: Navigator,
    onCheck: func;
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
        var location;
        if (this.props.location !== undefined) {
            location = <Text style={styles.locationText}>
                {this.props.location.name}
            </Text>;
        }
        var cell =
            <View style={styles.container}>
                <View style={[styles.cell, this.props.style]}>
                    <View style={styles.checkboxContainer}>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>
                            {this.props.title}
                        </Text>
                        {location}
                    </View>
                    <TouchableOpacity
                        style={styles.editIcon}
                        onPress={()=> this.openEditModal()}>
                        <Icon name="ios-create-outline" size={30} />
                    </TouchableOpacity>
                </View>
            </View>;

        return cell;
    }

    openEditModal() {
        this.props.dispatch(
            openTaskModal({
                title: this.props.title,
                taskID: this.props.taskID,
                location: this.props.location
            }, false)
        );
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
      paddingVertical: 15,
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
      width: 30,
  },
  added: {
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 0,
    top: 0,
  },
  checkbox: {
      margin: 0,
      padding: 0,
  }
});


PidgeyTaskCell.defaultProps = {
    onCheck: () => {},
}

function select(store, props) {
    return {

    }
}

module.exports = connect(select)(PidgeyTaskCell);
