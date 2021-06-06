import React, {Component} from 'react';
import {View, StyleSheet, PermissionsAndroid, Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapboxGL from '@react-native-mapbox-gl/maps';

import IconMarker from '../assets/icons/marker.png';

MapboxGL.setAccessToken(
  'YOUR_TOKEN',
);
MapboxGL.setConnected(true);

const featureCollection = {
  type: 'FeatureCollection',
  features: [
    /*{
      type: 'Feature',
      properties: {
        icon: 'IconMarker',
      },
      geometry: {
        type: 'Point',
        coordinates: [51.356348, 35.792916],
      },
    },
    {
      type: 'Feature',
      properties: {
        icon: 'IconMarker',
      },
      geometry: {
        type: 'Point',
        coordinates: [51.413033, 35.790472],
      },
    },*/
  ],
};

export default class AppMap extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      location: [51.422548, 35.732573],
      userLanitude: '',
      userLongitude: '',
      status: false,
    };
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Example App',
            message: 'Example App access to your location ',
          },
        );
        this.setState({
          status: true,
        });
      } catch (err) {
        console.warn(err);
      }
    }

    Geolocation.getCurrentPosition(info =>
      this.setState({
        userLanitude: info.coords.latitude,
        userLongitude: info.coords.longitude,
      }),
    );
  }

  /*componentDidUpdate() {
    if (this.state.status === true) {
      this.setState({
        status: false,
      });
    }
  }*/

  render() {
    return (
      <View style={styles.container}>
        <MapboxGL.MapView
          zoomLevel={13}
          centerCoordinate={[51.422548, 35.732573]}
          showUserLocation={true}
          logoEnabled={false}
          attributionEnabled={false}
          style={styles.container}>
          <MapboxGL.Camera
            zoomLevel={13}
            animationMode={'flyTo'}
            animationDuration={6000}
            centerCoordinate={[51.356348, 35.792916]}
            followUserLocation={true}
            followUserMode={'course'}
          />

          <MapboxGL.UserLocation showsUserHeadingIndicator={true} />
          {this.props.children}
        </MapboxGL.MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/*const mapStyles = {
  icon: {
    iconImage: 'IconMarker',
    iconRotationAlignment: 'map',
    iconAllowOverlap: true,
    iconSize: 0.4,
    //textAllowOverlap: true,
    //textColor: '#FFFFFF',
    //textField: '',
    //textFont: ['Dana-Bold'],
    //textOffset: [0, 2.5],
    //textAllowOverlap: true,
    //textAnchor: 'center',
    //textMaxWidth: 50,
    //textSize: 12,
    //iconTextFit: 'both',
  },
};*/
