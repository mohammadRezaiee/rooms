import React from 'react';
import {StyleSheet, Image, View, TouchableWithoutFeedback} from 'react-native';
import PN from 'persian-number';

import CardView from './CardView';
import AppText from './AppText';
import colors from '../config/colors';
import AppIcon from './AppIcon';
import LineSeparator from './LineSeparator';

export default class CardHotelHorizontal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const p = PN.sliceNumber(this.props.price);
    this.setState({
      price: p,
    });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View>
          <CardView style={[styles.card, this.props.style]} enableShadow={true}>
            <Image
              resizeMode="cover"
              source={{uri: this.props.image}}
              style={styles.image}
            />
            <View style={styles.detailsContainer}>
              <AppText style={styles.title}>
                {PN.convertEnToPe(this.props.hotel)}
              </AppText>
              <View style={styles.destination}>
                <AppText style={styles.destinationText}>
                  {PN.convertEnToPe(8 + ' کیلومتر تا مقصد')}
                </AppText>
                <AppIcon
                  icon={require('../assets/icons/pin-blue.png')}
                  width={12}
                  height={12}
                />
              </View>
              <AppText style={styles.reviewText}>
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
              </AppText>
              <LineSeparator horizontal={true} />
              <View style={styles.wallet}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <AppIcon
                    icon={require('../assets/icons/worthlessToman.png')}
                    width={20}
                    height={20}
                  />
                  <AppText style={styles.priceText}>
                    {PN.convertEnToPe(PN.sliceNumber(this.props.price))}
                  </AppText>
                </View>
                <View style={{alignSelf: 'flex-end', paddingBottom: 3}}>
                  <AppText
                    style={[
                      styles.destinationText,
                      {
                        marginRight: 0,
                        marginLeft: 10,
                      },
                    ]}>
                    برای هر شب /
                  </AppText>
                </View>
              </View>
            </View>
          </CardView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    backgroundColor: colors.white,
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end',
    width: 290,
    height: 110,
    marginVertical: 10,
    marginLeft: 10,
    overflow: 'hidden',
  },
  destination: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  destinationText: {
    fontSize: 10,
    fontFamily: 'Dana-Medium',
    color: colors.darkGray,
    marginRight: 2,
  },
  detailsContainer: {
    paddingBottom: 10,
    paddingHorizontal: 8,
    paddingTop: 7,
    flex: 1,
  },
  image: {
    width: 100,
    height: 110,
  },
  reviewText: {
    fontSize: 12,
    fontFamily: 'Dana-Regular',
    color: colors.darkGray,
    paddingTop: 5,
  },
  priceText: {
    fontSize: 18,
    fontFamily: 'Dana-Regular',
    color: colors.purple,
    textAlign: 'center',
    marginLeft: 3,
  },
  title: {
    fontSize: 16,
    lineHeight: 25,
    fontFamily: 'Dana-Medium',
    color: colors.darkBlue,
  },
  wallet: {
    flexDirection: 'row',
    justifyContent: 'space-between', //'flex-end',
    alignItems: 'flex-start',

    paddingVertical: 3,
  },
});
