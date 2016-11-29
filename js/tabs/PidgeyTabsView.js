'use strict';

/**
 * @providesModule PidgeyTabsView
 */


// Include all Alternative App Pages

import React, { Component, PropTypes } from 'react';
import { View, Navigator, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type { Tab } from '../reducers/navigation';

var LogoutButton = require('../common/LogoutButton');
var MenuItem = require('./MenuItem');
var MyListsView = require('./lists/MyListsView');
var PidgeyColors = require('PidgeyColors');
var PidgeyDrawerLayout = require('PidgeyDrawerLayout');
var PidgeyInfoView = require('PidgeyInfoView');
var PidgeyListView = require('PidgeyListView');
var ProfilePicture = require('../common/ProfilePicture');
var TaskMapView = require('./lists/TaskMapView')
var { Text } = require('PidgeyText');

var { switchTab } = require('../actions');
var { connect } = require('react-redux');

class PidgeyTabsView extends React.Component {
    props: {
        tab: Tab;
        onTabSelect: (tab: Tab) => void;
        navigator: Navigator;
    };

    constructor(props) {
        super(props);

        this.renderNavigationView = this.renderNavigationView.bind(this);
        this.openDrawer = this.openDrawer.bind(this);
    }

    getChildContext() {
        return {
            openDrawer: this.openDrawer
        };
    }

    openDrawer() {
        this.refs.drawer.openDrawer();
    }

    onTabSelect(tab: Tab) {
        if (this.props.tab !== tab) {
            this.props.onTabSelect(tab);
        }
        this.refs.drawer.closeDrawer();
    }

    renderNavigationView() {
        var accountItem
        var logoutItem
        if (this.props.user.isLoggedIn) {
            var name = this.props.user.name || '';
            accountItem = (
                <View>
                    <TouchableOpacity>
                        <ProfilePicture photo={this.props.user.photo} size={60} />
                    </TouchableOpacity>
                    <Text style={styles.name}>
                        Welcome {name}!
                    </Text>
                </View>
            );
            logoutItem = (
                 <View style={styles.loginPrompt}>
                     <LogoutButton source="Drawer" />
                 </View>
            );
        } else {
            accountItem = (
                <View>
                    <Image source={require('./img/logo.png')} />
                    <Text style={styles.name}>
                        Bridging Productivity and Places
                    </Text>
                </View>
            );
        }
            return (
                <View style={styles.drawer}>
                    <Image
                        style={styles.header}
                        source={require('./img/drawer-header.png')}>
                        {accountItem}
                    </Image>
                    <MenuItem
                        title="Lists"
                        selected={this.props.tab === 'myLists'}
                        onPress={this.onTabSelect.bind(this, 'myLists')}
                        icon={'ios-list-outline'}
                    />
                    <MenuItem
                        title="Tasks"
                        selected={this.props.tab === 'tasks'}
                        onPress={this.onTabSelect.bind(this, 'tasks')}
                        icon={'ios-checkmark-outline'}
                    />
                    <MenuItem
                        title="Map"
                        selected={this.props.tab === 'map'}
                        onPress={this.onTabSelect.bind(this, 'map')}
                        icon={'ios-map-outline'}
                    />
                    <MenuItem
                        title="About"
                        selected={this.props.tab === 'info'}
                        onPress={this.onTabSelect.bind(this, 'info')}
                        icon={'ios-information-outline'}
                    />
                    {logoutItem}
                </View>
            );
    }

    renderContent() {
        switch (this.props.tab) {
            case 'tasks':
                return <PidgeyListView navigator={this.props.navigator} />;
            case 'info':
                return <PidgeyInfoView navigator={this.props.navigator} />;
            case 'list':
                return <PidgeyListView navigator={this.props.navigator} />;
            case 'myLists':
                return <MyListsView navigator={this.props.navigator} />;
            case 'map':
                return <TaskMapView navigator={this.props.navigator} />;
            default:
                return <PidgeyInfoView navigator={this.props.navigator} />;
        }
        throw new Error(`Unknown tab ${this.props.tab}`);
    }

    render() {
        return (
            <PidgeyDrawerLayout
                ref="drawer"
                drawerWidth={290}
                drawerPosition="left"
                renderNavigationView={this.renderNavigationView}>
                <View style={styles.content} key={this.props.tab}>
                    {this.renderContent()}
                </View>
            </PidgeyDrawerLayout>
        );
    }
}

PidgeyTabsView.childContextTypes = {
    openDrawer: React.PropTypes.func,
};

function select(store) {
    return {
        tab: store.navigation.tab,
        taskView: store.navigation.taskView,
        user: store.user
    };
}

function actions(dispatch) {
    return {
        onTabSelect: (tab) => dispatch(switchTab(tab))
    };
}

var styles = StyleSheet.create({
    drawer: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
    },
    header: {
        padding: 20,
        justifyContent: 'flex-end',
    },
    name: {
        marginTop: 10,
        color: 'white',
        fontSize: 14,
    },
    loginPrompt: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 10,
    },
    loginText: {
        fontSize: 12,
        color: PidgeyColors.lightText,
        textAlign: 'center',
        marginBottom: 10,
    },
});

module.exports = connect(select, actions)(PidgeyTabsView);
