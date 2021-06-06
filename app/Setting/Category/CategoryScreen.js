import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Screen from '../../../components/Screen';

import Header from '../../../components/Header';
import ListItem from '../../../components/ListItem';
import LineSeparator from '../../../components/LineSeparator';

const cities = [
  {city: 'اصفهان', value: 1},
  {city: 'آذربایجان شرقی', value: 2},
  {city: 'تهران', value: 3},
  {city: 'فارس', value: 4},
  {city: 'کردستان', value: 5},
  {city: 'گیلان', value: 6},
  {city: 'همدان', value: 7},
  {city: 'هرمزگان', value: 8},
  {city: 'یزد', value: 9},
];

export default class CategoryScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
  };

  render() {
    return (
      <Screen style={styles.screen}>
        <Header
          title="استان"
          bottomBorder={true}
          rightIcon={require('../../../assets/icons/menu-dark.png')}
          onPressRightIcon={() => this.props.navigation.openDrawer()}
        />
        <FlatList
          data={cities}
          keyExtractor={item => item.value.toString()}
          ItemSeparatorComponent={() => (
            <View style={{paddingHorizontal: 20}}>
              <LineSeparator horizontal={true} />
            </View>
          )}
          renderItem={({item}) => (
            <ListItem
              title={item.city}
              style={{paddingRight: 5}}
              onPress={() => {
                const {navigation} = this.props;
                navigation.goBack();
                navigation.state.params.onSelect({city: item.city});
              }}
            />
          )}
        />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  screen: {},
});
