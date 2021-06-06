import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';

import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import Header from '../../components/Header';
import Screen from '../../components/Screen';
import colors from '../../config/colors';
import {addUser} from '../../store/user';

GoogleSignin.configure({
  webClientId:
    '654170334670-iimdc64hjn6lieibsenhccqmvt95n3kr.apps.googleusercontent.com',
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '',
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

class SignUpScreenGoogle extends React.Component {
  async SignUpUserDB(user) {
    await Axios({
      method: 'post',
      url: 'https://flight.rasahr.com/api/User/SignUp',
      data: user,
    })
      .then(() => console.log('ثبت نام شما موفقیت آمیز بود'))
      .catch(() => console.log('لطفا مجددا تست کنید'));
  }

  setUserLocal = async data => {
    try {
      await AsyncStorage.setItem('@currentUser', JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  };

  onGoogleButtonPress = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  onFacebookButtonPress = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  };

  render() {
    return (
      <Screen style={styles.screen}>
        <Header
          title="ثبت نام"
          bottomBorder={true}
          rightIcon={require('../../assets/icons/back-dark_1.png')}
          onPressRightIcon={() => this.props.navigation.goBack()}
        />
        <View style={styles.container}>
          <AppText style={styles.text}>ثبت نام با</AppText>
          <View style={styles.socialButtonsContainer}>
            <AppButton
              title="فیس بوک"
              backgroundColor={colors.facebookBlue}
              style={styles.socialButton}
              onPress={() =>
                this.onFacebookButtonPress()
                  .then(response => {
                    const user = {
                      userID: response.user.uid,
                      email: response.user.email,
                      userName: response.user.displayName,
                    };
                    this.props.addUser(user);
                    this.SignUpUserDB(user);
                    this.setUserLocal(user);
                    this.props.navigation.navigate('Drawer');
                  })
                  .catch(error => {
                    console.log(error.message);
                  })
              }
            />
            <AppButton
              title="گوگل"
              backgroundColor={colors.danger}
              style={styles.socialButton}
              onPress={() =>
                this.onGoogleButtonPress()
                  .then(response => {
                    const user = {
                      userID: response.user.uid,
                      email: response.user.email,
                      userName: response.user.displayName,
                    };
                    this.props.addUser(user);
                    this.SignUpUserDB(user);
                    this.setUserLocal(user);
                    this.props.navigation.navigate('Drawer');
                  })
                  .catch(error => {
                    console.log(error.message);
                  })
              }
            />
          </View>
          <AppText style={styles.text}>یا</AppText>
          <AppButton
            title="ایمیل"
            onPress={() => this.props.navigation.navigate('SignUpWithEmail')}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}>
              <View>
                <AppText style={styles.loginText}>ورود</AppText>
              </View>
            </TouchableOpacity>
            <AppText style={styles.text}>هم اکنون عضو هستید؟</AppText>
          </View>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'space-between',
  },
  container: {
    alignSelf: 'center',
    width: responsiveWidth(89.3), //paddingHorizontal: 20
    marginBottom: responsiveHeight(9.02), // 70
  },
  loginText: {
    fontFamily: 'Dana-Bold',
    fontSize: responsiveFontSize(1.5), //12
    color: colors.purple,
    paddingVertical: responsiveHeight(2.1), //16
    paddingRight: responsiveWidth(4), //15
  },
  socialButton: {
    width: responsiveWidth(43.2), //49%
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'Dana-Medium',
    fontSize: responsiveFontSize(1.25), //10
    color: colors.darkGray,
    paddingVertical: responsiveHeight(2.46), //20
    paddingRight: responsiveWidth(2.7), //10
  },
});

const mapStateToProps = state => ({
  user: state.entities.user,
});

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch(addUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpScreenGoogle);
