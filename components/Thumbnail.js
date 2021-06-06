import React from 'react';
import {StyleSheet, Image, TouchableHighlight} from 'react-native';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

import CardView from './CardView';
import colors from '../config/colors';
import AppText from './AppText';

export default class FullThumbnail extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CardView enableShadow={true} style={styles.card}>
        <TouchableHighlight
          underlayColor={colors.lighterGray}
          onPress={this.props.onPress}
          style={{flex: 1}}>
          <React.Fragment>
            <Image
              resizeMode="cover"
              source={{uri: this.props.image}}
              style={styles.image}
            />
            <AppText style={styles.text}>{this.props.title}</AppText>
          </React.Fragment>
        </TouchableHighlight>
      </CardView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    width: responsiveWidth(36), //135
    height: responsiveHeight(19.8), //160
    overflow: 'hidden',
    marginRight: responsiveWidth(2.67), //10
    marginVertical: responsiveHeight(1.25), //10
    backgroundColor: colors.white,
  },
  image: {
    width: '100%',
    height: responsiveHeight(13.18), //107
  },
  text: {
    fontSize: responsiveFontSize(1.74), //14
    fontFamily: 'Dana-Regular',
    paddingRight: responsiveWidth(2.67), // 10
    paddingTop: responsiveHeight(1.25), // 10
  },
});
