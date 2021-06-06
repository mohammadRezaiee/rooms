import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';

import AppTabBar from '../components/AppTabBar';
import MainPageScreen from '../app/MainPage/MainPageScreen';
import ChangePassword from '../app/Setting/ChangePassword/ChangePasswordScreen';
import SettingScreen from '../app/Setting/SettingScreen';
import CategoryScreen from '../app/Setting/Category/CategoryScreen';
import PrivacyPolicy from '../app/Setting/PrivacyPolicy/PrivacyPolicyScreen';
import SupportAndFaqs from '../app/Setting/Support&Faqs/SupportAndFaqsScreen';
import SearchResult from '../app/MainPage/SearchResult/SearchResult';
import FiltersScreen from '../app/MainPage/Filters/FiltersScreen';
import AccomodationScreen from '../app/MainPage/TypeOfAccomodation/AccomodationScreen';
import RoomBaner from '../app/Room/RoomBaner/RoomBanerScreen';
import RoomDetails from '../app/Room/RoomDetails/RoomDetailsScreen';
import Reviews from '../app/Room/RoomDetails/Reviews/ReviewsScreen';
import MapScreen from '../app/MainPage/Map/MapScreen';
import ReviewsScreen from '../app/Room/RoomDetails/Reviews/ReviewsScreen';

import InsiderTabMenu from '../components/InsiderTabMenu';
import LastWatchTab from '../app/Favorites/LastWatchTab';
import FavoritTab from '../app/Favorites/FavoritTab';

const MainPageStack = createStackNavigator(
  {
    MainPage: {
      screen: MainPageScreen,
    },
    List: {
      screen: SearchResult,
    },
    Filter: {
      screen: FiltersScreen,
    },
    Aocomodation: {
      screen: AccomodationScreen,
    },
    RoomBanerScreen: {
      screen: RoomBaner,
    },
    RoomDetailScreen: {
      screen: RoomDetails,
    },
    ReviewScreen: {
      screen: Reviews,
    },
    Map: {
      screen: MapScreen,
    },
  },
  {
    initialRouteName: 'MainPage',
    headerMode: 'none',
    mode: 'modal',
  },
);

MainPageStack.navigationOptions = ({navigation}) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === 'RoomBanerScreen') {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible,
  };
};

const SettingStack = createStackNavigator(
  {
    SettingInitial: {
      screen: SettingScreen,
    },
    Category: {
      screen: CategoryScreen,
    },
    ChangePassword: {
      screen: ChangePassword,
    },
    PrivacyPolicy: {
      screen: PrivacyPolicy,
    },
    Supports: {
      screen: SupportAndFaqs,
    },
  },
  {
    initialRouteName: 'SettingInitial',
    mode: 'card',
    headerMode: 'none',
  },
);

//////////////////////////////////////////////////////////////////
const SecondaryTab = createMaterialTopTabNavigator(
  {
    FavoritesTab: {
      screen: FavoritTab,
    },
    LastWatchesTab: {
      screen: LastWatchTab,
    },
  },
  {
    tabBarComponent: props => <InsiderTabMenu {...props} />,
    initialRouteName: 'FavoritesTab',
  },
);

const FavoriteStack = createStackNavigator(
  {
    InsiderTab: {
      screen: SecondaryTab,
    },

    RoomBanerScreen: {
      screen: RoomBaner,
    },
    RoomDetailScreen: {
      screen: RoomDetails,
    },
    ReviewScreen: {
      screen: ReviewsScreen,
    },
  },
  {
    initialRouteName: 'InsiderTab',
    headerMode: 'none',
    mode: 'modal',
  },
);

FavoriteStack.navigationOptions = ({navigation}) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === 'RoomBanerScreen') {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible,
  };
};
////////////////////////////////////////////////////////////////////////////////////////
const TabNavigator = createBottomTabNavigator(
  {
    Search: {
      screen: MainPageStack,
    },
    Favorites: {
      screen: FavoriteStack,
    },
    Setting: {
      screen: SettingStack,
    },
  },
  {
    tabBarComponent: props => <AppTabBar {...props} />,
  },
  {
    initialRouteName: 'Search',
  },
);

const AppContainer = createAppContainer(TabNavigator);

export default createAppContainer(AppContainer);
