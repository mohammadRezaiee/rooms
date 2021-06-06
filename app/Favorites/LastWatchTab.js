import React from 'react';
import {StyleSheet, View, Image, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import AppText from '../../components/AppText';
import colors from '../../config/colors';
import CardHotelVertical from '../../components/CardHotelVertical';

const baseUrl = 'https://rasacamp.s3.us-east-2.amazonaws.com/Flight/';

class LastWatchTab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.lighterGray}}>
        {this.display()}
      </View>
    );
  }

  display() {
    if (this.props.ListLastwatched.length === 0) {
      return (
        <View style={styles.container}>
          <Image
            resizeMode="center"
            source={require('../../assets/icons/ticket-unlock.png')}
            style={styles.image}
          />
          <AppText style={styles.title}>سابقه‌ای وجود ندارد!</AppText>
          <AppText style={styles.subtitle}>
            بیا ی نگاه به هتل‌ها بندازیم.
          </AppText>
        </View>
      );
    } else {
      return (
        <FlatList
          data={this.props.ListLastwatched}
          extraData={this.props.ListLastwatched}
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
              onPress={() =>
                this.props.navigation.navigate('RoomBanerScreen', {
                  hotel: item,
                })
              }
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

const mapStateToProps = state => ({
  ListLastwatched: state.entities.user.listLastWatch,
});

export default connect(mapStateToProps)(LastWatchTab);
