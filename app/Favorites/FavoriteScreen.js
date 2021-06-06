import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import FavoriteTab from './FavoritTab';
import InsiderTabMenu from '../../components/InsiderTabMenu';
import RoomBanerScreen from '../Room/RoomBaner/RoomBanerScreen';
import RoomDetailsScreen from '../Room/RoomDetails/RoomDetailsScreen';
import ReviewsScreen from '../Room/RoomDetails/Reviews/ReviewsScreen';
import LastWatchTab from './LastWatchTab';

const TabNavigator = createMaterialTopTabNavigator(
  {
    FavoritesTab: {
      screen: FavoriteTab,
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

const mainStack = createStackNavigator(
  {
    InsiderTab: {
      screen: TabNavigator,
    },

    RoomBanerScreen: {
      screen: RoomBanerScreen,
    },
    RoomDetailScreen: {
      screen: RoomDetailsScreen,
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

mainStack.navigationOptions = ({navigation}) => {
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

mainStack.navigationOptions = ({navigation}) => {
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

export default createAppContainer(mainStack);
