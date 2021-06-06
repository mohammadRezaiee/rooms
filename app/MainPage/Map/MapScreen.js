import React from 'react';
import {View, FlatList, StyleSheet, ScrollView} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import Geolocation from '@react-native-community/geolocation';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {connect} from 'react-redux';
import axios from 'axios';

import Screen from '../../../components/Screen';
import Header from '../../../components/Header';
import ReserveCard from '../../../components/ReserveCard';
import colors from '../../../config/colors';
import ModalRooms from '../../../components/ModalRooms';
import ModalChooseDate from '../../../components/ModalCalendar';
import {setUnvisible, setVisible} from '../../../store/ui';
import CardHotel from '../../../components/CardHotelHorizontal';
import IconMarker from '../../../assets/icons/marker.png';
import {addLastWatcheCities} from '../../../store/user';
import {
  citySelected,
  hotelsRequested,
  filterHotelsBySearching,
} from '../../../store/hotles';

MapboxGL.setAccessToken(
  'sk.eyJ1IjoibW9oYW1tYWQtcmV6YSIsImEiOiJja2Y3ZXExOWowMW9xMnBvOXQ3MHN4ZjhhIn0.eIVB7ri_Jd5bH9ZnKK_xKg',
);
MapboxGL.setConnected(true);

const baseUrl = 'https://rasacamp.s3.us-east-2.amazonaws.com/Flight/';

