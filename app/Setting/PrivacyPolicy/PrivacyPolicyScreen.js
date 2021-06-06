import React from 'react';
import {StyleSheet} from 'react-native';
import Screen from '../../../components/Screen';

import Header from '../../../components/Header';

export default class CategoryScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
  };

  render() {
    return (
      <Screen style={styles.Screen}>
        <Header
          title="سیاست حفظ حریم خصوصی"
          bottomBorder={true}
          rightIcon={require('../../../assets/icons/menu-dark.png')}
          onPressRightIcon={() => this.props.navigation.openDrawer()}
        />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  Screen: {},
});
