import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-community/async-storage';

import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import Header from '../../components/Header';
import Screen from '../../components/Screen';
import colors from '../../config/colors';
import AppInput from '../../components/AppInput';
import ButtonIcon from '../../components/ButtonIcon';
import {addUser} from '../../store/user';
import Axios from 'axios';

GoogleSignin.configure({
  webClientId:
    '654170334670-iimdc64hjn6lieibsenhccqmvt95n3kr.apps.googleusercontent.com',
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '',
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email()
    .label('Email'),
  password: Yup.string()
    .required()
    .min(6)
    .label('Password'),
});

class LoginScreen extends React.Component {
  state = {
    user: {},
  };

  logIn = (values, navigation) => {
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(response => {
        //let {user} = response;

        const index = response.user.email.indexOf('@');
        const userName = response.user.email.slice(0, index);
        const user = {
          userID: response.user.uid,
          email: response.user.email,
          userName,
        };
        this.setUserLocal(user);
        this.LoginUserDB(user.userID);

        navigation.navigate('Drawer');
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  async LoginUserDB(userID) {
    await Axios.get('https://flight.rasahr.com/api/User/LogIn/' + userID)
      .then(response => {
        this.props.addUser(response.data);
        this.setUserLocal(response.data);
        console.log(response.data);
      })
      .catch(err => {
        console.log('ورود ناموفق. بعدا دوباره امتحان کنید');
      });
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
          title="ورود"
          bottomBorder={true}
          rightIcon={require('../../assets/icons/back-dark_1.png')}
          onPressRightIcon={() => this.props.navigation.goBack()}
        />
        <View style={styles.container}>
          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={(values, {setSubmitting}) => {
              this.logIn(values, this.props.navigation);
              setSubmitting(false);
            }}
            validationSchema={validationSchema}>
            {({
              handleChange,
              handleSubmit,
              errors,
              setFieldTouched,
              touched,
            }) => (
              <>
                <View style={styles.form}>
                  <AppText style={styles.text}>ورود با</AppText>
                  <AppInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="ایمیل"
                    enableShadow={true}
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                    error={errors.email}
                    visible={touched.email}
                  />
                  <AppInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="رمز عبور"
                    enableShadow={true}
                    secureTextEntry={true}
                    onChangeText={handleChange('password')}
                    onBlur={() => setFieldTouched('password')}
                    error={errors.password}
                    visible={touched.password}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <ButtonIcon
                    icon={require('../../assets/icons/facebook.png')}
                    backgroundColor={colors.facebookBlue}
                    onPress={() =>
                      this.onFacebookButtonPress()
                        .then(() => {
                          const user = {
                            userID: response.user.uid,
                            email: response.user.email,
                            userName: response.user.displayName,
                          };
                          this.setUserLocal(user);
                          this.LoginUserDB(response.user.uid);
                          this.props.navigation.navigate('Drawer');
                        })
                        .catch(error => {
                          console.log(error.message);
                        })
                    }
                  />
                  <ButtonIcon
                    icon={require('../../assets/icons/google.png')}
                    backgroundColor={colors.danger}
                    onPress={() =>
                      this.onGoogleButtonPress()
                        .then(response => {
                          const user = {
                            userID: response.user.uid,
                            email: response.user.email,
                            userName: response.user.displayName,
                          };
                          this.setUserLocal(user);
                          this.LoginUserDB(response.user.uid);
                          this.props.navigation.navigate('Drawer');
                        })
                        .catch(error => {
                          console.log(error.message);
                        })
                    }
                  />
                  <AppButton
                    title="ورود"
                    backgroundColor={colors.lighterGray}
                    borderColor={colors.lightGray}
                    color={colors.darkGray}
                    style={styles.loginButton}
                    onPress={handleSubmit}
                  />
                </View>
              </>
            )}
          </Formik>

          <View style={{marginVertical: responsiveHeight(2.58)}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignUp')}>
                <View>
                  <AppText
                    style={[
                      styles.loginText,
                      {paddingTop: 0, paddingBottom: 0},
                    ]}>
                    ثبت نام
                  </AppText>
                </View>
              </TouchableOpacity>
              <AppText
                style={[styles.text, {paddingVertical: responsiveHeight(0.6)}]}>
                به حساب جدید نیاز دارید؟
              </AppText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ForgotPassword')
                }>
                <View>
                  <AppText style={[styles.loginText, {paddingTop: 0}]}>
                    بازیابی
                  </AppText>
                </View>
              </TouchableOpacity>
              <AppText
                style={[styles.text, {paddingTop: responsiveHeight(0.5)}]}>
                رمز خود را فراموش کرده‌اید؟
              </AppText>
            </View>
          </View>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loginButton: {
    width: responsiveWidth(54.7),
    marginLeft: responsiveWidth(5.3),
  },
  screen: {
    justifyContent: 'space-between',
  },
  container: {
    alignSelf: 'center',
    width: responsiveWidth(89.3),
    marginBottom: responsiveHeight(2.46), // 19
  },
  form: {
    marginVertical: responsiveHeight(2.46),
  },
  loginText: {
    fontFamily: 'Dana-Bold',
    fontSize: responsiveFontSize(1.5),
    color: colors.purple,
    paddingVertical: responsiveHeight(1.97),
    paddingRight: responsiveWidth(4),
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'Dana-Medium',
    fontSize: responsiveFontSize(1.25),
    color: colors.darkGray,
    paddingVertical: responsiveHeight(2.46),
    paddingRight: responsiveWidth(2.7),
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
)(LoginScreen);
