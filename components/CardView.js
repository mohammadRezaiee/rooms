import React from 'react';
import {View, StyleSheet} from 'react-native';

export default class CardView extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={[
          styles.card,
          this.props.style,
          {elevation: this.props.enableShadow ? 2 : 0},
        ]}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    width: '100%',
    borderRadius: 15,
    padding: 15, // 15
    overflow: 'hidden',
  },
});
