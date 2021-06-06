import React from 'react';
import {View, StyleSheet} from 'react-native';
import PN from 'persian-number';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

import AppText from './AppText';
import colors from '../config/colors';
import CardView from './CardView';
import AppIcon from './AppIcon';
import parseDate from './parsDate';

export default class UserComment extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      date: '',
    };
  }

  componentDidMount() {
    let s1, s2, s3, s4;
    let av = 0;
    let dateString = '';

    const date = parseDate(this.props.date);
    dateString = PN.convertEnToPe(
      date.day + ' ' + date.month + ', ' + date.year,
    );

    s1 = this.props.score1;
    s2 = this.props.score2;
    s3 = this.props.score3;
    s4 = this.props.score4;
    av = ((s1 + s2 + s3 + s4) / 4).toFixed(1);
    this.setState({
      score: av,
      date: dateString,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <CardView style={styles.card} enableShadow={true}>
          <View style={styles.userContainer}>
            <AppText style={styles.user}>{this.props.user}</AppText>
            {this.props.date && (
              <View style={styles.calendarContainer}>
                <AppText style={styles.calendarText}>{this.state.date}</AppText>
                <AppIcon
                  icon={require('../assets/icons/calendar.png')}
                  width={12}
                  height={12}
                />
              </View>
            )}
          </View>
          <AppText style={styles.comment}>{this.props.comment}</AppText>
        </CardView>
        <View style={styles.circle}>
          <AppText style={styles.textNumber}>
            {PN.convertEnToPe(this.state.score)}
          </AppText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flexShrink: 1,
    backgroundColor: colors.white,
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginLeft: responsiveWidth(4), // 15
  },
  comment: {
    fontFamily: 'Dana-Regular',
    fontSize: responsiveFontSize(1.74), //14
    color: colors.darkerGray,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    marginVertical: responsiveHeight(1.25), //10
  },
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  calendarText: {
    fontSize: responsiveFontSize(1.23), //10
    fontFamily: 'Dana-Medium',
    color: colors.darkGray,
    paddingRight: 3,
  },
  textNumber: {
    fontSize: responsiveFontSize(1.48), //12
    fontFamily: 'Dana-DemiBold',
    color: colors.purple,
  },
  user: {
    fontSize: responsiveFontSize(1.48), //12
    fontFamily: 'Dana-DemiBold',
  },
  userContainer: {
    paddingBottom: responsiveHeight(1.86), //15
  },
});
