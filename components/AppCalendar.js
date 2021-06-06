import React from 'react';
import {StyleSheet, View, TouchableHighlight} from 'react-native';
import {Calendar} from 'react-native-calendars-persian';
import moment from 'moment-jalaali';
import PN from 'persian-number';
import {connect} from 'react-redux';

import colors from '../config/colors';
import CardView from './CardView';
import AppIcon from './AppIcon';
import LineSeparator from './LineSeparator';
import AppText from './AppText';
import parsDate from './parsDate';
import {
  addStartDate,
  addEndDate,
  addMarkedDates,
  addEndDay,
  addEndDayName,
  addEndMonth,
  addStartDay,
  addStartMonth,
  addStartDayName,
  addMarkingType,
} from '../store/reserve';

class AppCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markedDates: {},
      isStartDatePicked: false,
      isEndDatePicked: false,
      startDate: '',
      JalaliStartDate: '',
      JalaliEndDate: '',
      endDate: '',
      markingType: 'period',
      startYear: '',
      startMonth: '',
      startDay: '',
      startDayName: '',
      endYear: '',
      endMonth: '',
      endDay: '',
      endDayName: '',
    };
  }

  componentDidMount() {
    this.setState({
      markedDates: this.props.reserve.markedDates,
    });
  }

  render() {
    const minDate = new Date(); // Today
    return (
      <CardView style={styles.cardRooms}>
        <View style={styles.header}>
          <TouchableHighlight
            underlayColor={colors.lightGray}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 18,
            }}
            onPress={() => {
              this.setState({
                isStartDatePicked: false,
              });
            }}>
            <>
              {this.display(
                this.props.reserve.startDay,
                this.props.reserve.startMonth,
                this.props.reserve.startDayName,
                'شروع اقامت',
              )}
            </>
          </TouchableHighlight>
          <AppIcon
            icon={require('../assets/icons/arrow-back-thin.png')}
            width={17}
            height={13}
          />
          <TouchableHighlight
            underlayColor={colors.lightGray}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              this.setState({
                isStartDatePicked: true,
              });
            }}>
            <View
              style={{
                height: 88,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {this.display(
                this.props.reserve.endDay,
                this.props.reserve.endMonth,
                this.props.reserve.endDayName,
                'پایان اقامت',
              )}
            </View>
          </TouchableHighlight>
        </View>
        <View style={{width: '95%', flexDirection: 'row'}}>
          <LineSeparator
            horizontal={true}
            style={{
              backgroundColor: this.state.isStartDatePicked
                ? '#eaeaea'
                : colors.purple,
              width: '50%',
            }}
          />
          <LineSeparator
            horizontal={true}
            style={{
              backgroundColor: this.state.isStartDatePicked
                ? colors.purple
                : '#eaeaea',
              width: '50%',
            }}
          />
        </View>
        <Calendar
          minDate={minDate}
          monthFormat={'MMMM'}
          hideDayNames={true}
          markingType={this.state.markingType}
          jalali={true}
          firstDay={6}
          onDayPress={day => {
            this.getSelectedDayEvents(day);
          }}
          onPressArrowRight={addMonth => addMonth()}
          onPressArrowLeft={subtractMonth => subtractMonth()}
          renderArrow={direction => {
            if (direction === 'left')
              return (
                <AppIcon
                  icon={require('../assets/icons/forward-purple.png')}
                  width={20}
                  height={16}
                />
              );
            else
              return (
                <AppIcon
                  icon={require('../assets/icons/back-purple.png')}
                  width={20}
                  height={16}
                />
              );
          }}
          style={{width: '100%', backgroundColor: colors.transparent}}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: colors.transparent,
            todayTextColor: colors.purple,
            textDisabledColor: colors.darkGray,
            arrowColor: colors.purple,
            monthTextColor: colors.purple,
            textDayFontFamily: 'Dana-Regular',
            textMonthFontFamily: 'Dana-Regular',
            textDayHeaderFontFamily: 'Dana-Regular',
            textDayFontSize: 14,
          }}
          markedDates={this.props.reserve.markedDates}
        />
      </CardView>
    );
  }

  getSelectedDayEvents = day => {
    let markedDates = {};
    if (this.state.isStartDatePicked == false) {
      let jDate = moment(day.dateString).format('jYYYY-jMM-jDD');
      markedDates[day.dateString] = {
        startingDay: true,
        color: '#7B40FF',
        textColor: '#FFFFFF',
        selectedColor: '#7B40FF',
        selected: true,
      };
      this.setState({
        markedDates: markedDates,

        isEndDatePicked: false,
        startDate: day.dateString,
        JalaliStartDate: jDate,
        markingType: 'simple',
      });

      this.props.addStartDate(jDate);
      this.props.endDate(jDate);
      this.props.addMarkedDates('simple');

      const parse = parsDate(jDate);
      this.setState({
        startYear: parse.year,
        startMonth: parse.month,
        startDay: parse.day,
        startDayName: parse.dayName,
        endYear: parse.year,
        endMonth: parse.month,
        endDay: parse.day,
        endDayName: parse.dayName,
      });
      this.props.addStartDay(parse.day);
      this.props.addStartMonth(parse.month);
      this.props.addStartDayName(parse.dayName);
      this.props.addEndDay(parse.day);
      this.props.addEndMonth(parse.month);
      this.props.addEndDayName(parse.dayName);
    } else {
      //let markedDates = {};
      let startDate = moment(this.state.startDate);
      let jDate = moment(day.dateString).format('jYYYY-jMM-jDD');
      let endDate = moment(day.dateString);
      let range = endDate.diff(startDate, 'days');
      if (range > 0) {
        this.setState({
          markedDates: null,
        });
        markedDates[this.state.startDate] = {
          startingDay: true,
          color: '#7B40FF',
          textColor: '#FFFFFF',
          selected: true,
        };
        for (let i = 1; i <= range; i++) {
          let tempDate = startDate.add(1, 'day');
          tempDate = moment(tempDate).format('YYYY-MM-DD');
          if (i < range) {
            markedDates[tempDate] = {
              color: colors.purple,
              textColor: '#FFFFFF',
            };
          } else {
            let endDate = tempDate;
            let jEndDate = moment(endDate, 'YYYY-MM-DD').format(
              'jYYYY-jMM-jDD',
            );
            markedDates[tempDate] = {
              endingDay: true,
              color: '#7B40FF',
              textColor: '#FFFFFF',
            };
            const parse = parsDate(jEndDate);
            this.setState({
              endDate,
              endYear: parse.year,
              endMonth: parse.month,
              endDay: parse.day,
              endDayName: parse.dayName,
            });
            this.props.addEndDay(parse.day);
            this.props.addEndMonth(parse.month);
            this.props.addEndDayName(parse.dayName);
            this.setState({
              markedDates: markedDates,

              JalaliEndDate: jEndDate,
              markingType: 'period',
            });
            this.props.endDate(jEndDate);
            this.props.addMarkingType('period');
          }
        }
      }
    }
    //save in store
    this.props.addMarkedDates(markedDates);
  };

  display = (day, month, dayName, txt) => {
    if (!day) {
      return <AppText style={styles.title}>{txt}</AppText>;
    } else {
      return (
        <>
          <AppText style={styles.title}>
            {PN.convertEnToPe(day + ' ' + month)}
          </AppText>
          <AppText style={styles.subtitle}>{dayName}</AppText>
        </>
      );
    }
  };
}

const styles = StyleSheet.create({
  cardRooms: {
    padding: 0,
    alignItems: 'center',
    backgroundColor: colors.semitransparent,
    marginBottom: 9,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  monthSwipe: {
    width: '95%',
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    fontFamily: 'Dana-Medium',
    fontSize: 10,
    color: colors.darkerGray,
  },
  title: {
    fontFamily: 'Dana-Regular',
    fontSize: 22,
  },
});

const mapStateToProps = state => ({
  reserve: state.entities.reserve,
});

const mapDispatchToProps = dispatch => ({
  addStartDate: date => dispatch(addStartDate(date)),
  endDate: date => dispatch(addEndDate(date)),
  addMarkedDates: dates => dispatch(addMarkedDates(dates)),
  addMarkingType: type => dispatch(addMarkingType(type)),
  addEndDay: day => dispatch(addEndDay(day)),
  addEndDayName: name => dispatch(addEndDayName(name)),
  addEndMonth: month => dispatch(addEndMonth(month)),
  addStartDay: day => dispatch(addStartDay(day)),
  addStartDayName: name => dispatch(addStartDayName(name)),
  addStartMonth: month => dispatch(addStartMonth(month)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppCalendar);
