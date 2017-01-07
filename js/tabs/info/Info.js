var { Text } = require('PidgeyText');
var View = require('View');
var ListView = require('ListView');
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

    
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loadingNLP: false
        }
    }

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
                        this.setState({loadingNLP: true});

                        nlp.parse(this.state.text).then((result) => {
                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRows(result),
                                loadingNLP: false
                            });
                        })
                    }}
                >
                    <View style={styles.button}>
                        <Text>Hello {this.state.loadingNLP ? "Loading" : "NotLoading"}</Text>
                    </View>
                </TouchableHighlight>
                <ListView 
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text>{rowData.name}</Text>}
                />
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
