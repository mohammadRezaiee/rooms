import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import PN from 'persian-number';

import AppIcon from './AppIcon';
import AppText from './AppText';

export default class CalculatorNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
    };
  }

  componentDidMount() {
    this.setState({
      number: this.props.start,
    });
  }

  componentDidUpdate() {
    if (this.props.start !== this.state.number) {
      this.setState({
        number: this.props.start,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.toggleIcon()}
        <AppText style={styles.text}>
          {PN.convertEnToPe(this.state.number)}
        </AppText>
        <TouchableOpacity onPress={this.props.plus}>
          <AppIcon
            icon={require('../assets/icons/plus-circle-purple.png')}
            width={24}
            height={24}
          />
        </TouchableOpacity>
      </View>
    );
  }

  plus = () => {
    let temp = this.state.number;
    temp = temp + 1;
    this.setState({
      number: temp,
    });
  };

  minus = () => {
    let temp = this.state.number;
    temp = temp - 1;
    this.setState({
      number: temp,
    });
  };

  toggleIcon = () => {
    if (this.state.number === this.props.min) {
      return (
        <AppIcon
          icon={require('../assets/icons/minus-circle-gray.png')}
          width={24}
          height={24}
        />
      );
    } else {
      return (
        <TouchableOpacity onPress={this.props.minus}>
          <AppIcon
            icon={require('../assets/icons/minus-circle-purple.png')}
            width={24}
            height={24}
          />
        </TouchableOpacity>
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexBasis: 80,
  },
  text: {
    fontFamily: 'Dana-Regular',
    fontSize: 14,
  },
});
