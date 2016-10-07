const React = require('react-native')
const {StyleSheet} = React

let iconSize = 24;

const colours = {
  secondary: '#24CE84',
  darkGray: '#161616',
  lightGray: '#aaaaaa',
  white: '#fff',
  background: '#fff'
};

const fonts = {
    sans: 'MerriweatherSans-Light',
    serif: 'Merriweather-Light'
}

var styles = StyleSheet.create({
  taskContainer: {
      flex: 1,
      backgroundColor: colours.background,
      padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colours.background,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
        fontFamily: 'MerriweatherSans-Light',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,

        fontFamily: 'MerriweatherSans-Light',
  },
  icon: {
      height: iconSize,
      width: iconSize,
      borderRadius: iconSize/2,
      backgroundColor: colours.secondary
  }
})

module.exports = styles;
