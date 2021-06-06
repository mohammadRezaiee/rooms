import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import PN from 'persian-number';
import {connect} from 'react-redux';

import CardView from './CardView';
import AppText from './AppText';
import FavoriteButton from './FavoriteButton';
import colors from '../config/colors';
import AppIcon from './AppIcon';
import Stars from './Stars';
import {toggleFavorite} from '../store/user';

class CardHotelVertical extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor={colors.lighterGray}
        onPress={this.props.onPress}>
        <CardView style={styles.card} enableShadow={true}>
          <ImageBackground
            resizeMode="cover"
            source={{uri: this.props.image}}
            style={styles.image}>
            <FavoriteButton
              itemID={this.props.id}
              onPress={() => {
                this.props.toggleFavorite(this.props.item);
              }}
            />
            <View style={styles.reviewContainer}>
              {this.props.comments > 0 ? (
                <AppText style={styles.reviewText}>
                  {PN.convertEnToPe(
                    this.props.comments + ' نظر / ' + this.props.rate,
                  )}
                </AppText>
              ) : (
                <AppText style={[styles.reviewText, {alignSelf: 'center'}]}>
                  بدون نظر
                </AppText>
              )}
            </View>
          </ImageBackground>
          <View style={styles.detailsContainer}>
            <View
              style={{
                alignItems: 'flex-start',
              }}>
              <View style={styles.wallet}>
                <AppIcon
                  icon={require('../assets/icons/worthlessToman.png')}
                  width={24}
                  height={24}
                />
                <AppText style={styles.priceText}>
                  {PN.convertEnToPe(PN.sliceNumber(this.props.price))}
                </AppText>
              </View>
              <AppText style={styles.destinationText}>برای هر شب /</AppText>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <AppText style={styles.title}>
                {PN.convertEnToPe(this.props.hotel)}
              </AppText>
              <Stars counter={this.props.stars} style={styles.stars} />
              <View style={styles.destination}>
                <AppText style={styles.destinationText}>
                  {PN.convertEnToPe(8 + ' کیلومتر تا مقصد')}
                </AppText>
                <AppIcon
                  icon={require('../assets/icons/pin-purple.png')}
                  width={12}
                  height={12}
                />
              </View>
            </View>
          </View>
        </CardView>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginVertical: responsiveHeight(1.05), //8
    padding: 0,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  destination: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  destinationText: {
    fontSize: responsiveFontSize(1.23), //10
    fontFamily: 'Dana-Medium',
    color: colors.darkGray,
    marginRight: responsiveWidth(0.5), // 2
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: responsiveWidth(83.9), //paddingHorizontal: 25
    paddingTop: responsiveHeight(1.25), //10
    paddingBottom: responsiveHeight(0.63), // 5
  },
  image: {
    height: responsiveHeight(23.2), //180
  },
  priceText: {
    fontSize: responsiveFontSize(2.7), //22
    fontFamily: 'Dana-Regular',
    color: colors.purple,
    textAlign: 'center',
    lineHeight: responsiveHeight(4.5), // 35
    marginLeft: responsiveWidth(0.7), // 3
  },
  reviewContainer: {
    position: 'absolute',
    bottom: 10,
    left: 25, //25
    width: responsiveWidth(26), //110
    height: responsiveHeight(3.1), //24
    borderRadius: 15,
    backgroundColor: colors.transparentGray,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  reviewText: {
    fontSize: responsiveFontSize(1.5), // 12
    paddingLeft: responsiveWidth(2.13), // 8
    fontFamily: 'Dana-Regular',
    color: colors.white,
  },
  stars: {
    marginBottom: responsiveHeight(0.8), // 6
  },
  wallet: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: responsiveFontSize(1.97), // 16
    fontFamily: 'Dana-Medium',
    paddingBottom: responsiveHeight(0.74), //6
  },
});

const mapDispatchToProps = dispatch => ({
  toggleFavorite: item => dispatch(toggleFavorite(item)),
});

export default connect(
  null,
  mapDispatchToProps,
)(CardHotelVertical);
