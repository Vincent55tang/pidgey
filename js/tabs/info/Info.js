var { Text } = require('PidgeyText');
var View = require('View');
var PidgeyColors = require('PidgeyColors');
var React = require('React');
var StyleSheet = require('StyleSheet');

class Info extends React.Component {
    props: Props;
    state: State = {

    };

    render() {
        return (
            <View>
                <Text> Info Goes Here </Text>
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
    marginTop: 25,
    marginHorizontal: 20,
  },
});

module.exports = Info;
