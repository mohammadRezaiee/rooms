import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import AppText from './AppText';
import colors from '../config/colors';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default class FeatureButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelect: false,
    };
  }

  componentDidMount() {
    this.setState({
      isSelect: this.props.value,
    });
  }

  toggleSelecting(value) {
    this.setState({
      isSelect: !value,
    });
    this.props.onValueChange(!value);
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.toggleSelecting(this.state.isSelect)}>
        <View
          style={[
            styles.container,
            this.props.style,
            {
              borderColor: this.state.isSelect
                ? colors.purple
                : colors.lightGray,
            },
          ]}>
          <AppText
            style={[
              styles.text,
              {color: this.state.isSelect ? colors.purple : colors.darkGray},
            ]}>
            {this.props.title}
          </AppText>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
  },
  text: {
    fontFamily: 'Dana-Regular',
    fontSize: responsiveFontSize(1.48), // 12
  },
});
