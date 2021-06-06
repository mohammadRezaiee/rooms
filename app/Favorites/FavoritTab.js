import React from 'react';
import {StyleSheet, View, Image, FlatList} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {connect} from 'react-redux';

import AppText from '../../components/AppText';
import colors from '../../config/colors';
import CardHotelVertical from '../../components/CardHotelVertical';
import {hideHeader, showHeader, setCurrentScreen} from '../../store/ui';

const baseUrl = 'https://rasacamp.s3.us-east-2.amazonaws.com/Flight/';

class FavoritTab extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
    };
  }
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
  };

  componentDidUpdate() {
    this.display();
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.lighterGray}}>
        {this.display()}
      </View>
    );
  }

  display() {
    if (this.props.favoriteList.length === 0) {
      return (
        <View style={styles.container}>
          <Image
            resizeMode="center"
            source={require('../../assets/icons/ticket-unlock.png')}
            style={styles.image}
          />
          <AppText style={styles.title}>بیا چندتا هتل اضافه کنیم!</AppText>
          <AppText style={styles.subtitle}>
            دکمه قلب رو فشار بده تا به لیست اضافه بشه.
          </AppText>
        </View>
      );
    } else {
      return (
        <FlatList
          data={this.props.favoriteList}
          extraData={this.props.favoriteList.length}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 10, paddingBottom: 90}}
          keyExtractor={item => item.room.roomID.toString()}
          renderItem={({item}) => (
            <CardHotelVertical
              hotel={item.hotelName}
              image={`${baseUrl}${item.room.roomImg}`}
              price={item.room.price}
              stars={item.stars}
              item={item}
              comments={item.comments.length}
              rate={item.rating}
              id={item.room.roomID}
              onPress={() => {
                this.props.navigation
                  .dangerouslyGetParent()
                  .navigate('RoomBanerScreen', {
                    hotel: item,
                  });
              }}
            />
          )}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: responsiveWidth(60), //60%
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '25%',
    marginTop: responsiveHeight(19), //150
    marginBottom: responsiveHeight(2.51), //20
  },
  subtitle: {
    fontFamily: 'Dana-Regular',
    fontSize: responsiveFontSize(1.74), //
    color: colors.darkGray,
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Dana-Bold',
    fontSize: responsiveFontSize(1.97), //16
    marginBottom: responsiveHeight(1.24), //10
    textAlign: 'center',
  },
});

const mapStateToprops = state => ({
  favoriteList: state.entities.user.listFavorites,
  //header: state.ui.isVisibleHeader,
  //currentScreen: state.ui.currentScreen,
});

/*const mapDispatchToProps = dispatch => ({
  // hideHeader: () => dispatch(hideHeader()),
  //showHeader: () => dispatch(showHeader()),
  //setCurrentScreen: screen => dispatch(setCurrentScreen(screen)),
});*/

export default connect(mapStateToprops)(FavoritTab);
