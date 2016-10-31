'use strict';

/**
 * @providesModule PidgeyNavigator
 */

var React = require('React');
var Platform = require('Platform');
var BackAndroid = require('BackAndroid');
var PidgeyTabsView = require('PidgeyTabsView');
var Navigator = require('Navigator');
var StyleSheet = require('StyleSheet');
var { connect } = require('react-redux');
var { switchTab } = require('./actions');

var PidgeyNavigator = React.createClass({
    _handlers: ([]: Array<() => boolean>),

    componentDidMount: function() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
    },

    componentWillUnmount: function() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
    },

    getChildContext() {
        return {
            addBackButtonListener: this.addBackButtonListener,
            removeBackButtonListener: this.removeBackButtonListener,
        };
    },

    addBackButtonListener: function(listener) {
        this._handlers.push(listener);
    },

    removeBackButtonListener: function(listener) {
        this._handlers = this._handlers.filter((handler) => handler !== listener);
    },

    handleBackButton: function() {
        for (let i = this._handlers.length - 1; i >= 0; i--) {
            if (this._handlers[i]()) {
                return true;
            }
        }

        const {navigator} = this.refs;
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }

        if (this.props.tab !== 'tasks') {
            this.props.dispatch(switchTab('tasks'));
            return true;
        }
        return false;
    },

    render: function() {
        return (
            <Navigator
                ref="navigator"
                style={styles.container}
                configureScene={(route) => {
                    return Navigator.SceneConfigs.FloatFromBottomAndroid;
                }}
                initialRoute={{}}
                renderScene={this.renderScene}
            />
        );
    },

    renderScene: function(route, navigator) {
        return <PidgeyTabsView navigator={navigator} />;
    },
});

PidgeyNavigator.childContextTypes = {
    addBackButtonListener: React.PropTypes.func,
    removeBackButtonListener: React.PropTypes.func,
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
});

function select(store) {
    return {
        tab: store.navigation.tab,
        isLoggedIn: store.user.isLoggedIn,
    };
}

module.exports = connect(select)(PidgeyNavigator);
