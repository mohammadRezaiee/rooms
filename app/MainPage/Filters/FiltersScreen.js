import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {connect} from 'react-redux';

import Screen from '../../../components/Screen';
import Header from '../../../components/Header';
import AppText from '../../../components/AppText';
import AppSlider from '../../../components/AppSlider';
import LineSeparator from '../../../components/LineSeparator';
import SelectRating from '../../../components/SelectRating';
import AppStarRaing from '../../../components/AppStarRating';
import FeatureButton from '../../../components/FeatureButton';
import AppButton from '../../../components/AppButton';
import colors from '../../../config/colors';
import {filterHotels} from '../../../store/hotles';

class FiltersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {},
    };
  }

  onSelect = data => {
    this.setState({
      filters: {
        ...this.state.filters,
        accomodation: data,
      },
    });
  };

  componentDidMount() {
    this.setState({
      filters: this.props.filters,
    });
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
  };

  render() {
    return (
      <Screen>
        <Header
          title="فیلترها"
          bottomBorder={true}
          rightIcon={require('../../../assets/icons/back-dark_1.png')}
          leftIcon={require('../../../assets/icons/close-dark.png')}
          onPressRightIcon={() => {
            this.props.filterHotels(this.state.filters);
            this.props.navigation.goBack();
          }}
          onPressLeftIcon={() => this.props.navigation.navigate('List')}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <AppText style={styles.text}>قیمت به ازای هر شب اقامت</AppText>
            <AppSlider
              value={this.props.filters.price}
              min={0}
              max={5000000}
              step={10000}
              style={{marginBottom: 30}}
              onValueChange={value => {
                this.setState({
                  filters: {
                    ...this.state.filters,
                    price: value,
                  },
                });
                console.log(this.state.filters);
              }}
            />
            <LineSeparator horizontal={true} />
            <AppText style={styles.text}>امتیاز</AppText>
            <View style={styles.ratingContainer}>
              <SelectRating
                isPlus={true}
                value={this.props.filters.rating}
                onValueChange={value => {
                  this.setState({
                    filters: {
                      ...this.state.filters,
                      rating: value,
                    },
                  });
                }}
              />
            </View>
            <LineSeparator horizontal={true} />
            <AppText style={styles.text}>تعداد ستاره‌ها</AppText>
            <View style={styles.ratingContainer}>
              <AppStarRaing
                value={this.props.filters.stars}
                onValueChange={value => {
                  this.setState({
                    filters: {
                      ...this.state.filters,
                      stars: value,
                    },
                  });
                }}
              />
            </View>
            <LineSeparator horizontal={true} />
            <AppText style={styles.text}>فاصله تا مکان شما</AppText>
            <AppSlider
              value={this.props.filters.distance}
              min={0}
              max={20}
              step={1}
              measure="Km"
              style={{marginBottom: 30}}
              onValueChange={value => {
                this.setState({
                  filters: {
                    ...this.state.filters,
                    distance: value,
                  },
                });
              }}
            />
            <LineSeparator horizontal={true} />
            <AppText style={styles.text}>امکانات</AppText>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{flexDirection: 'row', marginBottom: 30}}>
              <FeatureButton
                title="وای‌فای رایگان"
                value={this.props.filters.wifi}
                style={{marginRight: 10}}
                onValueChange={value => {
                  this.setState({
                    filters: {
                      ...this.state.filters,
                      wifi: value,
                    },
                  });
                }}
              />
              <FeatureButton
                title="استخر"
                value={this.props.filters.pool}
                style={{marginRight: 10}}
                onValueChange={value => {
                  this.setState({
                    filters: {
                      ...this.state.filters,
                      pool: value,
                    },
                  });
                }}
              />
              <FeatureButton
                title="SPA"
                value={this.props.filters.spa}
                style={{marginRight: 10}}
                onValueChange={value => {
                  this.setState({
                    filters: {
                      ...this.state.filters,
                      spa: value,
                    },
                  });
                }}
              />
              <FeatureButton
                title="صبحانه"
                value={this.props.filters.breakfast}
                style={{marginRight: 10}}
                onValueChange={value => {
                  this.setState({
                    filters: {
                      ...this.state.filters,
                      breakfast: value,
                    },
                  });
                }}
              />
            </ScrollView>
            <LineSeparator horizontal={true} />
            <AppText style={[styles.text, {paddingBottom: 10}]}>
              نوع محل اقامت
            </AppText>
            <AppButton
              title={
                this.state.filters.accomodation
                  ? this.state.filters.accomodation
                  : 'همه'
              }
              backgroundColor={colors.white}
              color={colors.purple}
              enableShadow={true}
              onPress={() =>
                this.props.navigation.navigate('Aocomodation', {
                  onSelect: this.onSelect,
                  selected: this.state.filters.accomodation,
                })
              }
            />
          </View>
        </ScrollView>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 110,
  },
  text: {
    fontFamily: 'Dana-DemiBold',
    fontSize: responsiveFontSize(1.48), //12
    paddingVertical: 25,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
    marginBottom: 30,
  },
});

const mapsStateTopProps = state => ({
  filters: state.entities.hotels.filters,
});

const mapDispatchToProps = dispatch => ({
  filterHotels: filters => dispatch(filterHotels(filters)),
});

export default connect(
  mapsStateTopProps,
  mapDispatchToProps,
)(FiltersScreen);
