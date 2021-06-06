import React from 'react';
import {Modal} from 'react-native';

import ListItem from '../components/ListItem';
import Header from './Header';

export default class AppPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  openModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  render() {
    return (
      <>
        <ListItem
          title={this.props.title}
          subtitle="تهران"
          onPress={() => this.openModal()}
        />
        <Modal
          visible={this.state.modalVisible}
          animationType="slide"
          style={{zIndex: -1}}>
          <Header
            title="استان"
            rightIcon={require('../assets/icons/menu-dark.png')}
          />
        </Modal>
      </>
    );
  }
}
