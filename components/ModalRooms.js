import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import {BlurView} from '@react-native-community/blur';
import {connect} from 'react-redux';

import colors from '../config/colors';
import Header from './Header';
import CardView from './CardView';
import AppButton from './AppButton';
import AppText from './AppText';
import CalculatorNumber from './CalculatorNumber';
import CardRoom from './CardRoom';
import {
  addRooms,
  deleteRooms,
  resetRooms,
  calculatePeople,
} from '../store/reserve';
import {setCapacity, filterHotels} from '../store/hotles';

class ModalRooms extends React.PureComponent {
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
          backdropOpacity={this.props.opacity || 0}
          style={styles.modal}>
          <Header
            bottomBorder={false}
            backgroundColor={colors.white}
            title="تعداد اتاق"
            color={colors.white}
            rightIcon={require('../assets/icons/close-light.png')}
            onPressRightIcon={() => {
              this.props.onChangeVisible();
              this.props.resetRooms();
              const rooms = [
                {
                  id: 1,
                  adult: 0,
                  children: 0,
                },
              ];
              this.props.setCapacity(rooms);
            }}
            style={styles.header}
          />
          <View style={styles.content}>
            <CardView style={styles.cardRooms}>
              <CalculatorNumber
                start={this.props.reserve.numberOfRooms}
                min={1}
                plus={() => this.props.addRooms()}
                minus={() => this.props.deleteRooms()}
              />
              <AppText style={styles.text}>اتاق‌ها</AppText>
            </CardView>
            <FlatList
              data={this.props.reserve.rooms}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <CardRoom
                  number={item.id}
                  adult={item.adult}
                  child={item.children}
                />
              )}
              style={{width: '100%'}}
            />
            <View style={{width: '100%', marginHorizontal: 10}}>
              <AppButton
                title="افزودن"
                borderColor={colors.purple}
                onPress={() => {
                  for (let i = 0; i < this.props.reserve.rooms.length; i++) {
                    if (
                      this.props.reserve.rooms[i].adult === 0 &&
                      this.props.reserve.rooms[i].children === 0
                    ) {
                      return null;
                    }
                  }

                  this.props.onChangeVisible();
                  this.props.calculatePeople();
                  this.props.setCapacity(this.props.reserve.rooms);
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardRooms: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.semitransparent,
    marginBottom: 9,
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
  reserve: state.entities.reserve,
  filters: state.entities.hotels.filters,
});

const mapDispatchToProps = dispatch => ({
  //addNumberOfRooms: value => dispatch(addNumberOfRooms(value)),
  addRooms: () => dispatch(addRooms()),
  deleteRooms: () => dispatch(deleteRooms()),
  resetRooms: () => dispatch(resetRooms()),
  calculatePeople: () => dispatch(calculatePeople()),
  setCapacity: num => dispatch(setCapacity(num)),
  filterHotels: filters => dispatch(filterHotels(filters)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalRooms);
