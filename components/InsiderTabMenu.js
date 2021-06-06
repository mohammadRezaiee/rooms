import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {DrawerActions} from 'react-navigation-drawer';

import AppInsiderTab from './AppInsiderTab';
import colors from '../config/colors';
import Header from '../components/Header';

export default class AppTabBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigation} = this.props;
    const routes = navigation.state.routes;
    return (
      <View
        style={{
          backgroundColor: colors.lighterGray,
        }}>
        <Header
          title="مورد علاقه‌ها"
          rightIcon={require('../assets/icons/menu-dark.png')}
          onPressRightIcon={() =>
            this.props.navigation.dispatch(DrawerActions.openDrawer())
          }
        />
        <View style={styles.container}>
          <View style={[styles.tabBar, this.props.style]}>
            {routes.map((route, index) => {
              let routeName = '';
              switch (route.routeName) {
                case 'FavoritesTab':
                  routeName = 'مورد علاقه‌ها';
                  break;
                case 'LastWatchesTab':
                  routeName = 'آخرین بازدیدها';
                  break;
                default:
                  routeName = '';
              }
              return (
                <AppInsiderTab
                  key={route.key}
                  routeName={routeName}
                  onPress={() => this.navigationHandler(route.routeName)}
                  focused={navigation.state.index === index}
                  index={index}
                />
              );
            })}
          </View>
        </View>
      </View>
    );
  }

  navigationHandler = routeName => {
    this.props.navigation.navigate(routeName);
  };
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: responsiveWidth(94.66), //marginHorizontal: 10
    backgroundColor: colors.lighterGray,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveHeight(1.52), //12
    marginBottom: responsiveHeight(2.52), //20
    width: '100%',
  },
});
