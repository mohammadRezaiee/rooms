import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import CardView from '../../../components/CardView';
import PN from 'persian-number';
import {connect} from 'react-redux';
import {DrawerActions} from 'react-navigation-drawer';
import {withNavigation} from 'react-navigation';

import colors from '../../../config/colors';
import Header from '../../../components/Header';
import AppButton from '../../../components/AppButton';
import AppText from '../../../components/AppText';
import AppIcon from '../../../components/AppIcon';
import FavoriteButton from '../../../components/FavoriteButton';
import Stars from '../../../components/Stars';
import {toggleFavorite} from '../../../store/user';
import {
  setVisible,
  setUnvisible,
  showHeader,
  setCurrentScreen,
} from '../../../store/ui';

const baseUrl = 'https://rasacamp.s3.us-east-2.amazonaws.com/Flight/';

class RoomBanerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotel: {},
      roomPrice: '',
    };
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
  };

  componentDidMount() {
    this.props.navigation.getParam('hotel');
    console.log(this.props.navigation.state.params.hotel);
    this.setState({
      hotel: this.props.navigation.state.params.hotel,
    });
    //this.props.setUnvisible();
  }
  render() {
    return (
      <ImageBackground
        resizeMode="cover"
        source={{
          uri: `${baseUrl}${this.props.navigation.state.params.hotel.hotelImg}`,
        }}
        style={styles.image}>
        <View style={styles.container}>
          <Header
            title="جزئیات"
            backgroundColor={colors.transparent}
            color={colors.white}
            rightIcon={require('../../../assets/icons/menu-light.png')}
            onPressRightIcon={() => {
              this.props.navigation.dispatch(DrawerActions.openDrawer());
            }}
          />

          <View style={styles.detailsContainer}>
            <CardView style={styles.card}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  alignSelf: 'center',
                  paddingTop: responsiveHeight(1.25), // 10
                  paddingBottom: responsiveHeight(3.7), //30
                  width: responsiveWidth(85.1), // paddingHorizontal: 3,
                }}>
                <View
                  style={{
                    alignItems: 'flex-start',
                  }}>
                  <View style={styles.wallet}>
                    <AppIcon
                      icon={require('../../../assets/icons/worthlessToman.png')}
                      width={24}
                      height={24}
                    />
                    <AppText style={styles.priceText}>
                      {PN.convertEnToPe(
                        PN.sliceNumber(
                          this.props.navigation.state.params.hotel.room.price,
                        ),
                      )}
                    </AppText>
                  </View>
                  <AppText
                    style={[styles.destinationText, {color: colors.darkGray}]}>
                    برای هر شب /
                  </AppText>
                </View>
                <AppText style={styles.hotelName}>
                  {this.props.navigation.state.params.hotel.hotelName}
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: responsiveHeight(1), //8
                  width: responsiveWidth(85.1), //paddingHorizontal: 8
                }}>
                <FavoriteButton
                  backgroundColor="rgba(50, 54, 67, 0.2)"
                  onPress={() => this.props.toggleFavorite(this.state.hotel)}
                  itemID={this.props.navigation.state.params.hotel.room.roomID}
                />
                <View style={{alignItems: 'flex-end'}}>
                  <Stars
                    counter={this.state.hotel.stars}
                    style={styles.stars}
                    sizeIcon={16}
                  />
                  <View style={styles.destination}>
                    <AppText style={styles.destinationText}>
                      {PN.convertEnToPe(8 + ' کیلومتر تا مقصد')}
                    </AppText>
                    <AppIcon
                      icon={require('../../../assets/icons/pin-purple.png')}
                      width={12}
                      height={12}
                    />
                  </View>
                </View>
              </View>
            </CardView>
            <View style={styles.buttonContainer}>
              <AppButton
                title="همین الان ثبت کن"
                borderColor={colors.purple}
                style={styles.button}
              />
            </View>
            <CardView style={styles.dropdown}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('RoomDetailScreen', {
                    hotel: this.state.hotel,
                  });
                  this.props.setCurrentScreen(
                    this.props.navigation.state.routeName,
                  );
                }}>
                <View style={styles.dropdownbutton}>
                  <AppText
                    style={[
                      styles.destinationText,
                      {
                        color: colors.purple,
                        marginRight: responsiveWidth(2.66), //10
                      },
                    ]}>
                    جزئیات
                  </AppText>
                  <AppIcon
                    icon={require('../../../assets/icons/down-purple.png')}
                    width={14}
                  />
                </View>
              </TouchableOpacity>
            </CardView>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginVertical: responsiveHeight(1.25), //10
  },
  buttonContainer: {
    width: responsiveWidth(89.3),
    //paddingHorizontal: 10,
  },
  card: {
    backgroundColor: colors.semitransparent,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  destination: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  detailsContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    width: responsiveWidth(94.66), //paddingHorizontal: 10
    marginBottom: 13, //13
  },
  dropdown: {
    width: responsiveWidth(25.6), //96
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.semitransparent,
  },
  dropdownbutton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hotelName: {
    flex: 1,
    fontFamily: 'Dana-Medium',
    fontSize: responsiveFontSize(3.94), //32
  },
  image: {
    width: '100%',
    height: '100%',
  },
  wallet: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  priceText: {
    fontSize: responsiveFontSize(2.7), //22
    fontFamily: 'Dana-Regular',
    color: colors.purple,
    textAlign: 'center',
    lineHeight: responsiveHeight(4.5), //35
    marginLeft: responsiveWidth(0.7), //3
  },
  destinationText: {
    fontSize: responsiveFontSize(1.23), //10
    fontFamily: 'Dana-Medium',
    color: colors.darkBlue,
    marginRight: responsiveWidth(0.5), // 2
  },
  stars: {
    marginBottom: responsiveHeight(1.25), //10
    width: responsiveWidth(30.66), //120
  },
});

const mapStateToProps = state => ({
  header: state.ui.isVisibleHeader,
  currentScreen: state.ui.currentScreen,
});

const mapDispatchToProps = dispatch => ({
  toggleFavorite: item => dispatch(toggleFavorite(item)),
  setVisible: () => dispatch(setVisible()),
  setUnvisible: () => dispatch(setUnvisible()),
  showHeader: () => dispatch(showHeader()),
  setCurrentScreen: screen => dispatch(setCurrentScreen(screen)),
});

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(RoomBanerScreen),
);
