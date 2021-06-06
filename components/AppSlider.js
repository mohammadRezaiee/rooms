import React from 'react';
import {StyleSheet, View} from 'react-native';
import Slider from 'react-native-slider';
import PN from 'persian-number';

import colors from '../config/colors';
import AppText from '../components/AppText';

export default class AppSlider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: 0,
    };
  }

  componentDidMount() {
    this.setState({
      currentValue: this.props.value,
    });
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Slider
          value={this.state.currentValue}
          minimumValue={this.props.min}
          maximumValue={this.props.max}
          step={this.props.step}
          thumbTintColor={colors.white}
          minimumTrackTintColor={colors.purple}
          onValueChange={value => {
            value = parseInt(value);
            this.setState({
              currentValue: value,
            });
            this.props.onValueChange(value);
          }}
          style={styles.slider}
          trackStyle={{backgroundColor: colors.purple}}
          thumbStyle={{
            width: 22,
            height: 22,
            borderRadius: 11,
            elevation: 10,
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <AppText style={styles.text}>{this.persianNumber()}</AppText>
          <AppText style={[styles.text, {marginRight: 8}]}>
            حداکثر.{this.props.measure}
          </AppText>
        </View>
      </View>
    );
  }

  persianNumber = () => {
    let num = this.state.currentValue;
    num = PN.sliceNumber(num);
    num = PN.convertEnToPe(num);
    return num;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 2.8,
    width: '70%',
    marginRight: 15,
  },
  text: {
    fontFamily: 'Dana-Medium',
    fontSize: 10,
    color: colors.darkerGray,
  },
});
