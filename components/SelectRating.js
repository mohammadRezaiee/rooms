import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import PN from 'persian-number';

import colors from '../config/colors';
import AppText from './AppText';

export default class SelectRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRating: 0,
      rate: [0, 7, 7.5, 8, 8.5],
    };
  }

  componentDidMount() {
    this.setState({
      initialRating: this.props.value,
    });
  }

  updateStarRating(key) {
    this.setState({
      initialRating: key,
    });
    this.props.onValueChange(key);
  }

  render() {
    let i;
    let rateArray = [];
    for (i = 0; i < this.state.rate.length; i++) {
      rateArray.push(
        <TouchableWithoutFeedback
          key={i}
          onPress={this.updateStarRating.bind(this, i)}>
          <View
            style={[
              styles.container,
              {
                backgroundColor:
                  i >= this.state.initialRating
                    ? colors.purple
                    : colors.lightGray,
              },
            ]}>
            <AppText style={[styles.text, {minWidth: 12, maxWidth: 23}]}>
              {PN.convertEnToPe(this.state.rate[i])}
            </AppText>
            {this.props.isPlus && <AppText style={styles.text}>+</AppText>}
          </View>
        </TouchableWithoutFeedback>,
      );
    }
    return (
      <View
        style={{
          flexDirection: 'row',
        }}>
        {rateArray}
      </View>
    );
  }

  toggleSelect = value => {
    this.setState({
      isSelect: !value,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 38,
    height: 26,
    borderRadius: 15,
    backgroundColor: colors.purple,
    marginRight: 15,
  },
  text: {
    fontFamily: 'Dana-DemiBold',
    fontSize: 12,
    color: colors.white,
  },
});
