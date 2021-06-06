import React from 'react';
import {View, StyleSheet} from 'react-native';

import AppIcon from './AppIcon';

export default class Stars extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.numberOfStars(this.props.counter || 0)}
      </View>
    );
  }

  numberOfStars = num => {
    let i,
      j,
      arr = [];
    for (i = 0; i < 5; i++) {
      for (j = i; j < num; j++) {
        i = i + 1;
        arr.push(
          <AppIcon
            key={j}
            icon={require('../assets/icons/star.png')}
            width={this.props.sizeIcon || 12}
            height={this.props.sizeIcon || 12}
          />,
        );
      }
      if (num !== 5) {
        arr.push(
          <AppIcon
            key={i}
            icon={require('../assets/icons/star-border.png')}
            width={this.props.sizeIcon || 12}
            height={this.props.sizeIcon || 12}
          />,
        );
      }
    }
    return arr;
  };
}

const styles = StyleSheet.create({
  container: {
    width: 90,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
