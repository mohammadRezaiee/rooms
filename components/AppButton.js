import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import AppText from './AppText';
import colors from '../config/colors';
import AppIcon from './AppIcon';

export default class AppButton extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          this.props.style,
          {
            backgroundColor: this.props.backgroundColor || colors.purple,
            borderColor: this.props.borderColor || colors.white,
            elevation: this.props.enableShadow ? 2 : 0,
          },
        ]}
        onPress={this.props.onPress}>
        <View style={styles.content}>
          {this.props.icon && (
            <AppIcon
              icon={this.props.icon}
              width={this.props.iconSize}
              height={this.props.iconSize}
              style={styles.icon}
            />
          )}
          <AppText
            style={[
              styles.text,
              this.props.titleStyle,
              {color: this.props.color || colors.white},
            ]}>
            {this.props.title}
          </AppText>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flexShrink: 1,
    width: '100%',
    maxHeight: responsiveHeight(6.3),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 35,
    padding: 16,
    marginVertical: responsiveHeight(0.8),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: responsiveWidth(2.7),
  },
  text: {
    fontFamily: 'Dana-Bold',
    fontSize: responsiveFontSize(1.5), //12
  },
});
