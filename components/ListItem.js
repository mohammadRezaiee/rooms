import React from 'react';
import {View, StyleSheet, TouchableHighlight} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import AppText from './AppText';
import colors from '../config/colors';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor={colors.lightGray}
        onPress={this.props.onPress}>
        <View style={[styles.container, this.props.style]}>
          <AppText style={styles.subtitle}>{this.props.subtitle}</AppText>
          <AppText style={styles.title}>{this.props.title}</AppText>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsiveHeight(3.1), //24
  },
  subtitle: {
    fontFamily: 'Dana-Regular',
    fontSize: responsiveFontSize(1.74), //14
    color: colors.darkGray,
    paddingLeft: responsiveWidth(8), //30
  },
  title: {
    fontFamily: 'Dana-DemiBold',
    fontSize: responsiveFontSize(1.5), //12
    paddingRight: responsiveWidth(5.33), //20
  },
});
