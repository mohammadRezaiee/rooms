import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import axios from 'axios';

import Header from '../../components/Header';
import colors from '../../config/colors';
import Screen from '../../components/Screen';
import ReserveCard from '../../components/ReserveCard';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import Thumbnail from '../../components/Thumbnail';
import FullThumbnail from '../../components/FullThumbnail';
import AppMap from '../../components/AppMap';
import ModalRooms from '../../components/ModalRooms';
import ModalChooseDate from '../../components/ModalCalendar';
import {setUnvisible, setVisible} from '../../store/ui';
import {addLastWatcheCities} from '../../store/user';
import {
  hotelsRequested,
  citySelected,
  filterByDateAndCount,
  resetFilters,
} from '../../store/hotles';
import {resetMarkedDates, resetRooms} from '../../store/reserve';
import {setSearchField, allCities} from '../../store/hotles';

const baseUrl = 'https://rasacamp.s3.us-east-2.amazonaws.com/Flight/';

class MainPageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalRoomVisible: false,
      modalChooseDate: false,
      cities: [],
      popularDestination: [],
      citiesWorld: [],
    };
  }

  searchCity = () => {
    const city = this.props.allCities.find(
      item => item.cityName === this.props.searchField,
    );
    if (city !== undefined) {
      this.selectedCity(city);
      this.props.navigation.navigate('List');
    }
  };

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

  getAllCities = () => {
    return axios.get('https://flight.rasahr.com/api/cities');
  };

  getPopularCities = () => {
    return axios.get('https://flight.rasahr.com/api/cities/popular');
  };

  getCitiesWorld = () => {
    return axios.get('https://flight.rasahr.com/api/cities/world');
  };

  async selectedCity(city) {
    await axios
      .get('https://flight.rasahr.com/api/cities/hotels/' + city.cityID)
      .then(response => {
        this.props.hotelsRequested(response.data);
        this.props.addCities(city);
        this.props.citySelected(city);
        this.props.filterDateAndCount();
      })
      .catch(error => {
        console.log(error);
      });
  }

  async componentDidMount() {
    await Promise.all([
      this.getAllCities(),
      this.getPopularCities(),
      this.getCitiesWorld(),
    ]).then(response => {
      this.setState({
        cities: response[0].data,
        popularDestination: response[1].data,
        citiesWorld: response[2].data,
      });
      const listOfcities = [...response[0].data, ...response[2].data];
      this.props.listCities(listOfcities);
    });
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
  };

  render() {
    return (
      <Screen>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          <ImageBackground
            resizeMode="cover"
            source={require('../../assets/images/BackgroundImage.webp')}
            style={styles.image}>
            <Header
              title="اتاق"
              rightIcon={require('../../assets/icons/menu-light.png')}
              ImageBackground={colors.transparent}
              color={colors.white}
              onPressRightIcon={() => this.props.navigation.openDrawer()}
            />
            <View style={styles.imageContent}>
              <ReserveCard
                value={this.props.searchField}
                blurEffect={true}
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
                }}>
                <AppButton
                  title="جست‌وجوی هتل"
                  borderColor={colors.purple}
                  style={styles.button}
                  onPress={() => {
                    this.searchCity();
                  }}
                />
              </ReserveCard>
            </View>
          </ImageBackground>
          <View style={styles.thumbnailsContainer}>
            {this.props.lastCities.length > 0 && (
              <View style={{marginBottom: responsiveHeight(2.46)}}>
                <AppText style={styles.text}>آخرین جست‌وجو‌ها</AppText>
                <FlatList
                  data={this.props.lastCities}
                  extraData={this.props.lastCities}
                  keyExtractor={item => item.cityID.toString()}
                  inverted={true}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) => (
                    <Thumbnail
                      title={item.cityName}
                      image={`${baseUrl}${item.cityImgUrl}`}
                      coordinates={[item.cityLanitude, item.cityLongitude]}
                      onPress={() => {
                        this.props.resetMarkedDates();
                        this.props.resetRooms();
                        this.props.resetFilters();
                        this.props.addCities(item);
                        this.props.setSearchField(item.cityName);
                        this.props.citySelected(item);
                        this.selectedCity(item);
                        this.props.navigation.navigate('List');
                      }}
                    />
                  )}
                  contentContainerStyle={{
                    paddingRight: responsiveWidth(2.66), // 10
                    paddingLeft: 0,
                  }}
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                  }}
                />
              </View>
            )}
            <View>
              <AppText style={styles.text}>استان‌ها</AppText>
              <FlatList
                data={this.state.cities}
                keyExtractor={item => item.cityID.toString()}
                inverted={true}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <Thumbnail
                    title={item.cityName}
                    image={`${baseUrl}${item.cityImgUrl}`}
                    coordinates={[item.cityLanitude, item.cityLongitude]}
                    onPress={() => {
                      this.props.resetMarkedDates();
                      this.props.resetRooms();
                      this.props.resetFilters();
                      this.props.addCities(item);
                      this.props.setSearchField(item.cityName);
                      this.props.citySelected(item);
                      this.selectedCity(item);
                      this.props.navigation.navigate('List');
                    }}
                  />
                )}
                contentContainerStyle={{
                  paddingRight: responsiveWidth(2.66), // 10
                  paddingLeft: 0,
                }}
                style={{
                  width: '100%',
                  alignSelf: 'center',
                }}
              />
            </View>
            <View style={styles.fullThumbnail}>
              <AppText style={styles.text}>مقصدهای محبوب</AppText>
              <FlatList
                data={this.state.popularDestination}
                keyExtractor={item => item.cityID.toString()}
                inverted={true}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <FullThumbnail
                    title={item.cityName}
                    image={`${baseUrl}${item.cityImgUrl}`}
                    coordinates={[item.cityLanitude, item.cityLongitude]}
                    onPress={() => {
                      this.props.resetMarkedDates();
                      this.props.resetRooms();
                      this.props.resetFilters();
                      this.props.addCities(item);
                      this.props.setSearchField(item.cityName);
                      this.props.citySelected(item);
                      this.selectedCity(item);
                      this.props.navigation.navigate('List');
                    }}
                  />
                )}
                contentContainerStyle={{
                  paddingRight: responsiveWidth(2.66), //10
                  paddingLeft: 0,
                }}
                style={{
                  width: '100%',
                  alignSelf: 'center',
                }}
              />
            </View>
            <View
              style={{
                marginBottom: responsiveHeight(2.46),
              }}>
              <AppText style={styles.text}>دور دنیا با اتاق</AppText>
              <FlatList
                data={this.state.citiesWorld}
                keyExtractor={item => item.cityID.toString()}
                inverted={true}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <FullThumbnail
                    title={item.cityName}
                    image={`${baseUrl}${item.cityImgUrl}`}
                    coordinates={[item.cityLanitude, item.cityLongitude]}
                    onPress={() => {
                      this.props.resetMarkedDates();
                      this.props.resetRooms();
                      this.props.resetFilters();
                      this.props.addCities(item);
                      this.props.setSearchField(item.cityName);
                      this.props.citySelected(item);
                      this.selectedCity(item);
                      this.props.navigation.navigate('List');
                    }}
                  />
                )}
                contentContainerStyle={{
                  paddingRight: responsiveWidth(2.66), //10
                  paddingLeft: 0,
                }}
                style={{
                  width: '100%',
                  alignSelf: 'center',
                }}
              />
            </View>
          </View>
          <AppText style={styles.text}>هتل‌های نزدیک من</AppText>
          <View style={styles.mapContainer}>
            <AppMap followUser={true} />
          </View>
          <LinearGradient
            colors={['#f8f8f8', 'rgba(255, 255, 255, 0)']}
            style={styles.linearGradient}>
            <View style={{width: '100%', height: 80}} />
          </LinearGradient>
        </ScrollView>
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
}

