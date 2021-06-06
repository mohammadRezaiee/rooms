import React from 'react';
import {Image, StyleSheet, View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import axios from 'axios';

import Screen from '../../../components/Screen';
import Header from '../../../components/Header';
import ReserveCard from '../../../components/ReserveCard';
import colors from '../../../config/colors';
import AppButton from '../../../components/AppButton';
import AppText from '../../../components/AppText';
import CardHotelVertical from '../../../components/CardHotelVertical';
import ModalArrange from '../../../components/ModalArrange';
import ModalRooms from '../../../components/ModalRooms';
import ModalChooseDate from '../../../components/ModalCalendar';
import {setUnvisible, setVisible} from '../../../store/ui';
import {addLastWatcheCities} from '../../../store/user';
import {
  citySelected,
  hotelsRequested,
  filterHotelsBySearching,
} from '../../../store/hotles';

const baseUrl = 'https://rasacamp.s3.us-east-2.amazonaws.com/Flight/';

class SearchResult extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalRoomVisible: false,
      modalChooseDate: false,
      modalArrangeVisible: false,
    };
  }

  render() {
    return (
      <>
        <Screen>
          <Header
            title="لیست"
            rightIcon={require('../../../assets/icons/back-dark_1.png')}
            leftIcon={require('../../../assets/icons/map.png')}
            onPressLeftIcon={() => this.props.navigation.navigate('Map')}
            onPressRightIcon={() => this.props.navigation.navigate('MainPage')}
          />
          <View style={styles.container}>
            <ReserveCard
              value={this.props.searchField}
              onBlur={() => this.searchCity()}
              shadowCard={true}
              style={styles.reserveCard}
              inputColor={colors.lighterGray}
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
              <View style={styles.buttonContainer}>
                <AppButton
                  style={styles.button}
                  title="فیلترها"
                  titleStyle={styles.buttonText}
                  backgroundColor={colors.lighterGray}
                  color={colors.purple}
                  icon={require('../../../assets/icons/filters.png')}
                  iconSize={24}
                  onPress={() => this.props.navigation.navigate('Filter')}
                />
                <AppButton
                  style={styles.button}
                  title="چیدمان"
                  titleStyle={styles.buttonText}
                  backgroundColor={colors.lighterGray}
                  color={colors.purple}
                  icon={require('../../../assets/icons/arrange.png')}
                  iconSize={24}
                  onPress={() => {
                    this.setState({
                      modalArrangeVisible: true,
                    });
                    this.props.setUnvisible();
                  }}
                />
              </View>
            </ReserveCard>
          </View>
          {this.toggleDisplay()}
        </Screen>
        {this.state.modalArrangeVisible && (
          <ModalArrange
            isVisible={this.state.modalArrangeVisible}
            onChangeVisible={() => {
              this.toggleStateArrange(this.state.modalArrangeVisible);
              this.props.setVisible();
            }}
          />
        )}
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
      </>
    );
  }

  searchCity = () => {
    console.log('in searchCity in searchResult');
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
      })
      .catch(error => {
        console.log(error);
      });
  }

  toggleDisplay = () => {
    if (this.props.filteredList.length === 0) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            resizeMode="center"
            source={require('../../../assets/icons/ticket-unlock.png')}
            style={styles.image}
          />
          <AppText style={styles.title}>موردی یافت نشد!</AppText>
          <AppText style={styles.subtitle}>
            بیا گزینه‌های دیگه رو امتحان کنیم.
          </AppText>
        </View>
      );
    } else {
      return (
        <FlatList
          data={this.props.filteredList}
          extraData={this.props.filteredList}
          keyExtractor={item => item.room.roomID.toString()}
          showsVerticalScrollIndicator={false}
          initialNumToRender={4}
          contentContainerStyle={{
            paddingBottom: responsiveHeight(11.1), //90
            paddingTop: responsiveHeight(3.25), //25
            paddingHorizontal: responsiveWidth(2.67), //10
          }}
          renderItem={({item}) => (
            <CardHotelVertical
              hotel={item.hotelName}
              price={item.room.price}
              stars={item.stars}
              image={`${baseUrl}${item.room.roomImg}`}
              comments={item.comments.length}
              rate={item.rating}
              item={item}
              id={item.room.roomID} // item.id
              onPress={() => {
                this.props.navigation.navigate('RoomBanerScreen', {
                  hotel: item,
                });
              }}
            />
          )}
        />
      );
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

  toggleStateArrange = value => {
    this.setState({
      modalArrangeVisible: !value,
    });
  };
}

const styles = StyleSheet.create({
  button: {
    width: '49%', //%49
    marginVertical: 0,
    paddingVertical: responsiveHeight(1.85), //15
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: responsiveHeight(1.25), //10
  },
  buttonText: {
    fontFamily: 'Dana-DemiBold',
  },
  container: {
    paddingTop: responsiveHeight(1.25), //10
    alignSelf: 'center',
    width: responsiveWidth(94.66), //paddingHorizontal: 10,
  },
  reserveCard: {
    backgroundColor: colors.white,
    marginBottom: responsiveHeight(0.62), //5
  },
  image: {
    width: '100%',
    height: '25%',
    marginBottom: responsiveHeight(2.46), //20
  },
  subtitle: {
    fontFamily: 'Dana-Regular',
    fontSize: responsiveFontSize(1.74), //14
    color: colors.darkGray,
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Dana-Bold',
    fontSize: responsiveFontSize(1.97), //16
    marginBottom: responsiveHeight(1.25), // 10
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  //ui: state.ui.isVisibleTabBar,
  filteredList: state.entities.hotels.filteredList,
  allCities: state.entities.hotels.allCities,
  searchField: state.entities.hotels.searchField,
});

const mapDispatchToProps = dispatch => ({
  setVisible: () => dispatch(setVisible()),
  setUnvisible: () => dispatch(setUnvisible()),
  addCities: city => dispatch(addLastWatcheCities(city)),
  citySelected: city => dispatch(citySelected(city)),
  hotelsRequested: hotels => dispatch(hotelsRequested(hotels)),
  filterHotels: () => dispatch(filterHotelsBySearching()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResult);
