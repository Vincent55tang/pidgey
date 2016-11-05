'use strict';

var PidgeyColors = require('PidgeyColors');
var Image = require('Image');
var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text } = require('PidgeyText');
var TouchableOpacity = require('TouchableOpacity');
var View = require('View');
var Alert = require('Alert');
var Dimensions = require('Dimensions');
var PidgeyNumber = require('PidgeyNumber');
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

class PidgeyListCell extends React.Component {
    props: Props;
    state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            isComplete: false,
            isEditing: false
        };
    }

    getCellColor() {
        return PidgeyColors.listProgress;
    }

    render() {
        return(
            <View style={[styles.container]}>
                <TouchableOpacity style={[this.props.style, styles.cell]} onPress={this.props.onPress}>
                    <Text>{this.props.title}</Text>
                    {this.props.children}
                </TouchableOpacity>
            </View>
        );
    }
}

const SCREEN_WIDTH = Dimensions.get('window').width;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: PidgeyNumber.defaultPadding,
        backgroundColor: 'white',
    },
    cell: {
        justifyContent: 'center',
        flex: 1,
        width: SCREEN_WIDTH * 0.8,
        marginRight: PidgeyNumber.defaultPadding,
        backgroundColor: PidgeyColors.listProgress,
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

module.exports = connect(select)(PidgeyListCell);
