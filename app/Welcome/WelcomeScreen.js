import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-community/async-storage';

import AppButton from '../../components/AppButton';
import colors from '../../config/colors';
import AppText from '../../components/AppText';
import {
  addUser,
  loadFavoritesLocal,
  loadLastCitiesLocal,
  loadLastWatchesLocal,
} from '../../store/user';

class WelcomeScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {userName: ''},
      laoding: false,
    };
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
  };

  getUserLocal = async () => {
    try {
      let currentUserJson = await AsyncStorage.getItem('@currentUser');
      currentUserJson =
        currentUserJson != null ? JSON.parse(currentUserJson) : {userName: ''};
      this.setState({
        user: currentUserJson,
        laoding: true,
      });
      if (currentUserJson !== null) {
        if (currentUserJson.userName !== '') {
          this.setState({
            laoding: false,
          });
          this.props.navigation.navigate('Drawer');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  getLastCitiesLocal = async () => {
    try {
      let lastCitiesview = await AsyncStorage.getItem('@LastCitiesView');
      lastCitiesview = lastCitiesview != null ? JSON.parse(lastCitiesview) : [];
      if (lastCitiesview.length > 0)
        this.props.loadLastCitiesLocal(lastCitiesview);
    } catch (err) {
      console.log(err);
    }
  };

  getLastWatchesLocal = async () => {
    try {
      let LastWatches = await AsyncStorage.getItem('@LastWatched');
      LastWatches = LastWatches != null ? JSON.parse(LastWatches) : [];
      if (LastWatches.length > 0) this.props.loadLastWatchesLocal(LastWatches);
    } catch (err) {
      console.log(err);
    }
  };

  getFavoritesLocal = async () => {
    try {
      let favorties = await AsyncStorage.getItem('@Favorites');
      favorties = favorties != null ? JSON.parse(favorties) : [];
      if (favorties.length > 0) this.props.loadFavoritesLocal(favorties);
    } catch (err) {
      console.log(err);
    }
  };

  // Handle user state changes
  /*onAuthStateChanged = user => {
    this.setState({
      user,
    });
    if (this.state.initializing)
      this.setState({
        initializing: false,
      });
  };*/

  componentDidMount() {
    this.getUserLocal();
    if (this.state.user) {
      this.getFavoritesLocal();
      this.getLastCitiesLocal();
      this.getLastWatchesLocal();
    }
  }
  render() {
    //this.getUserLocal();
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          resizeMode="stretch"
          source={require('../../assets/images/room.webp')}
          style={styles.image}>
          <View style={styles.container}>
            <View style={styles.logo}>
              <AppText style={styles.logoText}>اتاق</AppText>
            </View>
            {this.state.user.userName === '' && this.state.laoding === true && (
              <View style={styles.buttonContainer}>
                <AppButton
                  title="ورود"
                  backgroundColor={colors.transparent}
                  onPress={() => this.props.navigation.navigate('Login')}
                />
                <AppButton
                  title="ثبت نام"
                  backgroundColor={colors.white}
                  color={colors.purple}
                  onPress={() => this.props.navigation.navigate('SignUp')}
                />
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: responsiveWidth(89.3),
    justifyContent: 'flex-end',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    width: '100%',
    alignSelf: 'center',
    bottom: responsiveScreenHeight(10.7), //11.7
  },
  logo: {
    alignSelf: 'center',
    position: 'absolute',
    top: responsiveHeight(39.6),
  },
  logoText: {
    fontFamily: 'Dana-Bold',
    fontSize: responsiveFontSize(5),
    color: colors.white,
  },
});

const mapStateToProps = state => ({
  currentUser: state.entities.user,
});

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch(addUser(user)),
  loadFavoritesLocal: arr => dispatch(loadFavoritesLocal(arr)),
  loadLastCitiesLocal: arr => dispatch(loadLastCitiesLocal(arr)),
  loadLastWatchesLocal: arr => dispatch(loadLastWatchesLocal(arr)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WelcomeScreen);
