import React from 'react';
import { connect } from 'react-redux';
import { Platform, StyleSheet, Dimensions } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
const { Marker } = MapView;
import { getGeocodedAddress } from '../store/potholes';
import axios from 'axios';
import ConfirmAddress from './ConfirmAddress';
import {Container, Content} from 'native-base'

const ScreenHeight = Dimensions.get('window').height;

//to figure out: how do I get only the closest potholes and report those back...
//make sure you do not submit this and change EVERYTHING BACK; your previous pullRequest needs to happen first

const dummyData = [
  { latitude: 41.895, longitude: -87.63903 },
  { latitude: 41.89526, longitude: -87.639 },
  { latitude: 41.895265, longitude: -87.63902 },
  { latitude: 41.89525, longitude: -87.63905 },
];

class AddPotholeLocation extends React.Component {
  constructor() {
    super();
    this.state = {
      errorMessage: null,
      initialRegion: {
        latitude: 41.895266,
        longitude: -87.639035,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      region: {},
    };
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'This is not going to work',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    let { latitude, longitude } = location.coords;
    const initialRegion = {
      latitude,
      longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.001,
    };
    this.setState({ initialRegion }, () => {
      this.props.geocodeLocation(
        this.state.initialRegion.latitude,
        this.state.initialRegion.longitude
      );
    });
  };

  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.initialRegion) {
      text = JSON.stringify(this.state.initialRegion);
    }
    return (
      <MapView
        style={styles.map}
        region={this.state.initialRegion}
        provider={MapView.PROVIDER_GOOGLE}
      >
        {dummyData.map(marker => {
          return (
            <Marker
              key={marker.latitude}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title="dummymarker"
              description="dummymarker"
              image="https://s3.us-east-2.amazonaws.com/soundandcolor/poo.png"
            />
          );
        })}
        <Marker
          draggable
          coordinate={this.state.x}
          onDragEnd={e =>
            this.setState({
              x: e.nativeEvent.coordinate,
            })
          }
          coordinate={{
            latitude: this.state.initialRegion.latitude,
            longitude: this.state.initialRegion.longitude,
          }}
          title={text}
        />

      <ConfirmAddress address={this.props.address} />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: ScreenHeight / 1.75,
    borderWidth: 2
  },
});

const mapStateToProps = state => {
  return {
    localPotholes: state.potholes.localPotholes,
    address: state.potholes.address,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLocalPotholes: (lat, lon, latDelt, lonDelt) =>
      dispatch(fetchLocalPotholes(lat, lon, latDelt, lonDelt)),
    geocodeLocation: (lat, lon) => dispatch(getGeocodedAddress(lat, lon)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPotholeLocation);
