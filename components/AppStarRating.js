import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';

const star = require('../assets/icons/star.png');
const borderStar = require('../assets/icons/star-border.png');

export default class AppStarRaing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defualtStars: 0,
      maxStars: 5,
    };
  }

  componentDidMount() {
    this.setState({
      defualtStars: this.props.value,
    });
  }

  updateStarRating(key) {
    this.setState({
      defualtStars: key,
    });
    this.props.onValueChange(key);
  }

  render() {
    let starArray = [];
    let i;
    for (i = 1; i <= this.state.maxStars; i++) {
      starArray.push(
        <TouchableOpacity key={i} onPress={this.updateStarRating.bind(this, i)}>
          <Image
            source={i <= this.state.defualtStars ? star : borderStar}
            style={styles.image}
          />
        </TouchableOpacity>,
      );
    }
    return <View style={styles.container}>{starArray}</View>;
  }
}

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 130,
  },
});
