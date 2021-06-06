import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import AppIcon from './AppIcon';
import colors from '../config/colors';

class FavoriteButton extends React.PureComponent {
  state = {
    isFavorite: false,
  };

  toggleFavorite = () => {
    this.setState({
      isFavorite: !this.state.isFavorite,
    });
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          this.toggleFavorite();
          this.props.onPress();
        }}
        style={[
          styles.button,
          {backgroundColor: this.props.backgroundColor || colors.opaque},
        ]}>
        {this.tapFavorite()}
      </TouchableOpacity>
    );
  }

  tapFavorite() {
    const isFavorite = this.props.favoriteList.findIndex(item => {
      return item.room.roomID === this.props.itemID;
    });

    if (isFavorite >= 0) {
      return (
        <AppIcon
          icon={require('../assets/icons/heart-favorite.png')}
          width={22}
          height={22}
        />
      );
    } else {
      return (
        <AppIcon
          icon={require('../assets/icons/heart-white.png')}
          width={22}
          height={22}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: 8,
    marginRight: 10,
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const mapStateToProps = state => ({
  favoriteList: state.entities.user.listFavorites,
});

export default connect(mapStateToProps)(FavoriteButton);
