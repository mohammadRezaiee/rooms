import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import {BlurView} from '@react-native-community/blur';
import {connect} from 'react-redux';

import colors from '../config/colors';
import Header from './Header';
import CardView from './CardView';
import AppButton from './AppButton';
import SelectText from './SelectText';
import LineSeparator from './LineSeparator';
import {arrangeHotels} from '../store/hotles';

class ModalArrange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      featurs: [
        {
          id: 1,
          title: 'تعداد ستاره‌ها',
          isSelect: false,
        },
        {
          id: 2,
          title: 'قیمت',
          isSelect: false,
        },
        {
          id: 3,
          title: 'فاصله تا مکان شما',
          isSelect: false,
        },
        {
          id: 4,
          title: 'امتیاز',
          isSelect: false,
        },
      ],
      sortingBy: '',
    };
  }

  openModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  componentDidMount() {
    this.setState({
      modalVisible: this.props.isVisible,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.modalVisible && (
          <BlurView style={styles.container} blurType="dark" blurAmount={5} />
        )}
        <Modal
          isVisible={this.state.modalVisible}
          animationIn="fadeIn"
          animationOut="fadeOut"
          animationOutTiming={100}
          backdropColor={colors.white}
          backdropOpacity={0}
          style={styles.modal}>
          <Header
            bottomBorder={false}
            backgroundColor={colors.white}
            title="چیدمان"
            color={colors.white}
            rightIcon={require('../assets/icons/close-light.png')}
            onPressRightIcon={this.props.onChangeVisible}
            style={styles.header}
          />
          <View style={styles.content}>
            <CardView style={styles.cardRooms}>
              <FlatList
                data={this.state.featurs}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <SelectText
                    title={item.title}
                    onPress={() => this.selection(item.title)}
                    select={item.isSelect}
                  />
                )}
                ItemSeparatorComponent={() => (
                  <LineSeparator
                    horizontal={true}
                    style={{backgroundColor: '#BDBDBD'}}
                  />
                )}
                style={{width: '100%'}}
              />
            </CardView>
            <AppButton
              title="افزودن"
              borderColor={colors.purple}
              onPress={() => {
                this.props.onChangeVisible();
                this.props.sorting(this.state.sortingBy);
              }}
            />
          </View>
        </Modal>
      </View>
    );
  }

  selection(feature) {
    let temp = this.state.featurs;
    let select = '';
    const index = temp.findIndex(item => item.title === feature);
    temp[index].isSelect = true;
    select = temp[index].title;
    for (let i = 0; i < this.state.featurs.length; i++) {
      if (i !== index) {
        temp[i].isSelect = false;
      }
    }
    this.setState({
      feature: temp,
      sortingBy: select,
    });
  }
}

const styles = StyleSheet.create({
  cardRooms: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.semitransparent,
    marginBottom: 9,
    padding: 0,
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  content: {
    flexShrink: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  header: {
    position: 'absolute',
    top: 0,
  },
  modal: {
    justifyContent: 'center',
    margin: 0,
  },
  text: {
    fontFamily: 'Dana-DemiBold',
    fontSize: 12,
  },
});

const mapDispatchToProps = dispatch => ({
  sorting: sortedBy => dispatch(arrangeHotels(sortedBy)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ModalArrange);
