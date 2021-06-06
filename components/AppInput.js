import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
//import {TextInput} from 'react-native-paper';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import colors from '../config/colors';
import AppIcon from './AppIcon';

export default class AppInput extends React.PureComponent {
  constructor(props) {
    super(props);

    /*this.state = {
      validating: false,
      isValidate: true,
      text: '',
      textStatus: 'onFocus',
    };*/
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          {
            elevation: this.props.enableShadow ? 2 : 0,
            backgroundColor: this.props.backgroundColor || colors.white,
          },
        ]}>
        {this.display()}
        <TextInput
          style={[styles.text, this.props.style]}
          placeholderTextColor={colors.gray}
          placeholder={this.props.placeholder}
          {...this.props}
        />

        {this.props.icon && (
          <AppIcon icon={this.props.icon} width={16} height={16} />
        )}
      </View>
    );
  }

  display = () => {
    if (this.props.visible) {
      if (this.props.error) {
        return (
          <AppIcon
            icon={require('../assets/icons/check-false.png')}
            width={16}
            height={16}
          />
        );
      } else {
        return (
          <AppIcon
            icon={require('../assets/icons/check-true.png')}
            width={16}
            height={16}
          />
        );
      }
    } else {
      return null;
    }
  };
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: responsiveWidth(4), //15
    marginVertical: responsiveHeight(0.63), //5
  },
  text: {
    color: colors.darkBlue,
    fontFamily: 'Dana-Regular',
    fontSize: responsiveFontSize(1.97), // 16
    padding: responsiveHeight(1), //8
    flex: 1,
    textAlign: 'right',
  },
  placeholder: {
    color: colors.purple,
    fontFamily: 'Dana-Light',
    fontSize: responsiveFontSize(1.97), // 16
  },
});
