import React from 'react';
import {StyleSheet, ImageBackground, TouchableHighlight} from 'react-native';

import CardView from './CardView';
import colors from '../config/colors';
import AppText from './AppText';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

export default class FullThumbnail extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CardView enableShadow={true} style={styles.card}>
        <TouchableHighlight onPress={this.props.onPress}>
          <ImageBackground
            resizeMode="cover"
            source={{uri: this.props.image}}
            style={styles.imageBackground}>
            <AppText style={styles.text}>{this.props.title}</AppText>
          </ImageBackground>
        </TouchableHighlight>
      </CardView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    width: responsiveWidth(42.66), //160
    height: responsiveHeight(25.86), //210
    overflow: 'hidden',
    marginRight: responsiveWidth(2.67), //10
    marginVertical: responsiveHeight(1.25), //10
    backgroundColor: colors.white,
  },
  text: {
    fontSize: responsiveFontSize(1.97), // 16
    fontFamily: 'Dana-Bold',
    color: colors.white,
    position: 'absolute',
    bottom: 15, //15
    right: 10, //10
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
});
