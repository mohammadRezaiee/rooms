import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import AppText from './AppText';
import colors from '../config/colors';
import AppIcon from './AppIcon';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default class AppTab extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {index, focused, routeName} = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => this.onSelect(routeName)}>
        <View
          style={[styles.container, focused ? styles.active : styles.inactive]}>
          {this.toggleIcon(routeName, focused)}
          <AppText
            style={[
              styles.textStyle,
              focused ? {color: colors.purple} : {color: colors.darkGray},
            ]}>
            {routeName}
          </AppText>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  toggleIcon = (routeName, focused) => {
    if (routeName === 'جست‌وجو' && focused) {
      return (
        <AppIcon
          icon={require('../assets/icons/search-purple.png')}
          width={20}
          height={20}
        />
      );
    }

    if (routeName === 'جست‌وجو' && !focused) {
      return (
        <AppIcon
          icon={require('../assets/icons/search-gray.png')}
          width={20}
          height={20}
        />
      );
    }

    if (routeName === 'مورد علاقه‌ها' && focused) {
      return (
        <AppIcon
          icon={require('../assets/icons/heart-purple.png')}
          width={20}
          height={20}
        />
      );
    }

    if (routeName === 'مورد علاقه‌ها' && !focused) {
      return (
        <AppIcon
          icon={require('../assets/icons/heart-gray.png')}
          width={20}
          height={20}
        />
      );
    }

    if (routeName === 'تنظیمات' && focused) {
      return (
        <AppIcon
          icon={require('../assets/icons/settings-purple.png')}
          width={20}
          height={20}
        />
      );
    }

    if (routeName === 'تنظیمات' && !focused) {
      return (
        <AppIcon
          icon={require('../assets/icons/settings-gray.png')}
          width={20}
          height={20}
        />
      );
    }
  };

  onSelect = routeName => {
    this.props.onPress(routeName);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: 'Dana-Medium',
    fontSize: responsiveFontSize(1.23), //10
    paddingTop: 3,
  },
});
