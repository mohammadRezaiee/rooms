import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import AppText from './AppText';
import colors from '../config/colors';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default class SelectText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelect: this.props.select,
      trigger: false,
    };
  }

  toggleSelecting(value) {
    this.setState({
      isSelect: !value,
    });
  }

  componentDidMount() {
    this.setState({
      isSelect: this.props.select,
    });
  }

  componentDidUpdate() {
    if (this.state.isSelect !== this.props.select) {
      this.setState({
        isSelect: !this.state.isSelect,
      });
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: this.state.isSelect
                ? colors.gray
                : colors.transparent,
            },
          ]}>
          <AppText
            style={[
              styles.text,
              {
                color: this.state.isSelect ? colors.white : colors.darkBlue,
              },
            ]}>
            {this.props.title}
          </AppText>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  text: {
    fontFamily: 'Dana-DemiBold',
    fontSize: responsiveFontSize(1.48), //12
    textAlign: 'center',
  },
});
