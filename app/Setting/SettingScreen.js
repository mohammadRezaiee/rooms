import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';

import colors from '../../config/colors';
import Screen from '../../components/Screen';
import Header from '../../components/Header';
import AppButton from '../../components/AppButton';
import ListItem from '../../components/ListItem';
import LineSeparator from '../../components/LineSeparator';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {logOut} from '../../store/user';
import CardView from '../../components/CardView';
import AppText from '../../components/AppText';

class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: 'تهران',
      authStatus: false,
      currentUser: {},
    };
  }

  setUserLocal = async data => {
    try {
      await AsyncStorage.setItem('@currentUser', JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  };

  onSelect = data => {
    this.setState(data);
  };

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
  };

  componentDidMount() {
    const authStatus = auth().currentUser.emailVerified;
    this.setState({
      authStatus: authStatus,
    });
  }

  render() {
    const {navigation} = this.props;
    const routes = navigation.state.routes;
    return (
      <Screen>
        <Header
          title="تنظیمات"
          rightIcon={require('../../assets/icons/menu-dark.png')}
          bottomBorder={true}
          onPressRightIcon={() => {
            this.props.navigation.dispatch(DrawerActions.openDrawer());
          }}
        />
        <ListItem
          title="استان"
          subtitle={this.state.city}
          onPress={() => {
            this.props.navigation.navigate('Category', {
              onSelect: this.onSelect,
            });
          }}
        />
        <View style={styles.separator} />
        <ListItem
          title="سیاست حفظ حریم خصوصی"
          onPress={() => {
            this.props.navigation.navigate('PrivacyPolicy');
          }}
        />
        <View style={styles.container}>
          <LineSeparator horizontal={true} />
        </View>
        <ListItem
          title="پشتیبانی"
          onPress={() => {
            this.props.navigation.navigate('Supports');
          }}
        />
        <View style={styles.separator} />
        <ListItem
          title="تغییر رمز"
          onPress={() => {
            this.props.navigation.navigate('ChangePassword');
          }}
        />
        {this.state.authStatus === false && (
          <View
            style={{
              //backgroundColor: 'white',
              marginHorizontal: responsiveWidth(8),
              marginTop: 10,
            }}>
            <CardView
              style={{
                backgroundColor: 'white',
              }}>
              <AppText style={styles.title}>
                حساب کاربری شما فعال نمی‌باشد. لطفا صندوق پیام‌های خود را بررسی
                کنید.
              </AppText>
            </CardView>
          </View>
        )}
        <View style={styles.container}>
          <AppButton
            title="خروج"
            backgroundColor={colors.white}
            borderColor={colors.white}
            color={colors.purple}
            enableShadow={true}
            style={styles.button}
            onPress={() => {
              auth()
                .signOut()
                .then(() => {
                  this.props.logOut();
                  const user = {
                    userName: '',
                  };
                  this.setUserLocal(user);
                  this.props.navigation.navigate('Login');
                });
            }}
          />
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 28,
  },
  container: {
    alignSelf: 'center',
    width: responsiveWidth(89.3), //paddingHorizontal: 20
  },
  separator: {
    width: '100%',
    height: responsiveHeight(0.99), //8
    backgroundColor: '#F2F2F2',
  },
  title: {
    fontFamily: 'Dana-DemiBold',
    textAlign: 'center',
    color: colors.darkGray,
    fontSize: responsiveFontSize(1.5), //12
  },
});

const mapStateToProps = state => ({
  currentUser: state.entities.user.currentUser,
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingScreen);
