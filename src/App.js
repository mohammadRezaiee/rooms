import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {enableScreens} from 'react-native-screens';
import {I18nManager} from 'react-native';
I18nManager.allowRTL(false);

import DrawerMenu from '../ccomponents/AppDrawerNavigator';
import LoginStack from '../components/LoginStack';

enableScreens();

const MainNavigator = createSwitchNavigator(
  {
    Drawer: {
      screen: DrawerMenu,
    },
    Login: {
      screen: LoginStack,
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

const MainApp = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return <MainApp />;
  }
}