class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalRoomVisible: false,
      modalChooseDate: false,
      visibleIndex: 0,
      featureCollection: {},
      Latitude: '',
      Longitude: '',
      cityID: 0,
      refreshList: false,
    };
  }

  componentDidMount() {
    if (this.props.hotels.length > 0)
      this.setState({
        cityID: this.props.hotels[0]['cityID'],
      });

    this.addFeatures();
    Geolocation.getCurrentPosition(info => {
      this.setState({
        Latitude: info.coords.latitude,
        Longitude: info.coords.longitude,
      });
    });

    if (
      this.props.city.cityLanitude !== null ||
      this.props.city.cityLanitude !== undefined
    ) {
      this.setState({
        Latitude: this.props.city.cityLanitude,
        Longitude: this.props.city.cityLongitude,
      });
    }
  }

  componentDidUpdate() {
    if (this.props.hotels.length > 0)
      if (this.props.hotels[0]['cityID'] !== this.state.cityID) {
        //alert(this.props.hotels[0]['cityID'] + '  ' + this.state.cityID);
        this.addFeatures();
        Geolocation.getCurrentPosition(info => {
          this.setState({
            Latitude: info.coords.latitude,
            Longitude: info.coords.longitude,
          });
        });
        if (
          this.props.city.cityLanitude === 0 ||
          this.props.city.cityLanitude === null ||
          this.props.cityLanitude === undefined
        )
          this.setState({
            Latitude: this.props.city.cityLanitude,
            Longitude: this.props.city.cityLongitude,
          });
        this.setState({cityID: this.props.city.cityID});
      }
  }

  toggleStateRoom(value) {
    this.setState({
      modalRoomVisible: !value,
    });
  }

  toggleStateCalendar(value) {
    this.setState({
      modalChooseDate: !value,
    });
  }

  onViewableItemsChanged = ({viewableItems, changed}) => {
    console.log('Visible items are', viewableItems[0].index);
    /*if (viewableItems[0].index > this.props.hotels.length - 1)
      this.setState({
        visibleIndex: 0,
      });
    else*/
    this.setState({
      visibleIndex: viewableItems[0].index,
    });
  };

  searchCity = () => {
    const city = this.props.allCities.find(
      item => item.cityName === this.props.searchField,
    );
    if (city !== undefined) {
      this.selectedCity(city);

      this.setState({
        city,
      });
    }
  };

  async selectedCity(city) {
    await axios
      .get('https://flight.rasahr.com/api/cities/hotels/' + city.cityID)
      .then(response => {
        this.props.hotelsRequested(response.data);
        this.props.addCities(city);
        this.props.citySelected(city);
        this.props.filterHotels();
        this.setState({
          refreshList: !this.state.refreshList,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
  };

  render() {
    return (
      <Screen>
        <Header
          title="نقشه"
          leftIcon={require('../../../assets/icons/listicon.png')}
          rightIcon={require('../../../assets/icons/back-dark_1.png')}
          onPressRightIcon={() => {
            this.props.navigation.goBack();
          }}
        />
        {this.displayAbsulotItems()}
        <View style={{flex: 1}}>
          <MapboxGL.MapView
            zoomLevel={13}
            // centerCoordinate={[51.422548, 35.732573]}
            showUserLocation={true}
            logoEnabled={false}
            attributionEnabled={false}
            style={styles.container}>
            <MapboxGL.Camera
              zoomLevel={13}
              animationMode={'flyTo'}
              animationDuration={3000}
              centerCoordinate={
                this.props.hotels.length > 0
                  ? [
                      this.props.hotels[
                        this.state.visibleIndex > this.props.hotels.length
                          ? 0
                          : this.state.visibleIndex
                      ]['hotelLanitude'],
                      this.props.hotels[
                        this.state.visibleIndex > this.props.hotels.length
                          ? 0
                          : this.state.visibleIndex
                      ]['hotelLongitude'],
                    ]
                  : [
                      this.props.city.cityLongitude,
                      this.props.city.cityLanitude,
                    ] // city coordinates or user coordinates
              }
              followUserLocation={this.props.followUser || false}
              followUserMode={'course'}
            />
            <MapboxGL.Images images={{IconMarker}} />
            <MapboxGL.ShapeSource
              id="exampleShapeSource"
              shape={this.state.featureCollection}>
              <MapboxGL.SymbolLayer
                id="exampleIconName"
                filter={true}
                style={mapStyles.icon}
              />
            </MapboxGL.ShapeSource>

            <MapboxGL.UserLocation showsUserHeadingIndicator={true} />
          </MapboxGL.MapView>
        </View>
        <View
          style={{
            position: 'absolute',
            zIndex: 0.5,
            width: '100%',
            bottom: responsiveHeight(13.9),
            alignSelf: 'center',
          }}>
          {!this.state.modalChooseDate && !this.state.modalRoomVisible && (
            <FlatList
              horizontal={true}
              /*getItemLayout={(data, index) => ({
                length: 290,
                offset: 290 * index,
                index,
              })}*/
              showsHorizontalScrollIndicator={false}
              initialScrollIndex={0}
              inverted={true}
              data={this.props.hotels}
              extraData={this.props}
              key={'map'}
              keyExtractor={item => item.room.roomID.toString()}
              onViewableItemsChanged={this.onViewableItemsChanged}
              viewabilityConfig={{
                itemVisiblePercentThreshold: 50,
              }}
              renderItem={({item}) => (
                <CardHotel
                  hotel={item.hotelName}
                  image={`${baseUrl}${item.room.roomImg}`}
                  price={item.room.price}
                  item={item}
                  comments={item.comments.length}
                  rate={item.rating}
                  itemID={item.room.roomID}
                  onPress={() =>
                    this.props.navigation.navigate('RoomBanerScreen', {
                      hotel: item,
                    })
                  }
                />
              )}
              contentContainerStyle={{
                paddingRight: 10,
              }}
              style={{width: '100%'}}
            />
          )}
        </View>

        {this.state.modalRoomVisible && (
          <ModalRooms
            isVisible={this.state.modalRoomVisible}
            onChangeVisible={() => {
              this.toggleStateRoom(this.state.modalRoomVisible);
              this.props.setVisible();
            }}
          />
        )}
        {this.state.modalChooseDate && (
          <ModalChooseDate
            isVisible={this.state.modalChooseDate}
            onChangeVisible={() => {
              this.toggleStateCalendar(this.state.modalChooseDate);
              this.props.setVisible();
            }}
          />
        )}
      </Screen>
    );
  }

  displayAbsulotItems = () => {
    if (this.state.modalRoomVisible || this.state.modalChooseDate) return null;
    else {
      return (
        <View
          style={{
            position: 'absolute',
            zIndex: 0.5,
            width: '94.66%',
            top: responsiveHeight(10.5),
            alignSelf: 'center',
          }}>
          <ReserveCard
            value={this.props.hotel.searchField}
            style={{backgroundColor: colors.white}}
            inputColor={colors.lighterGray}
            onBlur={() => this.searchCity()}
            onPressLeft={() => {
              this.setState({
                modalRoomVisible: true,
              });
              this.props.setUnvisible();
            }}
            onPressRight={() => {
              this.setState({
                modalChooseDate: true,
              });
              this.props.setUnvisible();
            }}
          />
        </View>
      );
    }
  };

  addFeatures = () => {
    let temp = [];

    this.props.hotels.forEach(item =>
      temp.push({
        type: 'Feature',
        properties: {
          icon: 'IconMarker',
        },
        geometry: {
          type: 'Point',
          coordinates: [item['hotelLanitude'], item['hotelLongitude']],
        },
      }),
    );
    const obj = {
      type: 'FeatureCollection',
      features: temp,
    };
    this.setState({
      featureCollection: obj,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markerWraper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.purple,
  },
});

const mapStyles = {
  icon: {
    iconImage: 'IconMarker',
    iconRotationAlignment: 'map',
    iconAllowOverlap: true,
    iconSize: 0.4,
    textAllowOverlap: true,
    textColor: '#FFFFFF',
    textField: '',
    textFont: ['Dana-Bold'],
    textOffset: [0, 2.5],
    textAnchor: 'center',
    textMaxWidth: 50,
    textSize: 12,
    iconTextFit: 'both',
  },
};

const mapStateToProps = state => ({
  ui: state.ui.isVisibleTabBar,
  hotels: state.entities.hotels.filteredList,
  city: state.entities.hotels.city,
  hotel: state.entities.hotels,
  allCities: state.entities.hotels.allCities,
  searchField: state.entities.hotels.searchField,
});

const mapDispathToProps = dispatch => ({
  setUnvisible: () => dispatch(setUnvisible()),
  setVisible: () => dispatch(setVisible()),
  addCities: city => dispatch(addLastWatcheCities(city)),
  citySelected: city => dispatch(citySelected(city)),
  hotelsRequested: hotels => dispatch(hotelsRequested(hotels)),
  filterHotels: () => dispatch(filterHotelsBySearching()),
});

export default connect(
  mapStateToProps,
  mapDispathToProps,
)(MapScreen);
