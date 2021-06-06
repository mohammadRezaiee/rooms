import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
//import {withNavigation} from 'react-navigation';
import {
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import AppText from './AppText';
import LineSeparator from './LineSeparator';
import colors from '../config/colors';
import AppIcon from './AppIcon';

export default class Header extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.detialsContainer}>
          <AppText
            style={[styles.text, {color: this.props.color || colors.darkBlue}]}>
            {this.props.title}
          </AppText>
          {this.props.leftIcon && (
            <TouchableWithoutFeedback onPress={this.props.onPressLeftIcon}>
              <View style={styles.iconLeft}>
                <AppIcon icon={this.props.leftIcon} width={20} height={20} />
              </View>
            </TouchableWithoutFeedback>
          )}
          {this.props.rightIcon && (
            <TouchableWithoutFeedback onPress={this.props.onPressRightIcon}>
              <View style={styles.iconRight}>
                <AppIcon icon={this.props.rightIcon} width={20} height={20} />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
        {this.props.bottomBorder && <LineSeparator horizontal={true} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
  },
  detialsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(2.46), //20
  },
  text: {
    alignSelf: 'center',
    fontSize: responsiveFontSize(1.5), // 12 defaultstyle=> 18
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Dana-DemiBold',
    paddingVertical: responsiveHeight(0.73), //6
  },
  iconLeft: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    top: 15, //responsiveHeight(3.4), //25
    left: 20, // responsiveHeight(3.9), //30
  },
  iconRight: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    top: 15, //responsiveHeight(3.4), //25
    right: 20, // responsiveHeight(3.9), //30
  },
});

//export default withNavigation(Header);
