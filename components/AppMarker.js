import React from 'react';
import {View, StyleSheet} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import PN from 'persian-number';

import AppText from './AppText';
import colors from '../config/colors';

export default class AppMarker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <AppText style={styles.text}>
          {PN.convertEnToPe(this.props.rate)}
        </AppText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 40, //40
    height: 25, //25
    borderRadius: 15,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: colors.gray,
  },
  text: {
    textAlign: 'center',
    fontSize: responsiveFontSize(1.48), // 12
    fontFamily: 'Dana-DemiBold',
    color: colors.lighterGray,
  },
});