const styles = StyleSheet.create({
  button: {
    marginTop: responsiveHeight(1.85), //15
    marginBottom: 0,
  },
  fullThumbnail: {
    marginVertical: responsiveHeight(2.46), //20
  },
  image: {
    width: '100%',
    height: 749,
  },
  imageContent: {
    flex: 1,
    marginTop: 130, // 130
    alignSelf: 'center',
    width: responsiveWidth(94.66), //paddingHorizontal: 10
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    bottom: 231,
  },
  mapContainer: {
    width: '100%',
    height: 311, // 311
  },
  scrollView: {
    flex: 1,
    height: '100%',
  },
  thumbnailsContainer: {
    top: -120,
    marginBottom: -120, //-100
  },
  text: {
    fontFamily: 'Dana-DemiBold',
    fontSize: responsiveFontSize(1.48), //12
    paddingRight: responsiveWidth(7.9), //30
    paddingBottom: responsiveHeight(0.62), //5
  },
});

const mapStateToProps = state => ({
  ui: state.ui.isVisibleTabBar,
  lastCities: state.entities.user.lastWatchCities,
  allCities: state.entities.hotels.allCities,
  searchField: state.entities.hotels.searchField,
});

const mapDispathToProps = dispatch => ({
  setUnvisible: () => dispatch(setUnvisible()),
  setVisible: () => dispatch(setVisible()),
  addCities: city => dispatch(addLastWatcheCities(city)),
  hotelsRequested: list => dispatch(hotelsRequested(list)),
  resetMarkedDates: () => dispatch(resetMarkedDates()),
  resetRooms: () => dispatch(resetRooms()),
  citySelected: city => dispatch(citySelected(city)),
  filterDateAndCount: () => dispatch(filterByDateAndCount()),
  setSearchField: input => dispatch(setSearchField(input)),
  listCities: list => dispatch(allCities(list)),
  resetFilters: () => dispatch(resetFilters()),
});

export default connect(
  mapStateToProps,
  mapDispathToProps,
)(MainPageScreen);
