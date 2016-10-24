'use strict';

/**
 * @providesModule PidgeyInfoView
 */

var React = require('React');
var ListContainer = require('ListContainer');
var PureListView = require('../../common/PureListView');
import { View, Text, StyleSheet } from 'react-native';

function PidgeyInfoView() {
    return (
        <ListContainer
            title="Information"
            backgroundImage={require('./img/info-background.png')}
            backgroundColor={'#47BFBF'}>
                <View>
                    <Text>Info Page</Text>
                </View>

        </ListContainer>
    )
}

var styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 50,
    backgroundColor: 'white',
},
  text: {
      color: 'black'
  }
});

module.exports = PidgeyInfoView;
