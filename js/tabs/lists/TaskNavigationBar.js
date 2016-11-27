'use strict';

var PidgeyColors = require('PidgeyColors');
var PidgeyNumber = require('PidgeyNumber');
var React = require('React');
var StyleSheet = require('StyleSheet');
var View = require('View');
var Animated = require('Animated');
var Text = require('Text');
var TouchableOpacity = require('TouchableOpacity');

import Icon from 'react-native-vector-icons/Ionicons';

class TaskNavigationBar extends React.Component {
    props: {
        mapOnPress: func,
        listOnPress: func,
        addOnPress: func,
        showMap: bool,
        showList: bool,
        showAdd: bool,
    }

    static defaultProps = {
        mapOnPress: () => {console.log('map')},
        listOnPress: () => {console.log('list')},
        addOnPress: () => {console.log('add')},
        showMap: true,
        showList: true,
        showAdd: true,
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {
        var list = [];

        if(this.props.showList) {
            list = (
                <TouchableOpacity style={styles.listButtonContainer} onPress={this.props.listOnPress}>
                    <View>
                        <Icon name="ios-list-outline" size={30} style={styles.listIcon}/>
                    </View>
                </TouchableOpacity>
            )
        }

        var map = [];
        if(this.props.showMap) {
            map = (
                <TouchableOpacity style={styles.mapButtonContainer} onPress={this.props.mapOnPress}>
                    <View>
                        <Icon name="ios-map-outline" size={30} style={styles.mapIcon}/>
                    </View>
                </TouchableOpacity>
            )
        }

        var add = [];
        if(this.props.showAdd) {
            add = (
                <TouchableOpacity style={styles.addButtonContainer} onPress={this.props.addOnPress}>
                    <View>
                        <Icon name="ios-add-outline" size={30} style={styles.addIcon}/>
                    </View>
                </TouchableOpacity>
            )
        }
        return(
            <View style={styles.container}>
                {list}
                {map}
                {add}
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        height: 60,
        maxHeight: 60,
        flex: 1,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        marginTop: -1,
    },
    listButtonContainer: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapButtonContainer: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#f0f0f0',
    },
    addButtonContainer: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#f0f0f0',
        backgroundColor: PidgeyColors.gradientLight,
    }
});

module.exports = TaskNavigationBar;
