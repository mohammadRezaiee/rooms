import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import * as Yup from 'yup';

import AppButton from '../../../components/AppButton';
import Header from '../../../components/Header';
import Screen from '../../../components/Screen';
import colors from '../../../config/colors';
import AppInput from '../../../components/AppInput';
import AppNotification from '../../../components/AppNotification';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required()
    .min(6)
    .label('password'),
  newPassword: Yup.string()
    .required()
    .min(6)
    .label('newPassword'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('newPassword'), null])
    .required()
    .label('passwordConfirm'),
});

export default class ChangePasswordScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showNotification: false,
    };
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
  };

  changePassword = (values, setErrors) => {
    var user = auth().currentUser;
    var cer = auth.EmailAuthProvider.credential(user.email, values.password);
    auth()
      .currentUser.reauthenticateWithCredential(cer)
      .then(() => {
        auth()
          .currentUser.updatePassword(values.newPassword)
          .then(() =>
            this.setState({
              showNotification: true,
            }),
          )
          .catch(function(error) {
            setErrors({onSubmit: error.message});
          });
      })
      .catch(error => {
        setErrors({onSubmit: error.message});
      });
  };

  render() {
    return (
      <Screen style={styles.screen}>
        <Header
          title="تغییر رمز"
          bottomBorder={true}
          rightIcon={require('../../../assets/icons/back-dark_1.png')}
          onPressRightIcon={() => {
            this.props.navigation.goBack();
          }}
        />
        <View style={styles.container}>
          <Formik
            initialValues={{password: '', newPassword: '', passwordConfirm: ''}}
            onSubmit={(values, {setSubmitting, setErrors, resetForm}) => {
              var user = auth().currentUser;
              var cer = auth.EmailAuthProvider.credential(
                user.email,
                values.password,
              );
              auth()
                .currentUser.reauthenticateWithCredential(cer)
                .then(() => {
                  auth()
                    .currentUser.updatePassword(values.newPassword)
                    .then(() => {
                      this.setState({
                        showNotification: true,
                      });
                      resetForm({});
                    })
                    .catch(function(error) {
                      setErrors({onSubmit: error.message});
                    });
                })
                .catch(error => {
                  setErrors({onSubmit: error.message});
                });
              setSubmitting(false);
            }}
            validationSchema={validationSchema}>
            {({
              handleChange,
              handleSubmit,
              errors,
              setFieldTouched,
              touched,
              values,
            }) => (
              <>
                <View style={styles.form}>
                  <AppInput
                    value={values.password || ''}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="رمز فعلی"
                    enableShadow={true}
                    secureTextEntry={true}
                    onChangeText={handleChange('password')}
                    onBlur={() => setFieldTouched('password')}
                    error={errors.password}
                    visible={touched.password}
                  />
                  <AppInput
                    value={values.newPassword || ''}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="رمز جدید"
                    enableShadow={true}
                    secureTextEntry={true}
                    onChangeText={handleChange('newPassword')}
                    onBlur={() => setFieldTouched('newPassword')}
                    error={errors.newPassword}
                    visible={touched.newPassword}
                  />
                  <AppInput
                    value={values.passwordConfirm || ''}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="تایید رمز"
                    enableShadow={true}
                    secureTextEntry={true}
                    onChangeText={handleChange('passwordConfirm')}
                    onBlur={() => setFieldTouched('passwordConfirm')}
                    error={errors.passwordConfirm}
                    visible={touched.passwordConfirm}
                  />
                </View>
                <AppButton
                  title="تایید"
                  backgroundColor={colors.purple}
                  borderColor={colors.purple}
                  color={colors.white}
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>
        </View>
        {this.state.showNotification && (
          <AppNotification
            image={require('../../../assets/icons/ticket-success.png')}
            message="رمز شما عوض شد."
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
