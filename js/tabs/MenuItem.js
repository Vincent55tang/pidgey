var PidgeyColors = require('PidgeyColors');
var React = require('React');
var View = require('View');
var { Text } = require('PidgeyText');
var PidgeyTouchable = require('PidgeyTouchable');
var Image = require('Image');
var StyleSheet = require('StyleSheet');

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
        var icon = this.props.selected ? this.props.selectedIcon : this.props.icon;
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
                    <Image style={styles.icon} source={icon} />
                    <Text style={[styles.title, selectedTitleStyle]}>
                        {this.props.title}
                    </Text>
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
        paddingHorizontal: 20,
    },
    icon: {
        marginRight: 20,
    },
    title: {
        flex: 1,
        fontSize: 17,
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
});

module.exports = MenuItem;
