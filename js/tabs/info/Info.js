var { Text } = require('PidgeyText');
var View = require('View');
var PidgeyColors = require('PidgeyColors');
var React = require('React');
var StyleSheet = require('StyleSheet');
var TextInput = require('TextInput');
var TouchableHighlight = require('TouchableHighlight');

var nlp = require('../../nlp/parser.js');

class Info extends React.Component {
    props: Props;
    state: State = {

    };

    render() {
        return (
            <View>
                <TextInput
                    style={styles.titleInput}
                    onChangeText={(text) => this.setState({text:text})}
                    value={this.state.text}
                    placeholder="type something here"
                    autoCapitalize='sentences'
                    autoCorrect={true}
                />
                <TouchableHighlight
                    onPress={() => {
                        this.setState({results: nlp.parse(this.state.text)})
                    }}
                >
                    <View style={styles.button}>
                        <Text>Generate Results</Text>
                    </View>
                </TouchableHighlight>
                <View>
                    <Text>
                        {this.state.results}
                    </Text>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  label: {
    fontSize: 15,
    color: PidgeyColors.lightText,
  },
  value: {
    fontSize: 15,
    color: '#002350',
  },
  button: {
    backgroundColor: '#b0b0b0'
  },
});

module.exports = Info;
