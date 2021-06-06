import React from 'react';
import {Image} from 'react-native';
import {withNavigation} from 'react-navigation';

class AppIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Image
        resizeMode="contain"
        source={this.props.icon}
        style={[
          this.props.style,
          {width: this.props.width || 40, height: this.props.height || 40},
        ]}
      />
    );
  }
}

export default withNavigation(AppIcon);
