import React from 'react';
import {View, FlatList} from 'react-native';

import Screen from '../../../components/Screen';
import Header from '../../../components/Header';
import AppSwitch from '../../../components/AppSwitch';
import LineSeparator from '../../../components/LineSeparator';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

export default class AccomodationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switches: [
        {
          id: 1,
          title: 'همه',
          value: true,
        },
        {
          id: 2,
          title: 'هتل آپارتمان',
          value: true,
        },
        {
          id: 3,
          title: 'خانه / اتاق',
          value: true,
        },
        {
          id: 4,
          title: 'خوابگاه',
          value: true,
        },
        {
          id: 5,
          title: 'هتل',
          value: true,
        },
        {
          id: 6,
          title: 'ریزورت',
          value: true,
        },
      ],
      itemSelect: 'همه',
      flag: true,
    };
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
  };

  componentDidMount() {
    this.props.navigation.getParam('selected');
    const selected = this.props.navigation.state.params.selected;
    this.setState({
      itemSelect: selected,
    });
    let arr = this.state.switches;
    let index = arr.findIndex(item => item.title === selected);

    if (index === 0) arr.forEach(item => item.value === true);
    else {
      arr.forEach(item => (item.value = false));
      arr[index].value = true;
      this.setState({
        flag: false,
      });
    }
  }

  render() {
    return (
      <Screen>
        <Header
          title="نوع محل اقامت"
          bottomBorder={true}
          rightIcon={require('../../../assets/icons/back-dark_1.png')}
          onPressRightIcon={() => {
            const {navigation} = this.props;
            this.itemSelected();

            navigation.goBack();
            navigation.state.params.onSelect(this.state.itemSelect);
          }}
        />
        <View>
          <FlatList
            data={this.state.switches}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <AppSwitch
                title={item.title}
                defaultValue={item.value}
                onPress={() => this.selection(item.id)}
              />
            )}
            ItemSeparatorComponent={() => <LineSeparator horizontal={true} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignSelf: 'center',
              width: responsiveWidth(89.3), //paddingHorizontal: 20
              marginTop: responsiveHeight(1.23), // 10
            }}
          />
        </View>
      </Screen>
    );
  }

  itemSelected() {
    let temp = this.state.switches;
    const selectedItem = temp.find(item => item.value === true);
    if (selectedItem) {
      this.setState({
        itemSelect: selectedItem.title,
      });
    }
  }

  selection(id) {
    let temp = this.state.switches;
    temp[id - 1].value = !temp[id - 1].value;
    if (temp[0].value && temp[0].value !== this.state.flag) {
      temp.forEach(item => (item.value = true));
      this.setState({
        flag: true,
      });
    } else if (!temp[0].value && temp[0].value !== this.state.flag) {
      temp.forEach(item => (item.value = false));
      this.setState({
        flag: false,
      });
    }
    if (id - 1 !== 0) {
      if (!temp[id - 1].value && this.state.flag) {
        temp.forEach(item => (item.value = false));
        this.setState({
          flag: false,
        });
      } else if (temp[id - 1].value && temp[id - 1].value !== this.state.flag) {
        for (let i = 0; i < this.state.switches.length; i++) {
          if (temp[i].value === true) {
            temp[i].value = false;
          }
        }
        temp[id - 1].value = true;
      }
    }
    const selectedItem = temp.find(item => item.value === true);
    if (selectedItem) {
      this.setState({
        itemSelect: selectedItem.title,
      });
    } else {
      this.setState({
        itemSelect: 'همه',
      });
    }
    this.setState({
      switches: temp,
    });
  }
}
