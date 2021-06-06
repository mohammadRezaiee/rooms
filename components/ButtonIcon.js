import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';

import colors from '../config/colors';
import AppIcon from './AppIcon';

export default class ButtonIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[
          styles.button,
          this.props.style,
          {
            backgroundColor: this.props.backgroundColor || colors.purple,
          },
        ]}
        onPress={this.props.onPress}>
        <AppIcon icon={this.props.icon} width={24} height={24} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 54,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 27,
    marginHorizontal: responsiveWidth(1.3),
  },
});
