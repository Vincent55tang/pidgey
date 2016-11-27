var PidgeyColors = require('PidgeyColors');
var PidgeyNumber = require('PidgeyNumber');
var React = require('React');
var View = require('View');
var { Text } = require('PidgeyText');
var PidgeyTouchable = require('PidgeyTouchable');
var Image = require('Image');
var StyleSheet = require('StyleSheet');

import Icon from 'react-native-vector-icons/Ionicons';

class MenuItem extends React.Component {
    props: {
        icon: number;
        selectedIcon: number;
        selected: boolean;
        title: string;
        badge: ?string;
        onPress: () => void;
    };

    render() {
        //var icon = this.props.selected ? this.props.selectedIcon : this.props.icon;
        var selectedTitleStyle = this.props.selected && styles.selectedTitle;
        var badge;

        if (this.props.badge) {
            badge = (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                        {this.props.badge}
                    </Text>
                </View>
            );
        }

        return (
            <PidgeyTouchable onPress={this.props.onPress}>
                <View style={styles.container}>
                    <View style={styles.iconContainer}>
                        <Icon name={this.props.icon} size={30}/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={[styles.title, selectedTitleStyle]}>
                            {this.props.title}
                        </Text>
                    </View>
                    {badge}
                </View>
            </PidgeyTouchable>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    icon: {
        marginRight: 20,
    },
    title: {
        fontSize: 16,
        color: PidgeyColors.lightText,
    },
    selectedTitle: {
        color: PidgeyColors.darkText,
    },
    badge: {
        backgroundColor: '#DC3883',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 10,
    },
    badgeText: {
        fontSize: 12,
        color: 'white',
    },
    iconContainer: {
        flex: 0.1,
        justifyContent: 'center',
    },
    textContainer: {
        flex: 0.9,
        paddingHorizontal: PidgeyNumber.defaultPadding,
        justifyContent: 'center',
    }
});

module.exports = MenuItem;
