var Navigator = require('Navigator');
var React = require('React');
var StyleSheet = require('StyleSheet');
var Dimensions = require('Dimensions');
var PidgeyNumber = require('PidgeyNumber');

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
                    <Text style={styles.taskTitle}>{this.props.selected.title}</Text>
                    <Text style={styles.taskDescription}>{this.props.selected.description}</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.emptyText}>Click a marker to view the task!</Text>
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
        height: SCREEN_HEIGHT / 3 - 45,
        width: SCREEN_WIDTH,
        padding: PidgeyNumber.defaultPadding,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 18
    },
    taskTitle: {
        fontSize: 24,
    },
    taskDescription: {

    }
})

module.exports = connect()(TaskMapViewDetails);
