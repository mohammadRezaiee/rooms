import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import Screen from '../../../components/Screen';
import Header from '../../../components/Header';
import CardView from '../../../components/CardView';
import AppInput from '../../../components/AppInput';
import colors from '../../../config/colors';
import AppText from '../../../components/AppText';

export default class CategoryScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
  };

  render() {
    return (
      <Screen>
        <Header
          title="پشتیبانی"
          rightIcon={require('../../../assets/icons/menu-dark.png')}
          onPressRightIcon={() => this.props.navigation.openDrawer()}
        />
        <View style={styles.container}>
          <CardView enableShadow={true} style={styles.card}>
            <AppText style={styles.boldText}>
              سلام! تو سفرهات همراهت میایم
            </AppText>
            <AppText style={styles.thinText}>چه کمکی از اتاق برمیاد؟</AppText>
            <AppInput
              backgroundColor={colors.lighterGray}
              placeholder="جست‌وجو"
              icon={require('../../../assets/icons/search-lightgray.png')}
            />
          </CardView>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
  },
  container: {
    alignSelf: 'center',
    marginTop: responsiveHeight(1.39), //10
    width: responsiveWidth(94.66), //paddingHorizontal: 10
  },
  boldText: {
    fontFamily: 'Dana-Bold',
    fontSize: responsiveFontSize(1.97), //16
    textAlign: 'center',
    paddingTop: responsiveHeight(5.2), //40
    paddingBottom: responsiveHeight(2.37), //18
  },
  thinText: {
    fontFamily: 'Dana-Regular',
    fontSize: responsiveFontSize(1.74), //14
    color: colors.darkGray,
    textAlign: 'center',
    paddingBottom: responsiveHeight(4.2), //32
  },
});
