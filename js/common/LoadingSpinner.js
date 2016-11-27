/**
 * @providesModule LoadingSpinner
 */
'use strict';

var PidgeyColors = require('PidgeyColors');
var PidgeyNumber = require('PidgeyNumber');
var React = require('React');
var StyleSheet = require('StyleSheet');
var View = require('View');
var Animated = require('Animated');
var Text = require('Text')
import Icon from 'react-native-vector-icons/Ionicons';

class LoadingSpinner extends React.Component {
    props: {
    }

    static defaultProps: {
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this._animatedValue = new Animated.Value(0);
    }

    componentDidMount() {
        Animated.timing(this._animatedValue, {
            toValue: 100,
        }).start();
    }

    render() {
        var interpolatedRotateAnimation = this._animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: ['0deg', '360deg']
        });

        return(
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    loadingContainer: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    spinner: {
        color: PidgeyColors.gradientDark,
    }
});

module.exports = LoadingSpinner;
