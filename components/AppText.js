import React from 'react';
import {Text} from 'react-native';

import defaultStyles from '../config/styles';

export default class AppText extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text style={[defaultStyles.text, this.props.style]} {...this.props}>
        {this.props.children}
      </Text>
    );
  }
}
