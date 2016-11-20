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
import { openDeleteListModal } from '../../actions';

type Props = {
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

    openDeleteModal(key) {
        console.log("_PIDGEYLISTCELL DELETE", key)
        this.props.dispatch(
            openDeleteListModal(key)
        );
    }

    render() {
        return(
            <View style={[styles.container]}>
                <View style={styles.deleteButton}>
                    <TouchableOpacity onPress={() => {this.openDeleteModal(this.props.listID)}}>
                        <Icon name="ios-trash-outline" size={25}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.cell}>
                    <TouchableOpacity onPress={this.props.onPress}>
                        <Text style={styles.titleText}>{this.props.title}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const SCREEN_WIDTH = Dimensions.get('window').width;

var styles = StyleSheet.create({
    container: {
        //flex: 1,
        //flexDirection: '',
        padding: PidgeyNumber.defaultPadding,
        marginVertical: PidgeyNumber.defaultPadding,
        justifyContent: 'center',
        alignItems: 'center',
        height: SCREEN_WIDTH*0.5,
        width: SCREEN_WIDTH*0.7,
            backgroundColor: '#f0f0f0',
    },
    cell: {
        flex: 1,
        paddingBottom: 25,
    },
    titleText: {
        fontSize: 20,
        color: PidgeyColors.darkText,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: "100",
        flex:1,
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
    deleteButton: {
        flex: 1,
        alignSelf: 'flex-end',
    }
});

function select(store, props) {
    return {

    }
}

module.exports = connect(select)(PidgeyListCell);
