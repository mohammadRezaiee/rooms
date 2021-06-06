import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {BlurView} from '@react-native-community/blur';
import {connect} from 'react-redux';

import colors from '../config/colors';
import Header from './Header';
import AppButton from './AppButton';
import AppCalendar from './AppCalendar';
import {resetMarkedDates} from '../store/reserve';
import {selectedDate} from '../store/hotles';

class ModalCalendar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
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
          backdropColor={colors.black}
          backdropOpacity={0}
          style={styles.modal}>
          <Header
            bottomBorder={false}
            backgroundColor={colors.white}
            title="انتخاب تاریخ"
            color={colors.white}
            rightIcon={require('../assets/icons/close-light.png')}
            onPressRightIcon={() => {
              this.props.onChangeVisible();
              this.props.resetMarkedDates();
              const selectDates = {
                startDate: null,
                endDate: null,
              };
              this.props.selectedDate(selectDates);
            }}
            style={styles.header}
          />
          <View style={styles.content}>
            <AppCalendar />
            <View style={{width: '100%', marginHorizontal: 10}}>
              <AppButton
                title="انتخاب تاریخ"
                borderColor={colors.purple}
                onPress={() => {
                  if (this.props.markedDates === null) {
                    return null;
                  }

                  this.props.onChangeVisible();
                  const selectDates = {
                    startDate: this.props.startDate,
                    endDate: this.props.endDate,
                  };
                  this.props.selectedDate(selectDates);
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  addRoom() {
    let temp = this.state.rooms;
    let rooms = this.state.numberOfRooms + 1;
    const num = rooms;
    temp.push({
      id: num,
      adult: 0,
      children: 0,
    });
    this.setState({
      numberOfRooms: rooms,
      rooms: temp,
    });
  }

  deleteRoom() {
    let temp = this.state.rooms;
    let rooms = this.state.numberOfRooms - 1;
    temp.pop();
    this.setState({
      numberOfRooms: rooms,
      rooms: temp,
    });
  }

  addAdult(index) {
    let temp = this.state.rooms;
    temp[index] = {
      id: index,
      adult: temp['adult'] + 1,
      children: temp['children'],
    };
    this.setState({
      rooms: temp,
    });
    console.log('Hellow');
  }

  addChild(index) {
    let temp = this.state.rooms;
    temp[index] = {
      id: index,
      adult: temp['adult'],
      children: temp['children'] + 1,
    };
    this.setState({
      rooms: temp,
    });
  }

  removeAdult(index) {
    let temp = this.state.rooms;
    temp[index] = {
      id: index,
      adult: temp['adult'] - 1,
      children: temp['children'],
    };
    this.setState({
      rooms: temp,
    });
  }

  removeChild(index) {
    let temp = this.state.rooms;
    temp[index] = {
      id: index,
      adult: temp['adult'],
      children: temp['children'] - 1,
    };
    this.setState({
      rooms: temp,
    });
  }
}

const styles = StyleSheet.create({
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
    marginTop: 80,
    marginBottom: 20,
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

const mapStateToProps = state => ({
  startDate: state.entities.reserve.startDate,
  endDate: state.entities.reserve.endDate,
  markedDates: state.entities.reserve.markedDates,
  //user: state.entities.user,
});

const mapDispatchToProps = dispatch => ({
  resetMarkedDates: () => dispatch(resetMarkedDates()),
  selectedDate: dates => dispatch(selectedDate(dates)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalCalendar);
