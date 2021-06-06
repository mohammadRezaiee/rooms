import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import AppText from './AppText';
import colors from '../config/colors';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

export default class AppTab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {focused, routeName} = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => this.onSelect(routeName)}>
        <View
          style={[styles.container, focused ? styles.active : styles.inactive]}>
          <AppText
            style={[
              styles.textStyle,
              focused ? {color: colors.white} : {color: colors.purple},
            ]}>
            {routeName}
          </AppText>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  onSelect = routeName => {
    this.props.onPress(routeName);
  };
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: colors.purple,
  },
  inactive: {
    backgroundColor: colors.lighterGray,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.purple,
    paddingVertical: responsiveHeight(1.3), //10
    borderRadius: 35,
    width: responsiveWidth(46.13), //%48
  },
  textStyle: {
    fontFamily: 'Dana-DemiBold',
    fontSize: responsiveFontSize(1.48), //12
  },
});
