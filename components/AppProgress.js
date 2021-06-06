import React from 'react';
import {View, StyleSheet} from 'react-native';
import PN from 'persian-number';

import colors from '../config/colors';
import AppText from './AppText';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

export default class AppProgress extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  rate = rate => {
    let percentag = (rate * 10).toString();
    percentag = percentag + '%';
    return percentag;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.rate && (
          <AppText style={styles.rate}>
            {PN.convertEnToPe(this.props.rate.toFixed(1))}
          </AppText>
        )}
        <View style={styles.progressBar}>
          <View
            style={[
              styles.fillProgressBar,
              {width: this.rate(this.props.rate) || '0%'},
            ]}
          />
        </View>
        {this.props.title && (
          <AppText style={styles.title}>{this.props.title}</AppText>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: responsiveHeight(1.25), //10
  },
  progressBar: {
    flex: 1,
    marginLeft: responsiveWidth(2.66), //10
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 10, //10
    borderRadius: 10, //10
    backgroundColor: colors.lightGray,
  },
  fillProgressBar: {
    height: 10,
    borderRadius: 10,
    backgroundColor: colors.purple,
  },
  title: {
    flexBasis: 50,
    color: colors.darkGray,
    fontSize: responsiveFontSize(1.23), //10
    fontFamily: 'Dana-Medium',
  },
  rate: {
    flexBasis: 20,
    color: colors.darkGray,
    fontSize: 10, //10
    fontFamily: 'Dana-Medium',
  },
});
