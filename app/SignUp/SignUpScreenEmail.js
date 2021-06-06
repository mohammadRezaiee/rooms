import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import * as Yup from 'yup';
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
import AppNotification from '../../components/AppNotification';
import AppInput from '../../components/AppInput';
import {addUser} from '../../store/user';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email()
    .label('Email'),
  password: Yup.string()
    .required()
    .min(6)
    .label('Password'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null])
    .required()
    .label('passwordConfirm'),
});

class SignUpScreenEmail extends React.Component {
  state = {
    email: ' ',
    password: ' ',
    user: {},
    isEmailSend: false,
  };

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

  signUp = (values, navigation) => {
    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(response => {
        const index = response.user.email.indexOf('@');
        const userName = response.user.email.slice(0, index);
        const user = {
          userID: response.user.uid,
          email: response.user.email,
          userName,
        };
        this.SignUpUserDB(user);
        this.props.addUser(user);
        this.setUserLocal(user);
        auth()
          .currentUser.sendEmailVerification()
          .then(() => {
            this.setState({
              isEmailSend: false,
            });
            if (this.state.isEmailSend) navigation.navigate('Drawer');
          })
          .catch(error => console.log('there is a problem'));
      })
      .catch(error => {
        console.log(error.message);
      });
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
          <Formik
            initialValues={{email: '', password: '', passwordConfirm: ''}}
            onSubmit={(values, {setSubmitting}) => {
              this.signUp(values, this.props.navigation);
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
                  <AppInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="تایید رمز عبور"
                    enableShadow={true}
                    secureTextEntry={true}
                    onChangeText={handleChange('passwordConfirm')}
                    onBlur={() => setFieldTouched('passwordConfirm')}
                    error={errors.passwordConfirm}
                    visible={touched.passwordConfirm}
                  />
                </View>
                <AppButton
                  title="ثبت نام"
                  backgroundColor={colors.lighterGray}
                  borderColor={colors.lightGray}
                  color={colors.darkGray}
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>

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
        {this.state.isEmailSend && (
          <AppNotification
            image={require('../../assets/icons/ticket-send.png')}
            message="ایمیل فعال سازی حساب ارسال شد."
          />
        )}
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
    width: responsiveWidth(89.3), // paddingHorizontal: 20
    marginBottom: responsiveHeight(9.02), //70
  },
  form: {
    marginVertical: responsiveHeight(2.46), //20
  },
  loginText: {
    fontFamily: 'Dana-Bold',
    fontSize: responsiveFontSize(1.5), //12
    color: colors.purple,
    paddingVertical: responsiveHeight(2.1), //16
    paddingRight: responsiveWidth(4), //15
  },
  socialButtons: {
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
)(SignUpScreenEmail);
