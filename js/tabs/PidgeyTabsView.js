'use strict';

/**
 * @providesModule PidgeyTabsView
 */


// Include all Alternative App Pages

var PidgeyInfoView = require('PidgeyInfoView');
var PidgeyListView = require('PidgeyListView');
var PidgeyColors = require('PidgeyColors');
var React = require('React');
var Navigator = require('Navigator');
var PidgeyDrawerLayout = require('PidgeyDrawerLayout');
var View = require('View');
var StyleSheet = require('StyleSheet');
var TouchableOpacity = require('TouchableOpacity');
var Image = require('Image');
var { Text } = require('PidgeyText');
var MenuItem = require('./MenuItem');

// TODO
// var LogoutButton = require('../common/LogoutButton');
// var ProfilePicture = require('../common/ProfilePicture');

// var { logOutWithPrompt } = require('../actions');
var { switchTab } = require('../actions');
var { connect } = require('react-redux');

import type { Tab } from '../reducers/navigation';

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
        // if (this.props.user.isLoggedIn) {
        //     var name = this.props.user.name || '';
        //     accountItem = (
        //         <View>
        //             <TouchableOpacity onPress={}> // WHEN CLICKING NAME DO this
        //                 <ProfilePicture userId={this.props.user.id} size={80} />
        //             </TouchableOpacity>
        //             <Text style={styles.name}>
        //                 {name}
        //             </Text>
        //         </View>
        //     );
        // } else {
            accountItem = (
                <View>
                    <Image source={require('./img/logo.png')} />
                    <Text style={styles.name}>
                        Bridging Productivity and Places
                    </Text>
                </View>
            );
            // loginItem = (
            //     <View style={styles.loginPrompt}>
            //         <Text style={styles.loginText}>
            //             Log in With Google!
            //         </Text>
            //         <LoginButton source="Drawer" />
            //     </View>
            // );
            return (
                <View style={styles.drawer}>
                    <Image
                        style={styles.header}
                        source={require('./img/drawer-header.png')}>
                        {accountItem}
                    </Image>
                    <MenuItem
                        title="Tasks"
                        selected={this.props.tab === 'tasks'}
                        onPress={this.onTabSelect.bind(this, 'tasks')}
                        icon={require('./icons/list-icon.png')}
                        selectedIcon={require('./icons/list-icon-active.png')}
                    />
                    <MenuItem
                        title="About"
                        selected={this.props.tab === 'info'}
                        onPress={this.onTabSelect.bind(this, 'info')}
                        icon={require('./icons/info-icon.png')}
                        selectedIcon={require('./icons/info-icon-active.png')}
                    />

                </View>
            );
        //}
    }

    renderContent() {
        switch (this.props.tab) {
            case 'tasks':
                return(
                    <PidgeyListView
                        navigator={this.props.navigator}
                    />
                );

            case 'info':
                return <PidgeyInfoView navigator={this.props.navigator} />;

            case 'list':
                return(
                    <PidgeyListView
                        navigator={this.props.navigator}
                    />
                );
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
        // TODO: ADD WHEN USER IS IMPL
        // user: store.user
    };
}

function actions(dispatch) {
    return {
        onTabSelect: (tab) => dispatch(switchTab(tab))
        // logOut: () => dispatch(logOutWithPrompt()),
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
        fontSize: 12,
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
