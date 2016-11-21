// FORKED FROM https://github.com/FaridSafi/react-native-google-places-autocomplete

import React, { PropTypes } from 'react';
import { TextInput, View, ListView, ScrollView, Image, Text, Dimensions, TouchableHighlight, TouchableWithoutFeedback, Platform, ActivityIndicator, PixelRatio, TouchableOpacity } from 'react-native';
import Qs from 'qs';

var PidgeyColors = require('PidgeyColors');
var MapView = require('react-native-maps');

import Icon from 'react-native-vector-icons/Ionicons';

const WINDOW = Dimensions.get('window');

const DEFAULT_LAT_DELTA = 0.01;
const DEFAULT_LONG_DELTA = 0.01;

const defaultStyles = {
  container: {
    flex: 1,
  },
  textInputContainer: {
    backgroundColor: '#C9C9CE',
    height: 44,
    borderTopColor: '#7e7e7e',
    borderTopWidth: 0,
    borderBottomColor: '#b5b5b5',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  textInput: {
    backgroundColor: '#FFFFFF'
  },
  listView: {
    flex: 0.5,
    flexDirection: 'column',
  },
  row: {
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    height: 1/PixelRatio.get(),
    backgroundColor: '#c8c7cc',
  },
  description: {
      fontSize: 13,
  },
  loader: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
  androidLoader: {
    marginRight: -15,
  },
  poweredContainer: {
      paddingVertical: 10,
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
  },
  powered: {
      height: 15,
      padding: 0,
      margin: 0,
      alignItems: 'flex-end',
  },
  map: {
      flex: 1,
  },
  mapContainer:{
      flexDirection: 'row',
      flex: 1,
  },
  listContainer: {
      flex: .5,
      flexDirection: 'column',
      justifyContent: 'flex-start',
  }
};

const GooglePlacesAutocomplete = React.createClass({

  propTypes: {
    placeholder: React.PropTypes.string,
    placeholderTextColor: React.PropTypes.string,
    onPress: React.PropTypes.func,
    minLength: React.PropTypes.number,
    fetchDetails: React.PropTypes.bool,
    autoFocus: React.PropTypes.bool,
    getDefaultValue: React.PropTypes.func,
    timeout: React.PropTypes.number,
    onTimeout: React.PropTypes.func,
    query: React.PropTypes.object,
    GoogleReverseGeocodingQuery: React.PropTypes.object,
    GooglePlacesSearchQuery: React.PropTypes.object,
    styles: React.PropTypes.object,
    textInputProps: React.PropTypes.object,
    enablePoweredByContainer: React.PropTypes.bool,
    predefinedPlaces: React.PropTypes.array,
    currentLocation: React.PropTypes.bool,
    currentLocationLabel: React.PropTypes.string,
    nearbyPlacesAPI: React.PropTypes.string,
    filterReverseGeocodingByTypes: React.PropTypes.array,
    predefinedPlacesAlwaysVisible: React.PropTypes.bool,
    enableEmptySections: React.PropTypes.bool,
    renderDescription: React.PropTypes.func,
    renderRow: React.PropTypes.func,
    clearData: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      placeholder: 'Search',
      placeholderTextColor: '#A8A8A8',
      onPress: () => {},
      minLength: 4,
      fetchDetails: false,
      autoFocus: false,
      getDefaultValue: () => '',
      timeout: 20000,
      onTimeout: () => console.warn('google places autocomplete: request timeout'),
      query: {
        key: 'missing api key',
        language: 'en',
        types: 'geocode',
      },
      GoogleReverseGeocodingQuery: {
      },
      GooglePlacesSearchQuery: {
        rankby: 'distance',
        types: 'food',
      },
      styles: {
      },
      textInputProps: {},
      enablePoweredByContainer: true,
      predefinedPlaces: [],
      currentLocation: false,
      currentLocationLabel: 'Current location',
      nearbyPlacesAPI: 'GooglePlacesSearch',
      filterReverseGeocodingByTypes: [],
      predefinedPlacesAlwaysVisible: false,
      enableEmptySections: true,
      listViewDisplayed: 'auto',
      showMap: false
    };
  },

  getInitialState() {
    const ds = new ListView.DataSource({rowHasChanged: function rowHasChanged(r1, r2) {
      if (typeof r1.isLoading !== 'undefined') {
        return true;
      }
      return r1 !== r2;
    }});
    return {
      text: this.props.getDefaultValue(),
      dataSource: ds.cloneWithRows(this.buildRowsFromResults([])),
      listViewDisplayed: this.props.listViewDisplayed === 'auto' ? false : this.props.listViewDisplayed,
      focus: false,
    };
  },

  setAddressText(address) {
    this.setState({ text: address })
  },

  buildRowsFromResults(results) {
    var res = null;

    if (results.length === 0 || this.props.predefinedPlacesAlwaysVisible === true) {
      res = [...this.props.predefinedPlaces];
      if (this.props.currentLocation === true) {
        res.unshift({
          description: this.props.currentLocationLabel,
          isCurrentLocation: true,
        });
      }
    } else {
      res = [];
    }

    res = res.map(function(place) {
      return {
        ...place,
        isPredefinedPlace: true,
      }
    });

    return [...res, ...results];
  },

  componentWillMount() {
      console.log("componentWillMount", this.props.location);
      if(this.props.location.lat != undefined) {
          this.setState({
              description: this.props.location.description,
              latitude: this.props.location.lat,
              longitude: this.props.location.long,
              main: this.props.location.name,
              subtitle: this.props.location.subtitle,
              isEditing: false,
              displayMap: true,
          })
      } else {
          this.setState({
              description: "",
              latitude: undefined,
              longitude: undefined,
              main: '',
              isEditing: true,
              subtitle: '',
              displayMap: false,
          })
      }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.listViewDisplayed !== 'auto') {
      this.setState({
        listViewDisplayed: nextProps.listViewDisplayed,
      });
    }
    if(nextProps.location) {    }

    const {focus} = nextProps;
    focus && this.focus();
  },

  componentWillUnmount() {
    this._abortRequests();
  },

  _abortRequests() {
    for (let i = 0; i < this._requests.length; i++) {
      this._requests[i].abort();
    }
    this._requests = [];
  },

  /**
   * This method is exposed to parent components to focus on textInput manually.
   * @public
   */
  triggerFocus() {
    if (this.refs.textInput) this.refs.textInput.focus();
  },

  /**
   * This method is exposed to parent components to blur textInput manually.
   * @public
   */
  triggerBlur() {
    if (this.refs.textInput) this.refs.textInput.blur();
  },

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this._requestNearby(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        this._disableRowLoaders();
        alert(error.message);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  },

  _enableRowLoader(rowData) {
    let rows = this.buildRowsFromResults(this._results);
    for (let i = 0; i < rows.length; i++) {
      if ((rows[i].place_id === rowData.place_id) || (rows[i].isCurrentLocation === true && rowData.isCurrentLocation === true)) {
        rows[i].isLoading = true;
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(rows),
        });
        break;
      }
    }
  },
  _disableRowLoaders() {
    if (this.isMounted()) {
      for (let i = 0; i < this._results.length; i++) {
        if (this._results[i].isLoading === true) {
          this._results[i].isLoading = false;
        }
      }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.buildRowsFromResults(this._results)),
      });
    }
  },

  setTextDisplay(rowData, details) {
      this.setState({
          main: rowData.structured_formatting.main_text,
          subtitle: rowData.structured_formatting.secondary_text,
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          text: rowData.description,
          isEditing: false,
          displayMap: true,
      });
  },

  _onPress(rowData) {
    if (rowData.isPredefinedPlace !== true && this.props.fetchDetails === true) {
      if (rowData.isLoading === true) {
        // already requesting
        return;
      }

      this._abortRequests();

      // display loader
      this._enableRowLoader(rowData);

      // fetch details
      const request = new XMLHttpRequest();
      this._requests.push(request);
      request.timeout = this.props.timeout;
      request.ontimeout = this.props.onTimeout;
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText);
          if (responseJSON.status === 'OK') {
            if (this.isMounted()) {
              const details = responseJSON.result;
              this._disableRowLoaders();
              this._onBlur();

              this.setTextDisplay(rowData, details);

              delete rowData.isLoading;
              this.props.onPress(rowData, details);
            }
          } else {
            this._disableRowLoaders();
            console.warn('google places autocomplete: ' + responseJSON.status);
          }
        } else {
          this._disableRowLoaders();
          console.warn('google places autocomplete: request could not be completed or has been aborted');
        }
      };
      request.open('GET', 'https://maps.googleapis.com/maps/api/place/details/json?' + Qs.stringify({
        key: this.props.query.key,
        placeid: rowData.place_id,
        language: this.props.query.language,
      }));
      request.send();
    } else if (rowData.isCurrentLocation === true) {

      // display loader
      this._enableRowLoader(rowData);

      this.setTextDisplay(rowData, details);

      this.triggerBlur(); // hide keyboard but not the results

      delete rowData.isLoading;

      this.getCurrentLocation();

    } else {
      this.setTextDisplay(rowData, details);

      this._onBlur();

      delete rowData.isLoading;

      let predefinedPlace = this._getPredefinedPlace(rowData);

      // sending predefinedPlace as details for predefined places
      this.props.onPress(predefinedPlace, predefinedPlace);
    }
  },

  _results: [],
  _requests: [],
  _textInput: null,

  _getPredefinedPlace(rowData) {
    if (rowData.isPredefinedPlace !== true) {
      return rowData;
    }
    for (let i = 0; i < this.props.predefinedPlaces.length; i++) {
      if (this.props.predefinedPlaces[i].description === rowData.description) {
        return this.props.predefinedPlaces[i];
      }
    }
    return rowData;
  },

  _filterResultsByTypes(responseJSON, types) {
    if (types.length === 0) return responseJSON.results;

    var results = [];
    for (let i = 0; i < responseJSON.results.length; i++) {
      let found = false;
      for (let j = 0; j < types.length; j++) {
        if (responseJSON.results[i].types.indexOf(types[j]) !== -1) {
          found = true;
          break;
        }
      }
      if (found === true) {
        results.push(responseJSON.results[i]);
      }
    }
    return results;
  },

  _requestNearby(latitude, longitude) {
    this._abortRequests();
    if (latitude !== undefined && longitude !== undefined && latitude !== null && longitude !== null) {
      const request = new XMLHttpRequest();
      this._requests.push(request);
      request.timeout = this.props.timeout;
      request.ontimeout = this.props.onTimeout;
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText);

          this._disableRowLoaders();

          if (typeof responseJSON.results !== 'undefined') {
            if (this.isMounted()) {
              var results = [];
              if (this.props.nearbyPlacesAPI === 'GoogleReverseGeocoding') {
                results = this._filterResultsByTypes(responseJSON, this.props.filterReverseGeocodingByTypes);
              } else {
                results = responseJSON.results;
              }

              this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.buildRowsFromResults(results)),
              });
            }
          }
          if (typeof responseJSON.error_message !== 'undefined') {
            console.warn('google places autocomplete: ' + responseJSON.error_message);
          }
        } else {
          // console.warn("google places autocomplete: request could not be completed or has been aborted");
        }
      };

      let url = '';
      if (this.props.nearbyPlacesAPI === 'GoogleReverseGeocoding') {
        // your key must be allowed to use Google Maps Geocoding API
        url = 'https://maps.googleapis.com/maps/api/geocode/json?' + Qs.stringify({
          latlng: latitude+','+longitude,
          key: this.props.query.key,
          ...this.props.GoogleReverseGeocodingQuery,
        });
      } else {
        url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + Qs.stringify({
          location: latitude+','+longitude,
          key: this.props.query.key,
          ...this.props.GooglePlacesSearchQuery,
        });
      }

      request.open('GET', url);
      request.send();
    } else {
      this._results = [];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.buildRowsFromResults([])),
      });
    }
  },

  _request(text) {
    this._abortRequests();
    if (text.length >= this.props.minLength) {
      const request = new XMLHttpRequest();
      this._requests.push(request);
      request.timeout = this.props.timeout;
      request.ontimeout = this.props.onTimeout;
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText);
          if (typeof responseJSON.predictions !== 'undefined') {
            if (this.isMounted()) {
              this._results = responseJSON.predictions;
              this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.buildRowsFromResults(responseJSON.predictions)),
              });
            }
          }
          if (typeof responseJSON.error_message !== 'undefined') {
            console.warn('google places autocomplete: ' + responseJSON.error_message);
          }
        } else {
          // console.warn("google places autocomplete: request could not be completed or has been aborted");
        }
      };
      request.open('GET', 'https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=' + encodeURIComponent(text) + '&' + Qs.stringify(this.props.query));
      request.send();
    } else {
      this._results = [];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.buildRowsFromResults([])),
      });
    }
  },

  _onChangeText(text) {
    this._request(text);
    this.setState({
      text: text,
      listViewDisplayed: true,
    });
  },

  _getRowLoader() {
    return (
      <ActivityIndicator
        animating={true}
        size="small"
      />
    );
  },

  _renderRowData(rowData) {
    if (this.props.renderRow) {
      return this.props.renderRow(rowData);
    }

    return (
      <Text style={[{flex: 1}, defaultStyles.description, this.props.styles.description, rowData.isPredefinedPlace ? this.props.styles.predefinedPlacesDescription : {}]}
        numberOfLines={1}
      >
        {this._renderDescription(rowData)}
      </Text>
    );
  },

  _renderDescription(rowData) {
    if (this.props.renderDescription) {
      return this.props.renderDescription(rowData);
    }

    return rowData.description || rowData.formatted_address || rowData.name;
  },

  _renderLoader(rowData) {
    if (rowData.isLoading === true) {
      return (
        <View
          style={[defaultStyles.loader, this.props.styles.loader]}
        >
          {this._getRowLoader()}
        </View>
      );
    }
    return null;
  },

  _renderRow(rowData = {}, sectionID, rowID) {
    return (
      <View style={defaultStyles.container}>
        <TouchableHighlight
          style={{ flex: 1 }}
          onPress={() => this._onPress(rowData)}
          underlayColor="#c8c7cc"
        >
          <View style={[defaultStyles.row, this.props.styles.row, rowData.isPredefinedPlace ? this.props.styles.specialItemRow : {}]}>
            {this._renderRowData(rowData)}
            {this._renderLoader(rowData)}
          </View>
        </TouchableHighlight>
      </View>
    );
  },

  _renderSeparator(sectionID, rowID) {
    return (
      <View
        key={ `${sectionID}-${rowID}` }
        style={[defaultStyles.separator, this.props.styles.separator]} />
    );
  },

  _onBlur() {
    this.triggerBlur();
    this.setState({listViewDisplayed: false});
  },

  _onFocus() {
    this.setState({
        listViewDisplayed: true,
        displayMap: false
    });
  },

  _getListView() {
    if (this.state.text !== ''  && this.state.listViewDisplayed === true) {
      return (
        <View style={defaultStyles.listContainer}>
            <ListView
              keyboardShouldPersistTaps={true}
              keyboardDismissMode="on-drag"
              style={[defaultStyles.listView, this.props.styles.listView]}
              dataSource={this.state.dataSource}
              renderSeparator={this._renderSeparator}
              automaticallyAdjustContentInsets={false}
              {...this.props}
              renderRow={this._renderRow}
            />
            <View
              style={[defaultStyles.poweredContainer, this.props.styles.poweredContainer]}
            >
              <Image
                style={[defaultStyles.powered, this.props.styles.powered]}
                resizeMode={Image.resizeMode.contain}
                source={require('./img/powered_by_google_on_white.png')}
              />
            </View>
        </View>
      );
    }
    return null;
  },

  displayTextInput() {
      this.setState({
          isEditing: true,
          focus: true,
          displayMap: true,
      });
  },

  clearTextInput() {
      this.setState({
          text: '',
          main: '',
          subtitle: '',
          isEditing: true,
          displayMap: false,
      });
      this.props.clearData();
  },

  renderSetLocation(userProps) {
      if(this.state.main && this.state.subtitle && !this.state.isEditing) {
          return (
              <View style={this.props.styles.setLocationContainer}>
                  <TouchableOpacity onPress={() => {
                      this.displayTextInput();
                      this.triggerFocus();
                  }}>
                      <Text style={this.props.styles.locationMain}>
                          {this.state.main}
                      </Text>
                      <Text style={this.props.styles.locationSecondary}>
                          {this.state.subtitle}
                      </Text>
                  </TouchableOpacity>
              </View>
        );
      }
      return null;
  },

  renderLocationInput(onChangeText, onFocus, userProps) {
      var textInput = <TextInput
                  { ...userProps }
                  ref={'textInput'}
                  autoFocus={this.state.autoFocus}
                  style={[defaultStyles.textInput, this.props.styles.textInput]}
                  onChangeText={onChangeText ? text => {this._onChangeText(text); onChangeText(text)} : this._onChangeText}
                  value={this.state.text}
                  placeholder={this.props.placeholder}
                  placeholderTextColor={this.props.placeholderTextColor}
                  onFocus={onFocus ? () => {this._onFocus(); onFocus()} : this._onFocus}
                  onEndEditing={() => this.setState({isEditing: false})}
                  clearButtonMode="while-editing"
                  focus={this.state.focus}
                />;
      if(this.state.isEditing || !this.state.main) {
          return textInput;
      }
      return null;
  },


      getCoordinates(region) {
          if(this.state.latitude !== undefined && this.state.longitude !== undefined && this.state.displayMap) {
              console.log("_getCoordinates", region)
              return {
                  longitude: region.longitude,
                  latitude: region.latitude
              }
          }
      },


      getMapRegion() {
          if(this.state.latitude !== undefined && this.state.longitude !== undefined) {
              console.log('_getMapRegion', this.state);
              return {
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                  latitudeDelta: DEFAULT_LAT_DELTA,
                  longitudeDelta: DEFAULT_LONG_DELTA
              }
          }
      },

      renderMap() {
          if(this.state.displayMap && this.props.showMap) {
              var region = this.getMapRegion();
              var coords = this.getCoordinates(region);
              return (
                  <View style={defaultStyles.mapContainer}>
                      <MapView
                          style={defaultStyles.map}
                          region={region}
                          scrollEnabled={false}
                          zoomEnabled={false}
                          rotateEnabled={false}
                          pitchEnabled={false}
                      >
                          <MapView.Marker
                              coordinate={coords}
                          />
                      </MapView>
                  </View>
              );
          }
          return null;
      },

  render() {
    let { onChangeText, onFocus, ...userProps } = this.props.textInputProps;

    return (
      <View
        style={[defaultStyles.container, this.props.styles.container]}
      >
        <View
          style={[defaultStyles.textInputContainer, this.props.styles.textInputContainer]}
        >
        <Icon name="ios-pin-outline" size={30} style={this.props.styles.locationIcon}/>

            {this.renderLocationInput(onChangeText, onFocus, userProps)}
            {this.renderSetLocation(userProps)}

            <TouchableOpacity onPress={() => {
                this.clearTextInput();
            }}>
                <Icon name="ios-close-outline" size={30} style={this.props.styles.clearIcon}/>
            </TouchableOpacity>
        </View>
        {this.renderMap()}
        {this._getListView()}
      </View>
    );
  },
});


// this function is still present in the library to be retrocompatible with version < 1.1.0
const create = function create(options = {}) {
  return React.createClass({
    render() {
      return (
        <GooglePlacesAutocomplete ref="GooglePlacesAutocomplete"
          {...options}
        />
      );
    },
  });
};


module.exports = {GooglePlacesAutocomplete, create};
