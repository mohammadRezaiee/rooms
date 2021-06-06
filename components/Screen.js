import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

import colors from '../config/colors';

export default class Screen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={[styles.screen, this.props.style]}>
        {this.props.children}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.lighterGray,
    flex: 1,
  },
});
