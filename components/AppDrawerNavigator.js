import React from 'react';
import {Dimensions} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Setting from '../app/Setting/SettingScreen';
import PrivacyPolicy from '../app/Setting/PrivacyPolicy/PrivacyPolicyScreen';
import Support from '../app/Setting/Support&Faqs/SupportAndFaqsScreen';
import SlideMenu from './SlideMenu';
import colors from '../config/colors';
import TabMenu from '../components/AppTabMenu';

const DrawerNavigator = createDrawerNavigator(
  {
    Tabs: {
      screen: TabMenu,
    },

    Settings: {
      screen: Setting,
    },
    Policy: {
      screen: PrivacyPolicy,
    },
    Support: {
      screen: Support,
    },
  },
  {
    contentComponent: props => <SlideMenu {...props} />,
    drawerWidth: (Dimensions.get('window').width * 5) / 6,
    drawerPosition: 'right',
    drawerBackgroundColor: colors.transparent,
    initialRouteName: 'Tabs',
  },
);

export default createAppContainer(DrawerNavigator);
