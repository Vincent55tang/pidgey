'use strict';

/**
 * @providesModule PidgeyCheckbox
 */

var PidgeyColors = require('PidgeyColors');
var PidgeyNumber = require('PidgeyNumber');
var React = require('React');
var StyleSheet = require('StyleSheet');
var View = require('View');
var TouchableOpacity = require('TouchableOpacity');

import CheckBox from 'react-native-check-box'
import Icon from 'react-native-vector-icons/Ionicons';


class PidgeyCheckbox extends React.Component {
    props: {
        size: number,
        checked: bool,
    }

    static defaultProps: {
        size: 25,
    }

    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.setState({
            checked: false
        })
    }

    render() {
        return(
            <View>
                    <CheckBox
                        style={styles.checkboxContainer}
                        onClick={this.props.onPress}
                        isChecked={this.props.checked}
                        checkedImage={<Icon name="ios-checkbox-outline" size={this.props.size}/>}
                        unCheckedImage={<Icon name="ios-square-outline" size={this.props.size}/>}
                    />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    checkboxContainer: {
        paddingHorizontal: PidgeyNumber.defaultPadding,
        paddingVertical: PidgeyNumber.defaultPadding,
        paddingLeft: 20,
    }
});

module.exports = PidgeyCheckbox;
