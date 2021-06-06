import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../config/colors';

export default class LineSeparator extends React.Component {
  render() {
    return <>{this.toggleLine()}</>;
  }

  toggleLine() {
    if (this.props.horizontal) {
      return <View style={[styles.horizontalLine, this.props.style]} />;
    } else {
      return <View style={[styles.verticalLine, this.props.style]} />;
    }
  }
}

const styles = StyleSheet.create({
  horizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: colors.lightGray,
  },
  verticalLine: {
    flexShrink: 1,
    width: 1,
    height: '100%',
    backgroundColor: colors.lightGray,
  },
});
