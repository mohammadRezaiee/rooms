import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import Modal from 'react-native-modal';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import AppText from './AppText';
import colors from '../config/colors';

export default class AppNotification extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    modalVisible: true,
  };

  openModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    return (
      <Modal
        isVisible={this.state.modalVisible}
        animationIn="wobble"
        animationOut="slideOutLeft"
        onBackdropPress={() => this.closeModal()}
        backdropColor={colors.white}
        backdropOpacity={0}>
        <View style={styles.container}>
          <BlurView
            style={styles.blurContainer}
            blurType="xlight"
            blurAmount={1}
            reducedTransparencyFallbackColor="white"
          />
          <View style={styles.imageContainer}>
            <Image
              resizeMode="center"
              source={this.props.image}
              style={styles.image}
            />
          </View>
          <AppText style={styles.text}>{this.props.message}</AppText>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: responsiveWidth(73.87), //83%
    marginBottom: responsiveHeight(6.7), //55
    backgroundColor: colors.lighterBlue,
    height: responsiveHeight(70.7), //70%
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: colors.gray,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
    overflow: 'hidden',
  },
  blurContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  image: {
    flex: 1,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(3.7), //30
    width: '66%', // %66
    height: '30%', // %30
  },
  text: {
    fontFamily: 'Dana-Bold',
    fontSize: responsiveFontSize(1.97), //16
    textAlign: 'center',
  },
});
