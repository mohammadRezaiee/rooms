import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import * as Yup from 'yup';

import AppButton from '../../components/AppButton';
import Header from '../../components/Header';
import Screen from '../../components/Screen';
import colors from '../../config/colors';
import AppInput from '../../components/AppInput';
import AppNotification from '../../components/AppNotification';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email()
    .label('Email'),
});

export default class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEmailSended: false,
    };
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
  };

  render() {
    return (
      <Screen style={styles.screen}>
        <Header
          title="فراموشی رمز"
          bottomBorder={true}
          rightIcon={require('../../assets/icons/back-dark_1.png')}
          onPressRightIcon={() => this.props.navigation.goBack()}
        />
        <View style={styles.container}>
          <Formik
            initialValues={{email: ''}}
            onSubmit={(values, {setSubmitting, resetForm}) => {
              auth()
                .sendPasswordResetEmail(values.email)
                .then(() => {
                  this.setState({
                    isEmailSended: true,
                  });
                  resetForm({});
                })
                .catch(error => console.log(error));
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
                </View>
                <AppButton
                  title="ارسال"
                  backgroundColor={colors.purple}
                  borderColor={colors.purple}
                  color={colors.white}
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>
        </View>
        {this.state.isEmailSended && (
          <AppNotification
            image={require('../../assets/icons/ticket-send.png')}
            message="صندوق پیام خود را بررسی کنید."
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
    width: responsiveWidth(89.3),
    marginBottom: responsiveHeight(16.36), // 127
  },
  form: {
    marginVertical: responsiveHeight(2.46), //20
  },
});
