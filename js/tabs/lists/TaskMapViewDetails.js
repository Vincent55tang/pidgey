var Navigator = require('Navigator');
var React = require('React');
var StyleSheet = require('StyleSheet');
var Dimensions = require('Dimensions');

var View = require('View');
var Text = require('Text');
var { connect } = require('react-redux');

class TaskMapViewDetails extends React.Component {
    props: Props;
    state: State;

    constructor(props: Props) {
        super(props);
    }

    render() {
        if (this.props.selected) {
            return (
                <View style={styles.container}>
                    <Text> Title: {this.props.selected.title}</Text>
                    <Text> Place: {this.props.selected.description}</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.emptyText}> Tap on a marker to inspect it. </Text>
                </View>
            );
        }
    }
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        height: SCREEN_HEIGHT / 3,
        width: SCREEN_WIDTH,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 18
    }
})

module.exports = connect()(TaskMapViewDetails);
