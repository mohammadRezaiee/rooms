import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Switch} from 'react-native-switch';

import colors from '../config/colors';
import AppText from './AppText';

export default class AppSwitch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: true,
    };
  }

  toggleSwitch = value => {
    this.setState({
      value: !value,
    });
    this.props.onPress;
  };

  componentDidMount() {
    this.setState({
      value: this.props.defaultValue,
    });
  }

  componentDidUpdate() {
    if (this.state.value !== this.props.defaultValue) {
      this.setState({
        value: this.props.defaultValue,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Switch
          value={this.state.value}
          onValueChange={this.props.onPress}
          circleSize={22}
          barHeight={26}
          circleBorderWidth={0}
          backgroundActive={colors.purple}
          backgroundInactive={'#EBECEC'}
          innerCircleStyle={styles.circleStyle}
          changeValueImmediately={true}
          switchLeftPx={1.8}
          switchRightPx={1.8}
          switchWidthMultiplier={2.3}
        />
        <AppText style={styles.text}>{this.props.title}</AppText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  text: {
    fontFamily: 'Dana-Regular',
    fontSize: 14,
    color: colors.darkerGray,
  },
  circleStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});
