import React from 'react';
import {View, StyleSheet} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import PN from 'persian-number';

import AppProgress from './AppProgress';
import AppText from './AppText';
import colors from '../config/colors';

export default class Rating extends React.PureComponent {
  state = {
    index: [
      {
        title: 'مکان',
        rate: 0.001,
      },
      {
        title: 'تمیزی',
        rate: 0.001,
      },
      {
        title: 'خدمات',
        rate: 0.001,
      },
      {
        title: 'قیمت',
        rate: 0.001,
      },
    ],
    totalRating: 0,
  };

  render() {
    return (
      <View style={this.props.style}>
        <View style={styles.header}>
          <View style={styles.ratingContainer}>
            <AppText style={styles.text}>
              {PN.convertEnToPe(this.props.totalRating)}
            </AppText>
          </View>
          <AppText style={styles.title}>امتیاز</AppText>
        </View>
        {this.display()}
      </View>
    );
  }

  display() {
    const temp = this.props.rating;
    let arr = [];
    if (temp) {
      temp.forEach(item => {
        arr.push(
          <AppProgress title={item.title} rate={item.rate} key={item.title} />,
        );
      });
    }
    return arr;
  }
}

const styles = StyleSheet.create({
  header: {
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 10,
  },
  ratingContainer: {
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
  title: {
    flexBasis: 50,
    fontSize: responsiveFontSize(1.48), //12
    fontFamily: 'Dana-DemiBold',
  },
});
