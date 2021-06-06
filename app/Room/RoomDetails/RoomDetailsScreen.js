import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {DrawerActions} from 'react-navigation-drawer';
import {connect} from 'react-redux';
import PN from 'persian-number';

import Screen from '../../../components/Screen';
import Header from '../../../components/Header';
import AppText from '../../../components/AppText';
import colors from '../../../config/colors';
import Rating from '../../../components/Rating';
import UserComment from '../../../components/UserComment';
import AppImage from '../../../components/AppImage';
import IconMarker from '../../../assets/icons/marker.png';
import {addLastWatched} from '../../../store/user';
//import {setVisible, setUnvisible} from '../../../store/ui';

MapboxGL.setAccessToken(
  'sk.eyJ1IjoibW9oYW1tYWQtcmV6YSIsImEiOiJja2Y3ZXExOWowMW9xMnBvOXQ3MHN4ZjhhIn0.eIVB7ri_Jd5bH9ZnKK_xKg',
);
MapboxGL.setConnected(true);

const baseUrl = 'https://rasacamp.s3.us-east-2.amazonaws.com/Flight/';

class RoomDetailsScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      //hotel: {},
      featureCollection: {},
      //gallery: [],
    };
  }

  componentDidMount() {
    this.props.navigation.getParam('hotel');
    /* this.setState({
      hotel: this.props.navigation.state.params.hotel,
    });*/
    this.addFeatures();
    this.props.addLastWatched(this.props.navigation.state.params.hotel);

    //this.props.setVisible();
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
  };

  render() {
    return (
      <Screen>
        <Header
          title="جزئیات"
          rightIcon={require('../../../assets/icons/menu-dark.png')}
          onPressRightIcon={() => {
            this.props.navigation.dispatch(DrawerActions.openDrawer());
          }}
          bottomBorder={true}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.descripton}>
            <AppText style={styles.title}>درباره محل اقامت</AppText>
            <AppText style={styles.descriptionText}>
              {PN.convertEnToPe(
                this.props.navigation.state.params.hotel.description,
              )}
            </AppText>
            <AppText style={styles.descriptionText}>
              {PN.convertEnToPe(
                'ظرفیت اتاق: ' +
                  this.props.navigation.state.params.hotel.room.capacity +
                  ' نفر ',
              )}
            </AppText>
            <Rating
              style={styles.rating}
              rating={this.props.navigation.state.params.hotel.scores}
              totalRating={this.props.navigation.state.params.hotel.rating}
            />
          </View>
          <View style={styles.container}>
            <AppText style={styles.title}>نظرات</AppText>
            {this.showComments()}
          </View>

          <View style={{marginTop: 4}}>
            <AppText style={[styles.title, {paddingRight: 20}]}>تصاویر</AppText>
            <FlatList
              data={this.props.navigation.state.params.hotel.room.gallery}
              horizontal={true}
              inverted={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => item[index].toString()}
              contentContainerStyle={{
                paddingRight: responsiveWidth(2.66), //10
              }}
              renderItem={({item}) => <AppImage image={`${baseUrl}${item}`} />}
            />
          </View>
          <View style={styles.mapContainer}>
            <MapboxGL.MapView
              zoomLevel={13}
              showUserLocation={true}
              style={styles.map}>
              <MapboxGL.Camera
                zoomLevel={13}
                animationMode={'flyTo'}
                animationDuration={2500}
                centerCoordinate={[
                  this.props.navigation.state.params.hotel['hotelLanitude'],
                  this.props.navigation.state.params.hotel['hotelLongitude'],
                ]}
                followUserLocation={this.props.followUser || false}
                followUserMode={'course'}
              />
              <MapboxGL.Images images={{IconMarker}} />
              <MapboxGL.ShapeSource
                id="exampleShapeSource"
                shape={this.state.featureCollection}>
                <MapboxGL.SymbolLayer
                  id="exampleIconName"
                  //filter={true}
                  style={mapStyles.icon}
                />
              </MapboxGL.ShapeSource>
              <MapboxGL.UserLocation showsUserHeadingIndicator={true} />
            </MapboxGL.MapView>
          </View>
          <LinearGradient
            colors={['#f8f8f8', 'rgba(255, 255, 255, 0)']}
            style={styles.linearGradient}>
            <View style={{width: '100%', height: 80}} />
          </LinearGradient>
        </ScrollView>
      </Screen>
    );
  }

  addFeatures = () => {
    const obj = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            icon: 'IconMarker',
          },
          geometry: {
            type: 'Point',
            coordinates: [
              this.props.navigation.state.params.hotel['hotelLanitude'],
              this.props.navigation.state.params.hotel['hotelLongitude'],
            ],
          },
        },
      ],
    };
    this.setState({
      featureCollection: obj,
    });
  };

  showComments = () => {
    if (this.props.navigation.state.params.hotel.comments.length > 0) {
      const lastComment =
        this.props.navigation.state.params.hotel.comments.length - 1;
      return (
        <>
          <UserComment
            user={
              this.props.navigation.state.params.hotel.comments[lastComment]
                .userName
            }
            comment={
              this.props.navigation.state.params.hotel.comments[lastComment]
                .review
            }
            score1={
              this.props.navigation.state.params.hotel.comments[lastComment]
                .scoreLocation
            }
            score2={
              this.props.navigation.state.params.hotel.comments[lastComment]
                .scoreCleaning
            }
            score3={
              this.props.navigation.state.params.hotel.comments[lastComment]
                .scoreService
            }
            score4={
              this.props.navigation.state.params.hotel.comments[lastComment]
                .scorePrice
            }
          />
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('ReviewScreen', {
                comments: this.props.navigation.state.params.hotel['comments'],
              })
            }>
            <AppText style={styles.moreText}>نظرات بیشتر</AppText>
          </TouchableOpacity>
        </>
      );
    } else {
      return (
        <View>
          <AppText style={styles.noComment}>نظری ثبت نشده است.</AppText>
        </View>
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    //paddingTop: , //30
    alignSelf: 'center',
    width: responsiveWidth(89.3), //paddingHorizontal: 20,
  },
  descripton: {
    paddingTop: responsiveHeight(3.7), //30
    marginRight: responsiveWidth(5.33), //20
    marginLeft: responsiveWidth(10.66), //40
  },
  descriptionText: {
    fontFamily: 'Dana-Regular',
    fontSize: responsiveFontSize(1.74), //14
    color: colors.darkerGray,
    marginBottom: responsiveHeight(3.94), //32
    marginTop: responsiveHeight(2.83), //23
  },
  title: {
    fontFamily: 'Dana-DemiBold',
    fontSize: responsiveFontSize(1.48), //12
  },
  moreText: {
    fontFamily: 'Dana-Medium',
    fontSize: responsiveFontSize(1.23), //10
    color: colors.purple,
    textAlign: 'left',
    marginLeft: responsiveWidth(2.13), //8
    marginTop: responsiveHeight(0.5), //4
  },
  noComment: {
    fontFamily: 'Dana-Regular',
    color: colors.darkGray,
    fontSize: responsiveFontSize(1.48), //12
    textAlign: 'center',
    marginVertical: responsiveHeight(2.83), //23
  },
  rating: {
    marginBottom: responsiveHeight(4.56), //37
  },
  mapContainer: {
    width: '100%',
    height: 311,
  },
  map: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    bottom: 231,
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
    //textField: '{blah}',
    textAnchor: 'center',
    // textAnchor: 'top',
    textMaxWidth: 50,
    textSize: 12,
    iconTextFit: 'both',
  },
};

/*const mapStateToProps = state => ({
  hotels: state.entities.hotels.filteredList,
});*/

const mapDispatchToProps = dispatch => ({
  addLastWatched: item => dispatch(addLastWatched(item)),
  //setVisible: () => dispatch(setVisible()),
  //setUnvisible: () => dispatch(setUnvisible()),
});

export default connect(
  null,
  mapDispatchToProps,
)(RoomDetailsScreen);
