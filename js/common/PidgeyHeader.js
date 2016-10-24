/**
 * @providesModule PidgeyHeader
 */

'use strict';

var PidgeyColors = require('PidgeyColors');
var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text } = require('PidgeyText');
var TouchableOpacity = require('TouchableOpacity');
var View = require('View');
var Image = require('Image');
var ToolbarAndroid = require('ToolbarAndroid');

export type Foreground = 'light' | 'dark';

export type Layout =
    'default'
  | 'icon'
  | 'title';

export type Item = {
    title?: string;
    icon?: number;
    onPress?: () => void;
};

export type Props = {
    editable?: boolean;
    title?: string;
    rightItem?: Item;
    extraItems?: Array<Item>;
    foreground?: Foreground;
    style?: any;
    children?: any;
};

class PidgeyHeader extends React.Component {
    static height: number;
    props: Props;

    leftItem = {
        title: 'Menu',
        icon: require('./img/hamburger.png'),
        onPress: this.handleShowMenu,
    };

    render() {
        const { leftItem, rightItem, extraItems } = this.props;
        let actions = [];

        if(rightItem) {
            const { title, icon, layout } = rightItem;
            actions.push({
                icon: layout !== 'title' ? icon : undefined,
                title: title,
                show: 'always',
            });
        }
        if(extraItems) {
            actions = actions.concat(extraItems.map((item) => ({
                title: item.title,
                show: 'never',
            })));
        }

        let content;
        if (React.Children.count(this.props.children) > 0) {
            content = (
                <View collapsable={false} style={{flex: 1}}>
                    {this.props.children}
                </View>
            );
        }

        return (
                // <ToolbarAndroid
                //     navIcon={leftItem && leftItem.icon}
                //     onIconClicked={leftItem && leftItem.onPress}
                //     actions = {actions}
                //     onActionSelected = {this.handleActionSelected.bind(this)}
                //     style={styles.toolbar}>
                //     {content}
                //     <Text style={styles.titleText}>{this.props.title}</Text>
                // </ToolbarAndroid>
            <View style={[styles.toolbarContainer, this.props.style]}>
                <View style={styles.toolbar}>
                    <TouchableOpacity>
                        <Text style={styles.titleText}>
                            {this.props.title}
                        </Text>
                    </TouchableOpacity>
                    {content}
                </View>
            </View>
        );
    }

    handleActionSelected(position: number) {
        let items = this.props.extraItems || [];
        if(this.props.rightItem) {
            items = [thisprops.rightItem, ...items];
        }
        const item = items[position];
        item && item.onPress && item.onPress();
    }
}

var STATUS_BAR_HEIGHT = 25;
var HEADER_HEIGHT = 56 + STATUS_BAR_HEIGHT;

var styles = StyleSheet.create({
    toolbarContainer: {
        paddingTop: STATUS_BAR_HEIGHT,
    },
    toolbar: {
        //height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
        padding: 18,
    },
    header: {
        backgroundColor: '#3FB4CF',
        paddingTop: STATUS_BAR_HEIGHT,
        height: HEADER_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleText: {
        color: '#000000',
        fontSize: 18,
    },
    leftItem: {
        flex: 1,
        alignItems: 'flex-start',
    },
    rightItem: {
        flex: 1,
        alignItems: 'flex-end',
    },
    itemWrapper: {
        padding: 11,
    },
    itemText: {
        letterSpacing: 1,
        fontSize: 12,
        color: 'white',
    },
});

PidgeyHeader.height = HEADER_HEIGHT;

module.exports = PidgeyHeader;
