import React from 'react';
import {StyleSheet, Image} from 'react-native';

import CardView from './CardView';
import colors from '../config/colors';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

export default class AppImage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.image);
  }

  render() {
    return (
      <CardView enableShadow={true} style={styles.card}>
        <Image
          resizeMode="cover"
          source={{uri: this.props.image}}
          style={styles.image}
        />
      </CardView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    width: responsiveWidth(27.46), // 103
    height: responsiveHeight(9.9), //80
    overflow: 'hidden',
    marginRight: responsiveWidth(2.66), //10
    marginVertical: responsiveHeight(1.25), //10
    backgroundColor: colors.white,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
