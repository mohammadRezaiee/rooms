import React from 'react';
import {StyleSheet, View, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import PN from 'persian-number';

import colors from '../config/colors';
import AppInput from './AppInput';
import CardView from './CardView';
import LineSeparator from './LineSeparator';
import AppText from './AppText';
import parsDate from './parsDate';
//import {addLastWatcheCities} from '../store/user';
import {setSearchField} from '../store/hotles';

class ReserveCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      firstDate: null,
      endDate: null,
      // city: {},
    };
  }

  render() {
    return (
      <CardView
        enableShadow={this.props.shadowCard}
        style={[styles.card, this.props.style]}
        blurEffect={this.props.blurEffect}>
        <AppText
          style={[
            styles.title,
            {
              paddingRight: responsiveWidth(4.03), //15
            },
          ]}>
          مقصد
        </AppText>
        <AppInput
          enableShadow={this.props.shadowInput}
          backgroundColor={this.props.inputColor}
          icon={require('../assets/icons/search-lightgray.png')}
          onChangeText={input => this.props.setSearchField(input)}
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
          value={this.props.value}
        />
        <LineSeparator horizontal={true} />
        <View style={styles.config}>
          <TouchableHighlight
            underlayColor={colors.lighterGray}
            onPress={this.props.onPressLeft}
            style={styles.sections}>
            <View style={{flexGrow: 1}}>
              <AppText style={styles.title}>تعداد اتاق</AppText>
              {this.displayRoomsInfo()}
            </View>
          </TouchableHighlight>
          <LineSeparator horizontal={false} />
          <TouchableHighlight
            underlayColor={colors.lighterGray}
            onPress={this.props.onPressRight}
            style={styles.sections}>
            <View style={{flexGrow: 1}}>
              <AppText style={styles.title}>انتخاب تاریخ</AppText>
              {this.displayDate()}
            </View>
          </TouchableHighlight>
        </View>
        <LineSeparator horizontal={true} />
        <View style={{justifyContent: 'center'}}>{this.props.children}</View>
      </CardView>
    );
  }

  displayRoomsInfo = () => {
    if (this.props.adults === 0 && this.props.childs === 0) {
      return <AppText style={styles.subtitle}>انتخاب کنید</AppText>;
    } else {
      const rooms = this.props.numberOfRooms;
      const adults = this.props.adults;
      const childs = this.props.childs;
      let str = '';

      str = PN.convertEnToPe(`${rooms} اتاق `);
      if (adults !== 0) {
        str = str.concat(PN.convertEnToPe(`- ${adults} بزرگسال `));
      }
      if (childs !== 0) {
        str = str.concat(PN.convertEnToPe(`- ${childs} کودک`));
      }
      return (
        <AppText style={styles.subtitle} numberOfLines={1}>
          {str}
        </AppText>
      );
    }
  };

  displayDate = () => {
    if (!this.props.startDate || !this.props.endDate) {
      return <AppText style={styles.subtitle}>انتخاب کنید</AppText>;
    } else {
      const fd = parsDate(this.props.startDate);
      const ld = parsDate(this.props.endDate);
      let dateString;
      dateString = `${fd.day} ${fd.month} - ${ld.day} ${ld.month}`;
      if (fd.day === ld.day && fd.month === ld.month && fd.year === ld.year)
        dateString = `${fd.day} ${fd.month}`;

      return (
        <AppText style={styles.subtitle}>
          {PN.convertEnToPe(dateString)}
        </AppText>
      );
    }
  };
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.semitransparent,
  },
  config: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1.25), //10
  },
  sections: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: responsiveWidth(4), //15
  },
  subtitle: {
    fontFamily: 'Dana-Regular',
    fontSize: responsiveFontSize(1.74), //14
  },
  title: {
    fontFamily: 'Dana-Medium',
    fontSize: responsiveFontSize(1.23), //10
    color: colors.darkGray,
  },
});

const mapStateToProps = state => ({
  startDate: state.entities.reserve.startDate,
  endDate: state.entities.reserve.endDate,
  numberOfRooms: state.entities.reserve.numberOfRooms,
  adults: state.entities.reserve.totalAdults,
  childs: state.entities.reserve.totalChilds,
  //allCities: state.entities.hotels.allCities,
  searchField: state.entities.hotels.searchField,
});

const mapDispatchToProps = dispatch => ({
  setSearchField: input => dispatch(setSearchField(input)),
  //hotelsRequested: hotels => dispatch(hotelsRequested(hotels)),
  //citySelected: city => dispatch(citySelected(city)),
  //addCities: city => dispatch(addLastWatcheCities(city)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReserveCard);
