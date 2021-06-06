import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {connect} from 'react-redux';

import AppTab from './AppTab';
import colors from '../config/colors';

class AppTabBar extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return this.display();
  }

  display = () => {
    const {navigation} = this.props;
    const routes = navigation.state.routes;
    if (this.props.tabBarVisible === false) return null;
    else {
      return (
        <View style={{marginHorizontal: 10}}>
          <View style={[styles.tabBar, this.props.style]}>
            <BlurView
              style={styles.blureContainer}
              blurType="light"
              blurAmount={5}
              reducedTransparencyFallbackColor="white"
            />
            {routes.map((route, index) => {
              let routeName = '';
              switch (route.routeName) {
                case 'Search':
                  routeName = 'جست‌وجو';
                  break;
                case 'Favorites':
                  routeName = 'مورد علاقه‌ها';
                  break;
                case 'Setting':
                  routeName = 'تنظیمات';
                  break;
                default:
                  routeName = '';
              }
              return (
                <View style={{flex: 1, alignItems: 'center'}}>
                  <AppTab
                    key={route.key}
                    routeName={routeName}
                    onPress={() => this.navigationHandler(route.routeName)}
                    focused={navigation.state.index === index}
                    index={index}
                  />
                </View>
              );
            })}
          </View>
        </View>
      );
    }
  };

  navigationHandler = routeName => {
    this.props.navigation.navigate(routeName);
  };
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    padding: 15,
    width: '100%',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    backgroundColor: colors.semitransparent,
    alignSelf: 'center',
    overflow: 'hidden',
  },

  blureContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const mapStateToProps = stata => ({
  tabBarVisible: stata.ui.isVisibleTabBar,
});

export default connect(mapStateToProps)(AppTabBar);
