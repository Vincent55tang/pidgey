'use strict';

var PidgeyColors = require('PidgeyColors');
var Image = require('Image');
var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text } = require('PidgeyText');
var PidgeyTouchable = require('PidgeyTouchable');
var View = require('View');

var { connect } = require('react-redux');

import type { Task } from '../../reducers/tasks';

class PidgeyTaskCell extends React.Component {
    props: {
        task: Task;
        onPress: ?() => void;
        style: any;
    };

    render() {
        var task = this.props.task;

        var cell =
            <View style={[styles.cell, this.props.style]}>
                <View style={styles.taskTitle}>
                    <Text style={styles.titleText}>
                        {task.title}
                    </Text>
                </View>
            </View>;

        if (this.props.onPress) {
            cell =
                <PidgeyTouchable onPress={this.props.onPress}>
                    {cell}
                </PidgeyTouchable>;
        }
        return cell;
    }
}

var styles = StyleSheet.create({
  cell: {
    paddingVertical: 15,
    paddingLeft: 17,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  titleSection: {
    paddingRight: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleAndDuration: {
    justifyContent: 'center',
  },
  titleText: {
    flex: 1,
    fontSize: 17,
    lineHeight: 24,
    color: PidgeyColors.darkText,
    marginBottom: 4,
    marginRight: 10,
  },
  duration: {
    fontSize: 12,
    color: PidgeyColors.lightText,
  },
  locationText: {
    fontSize: 12,
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
