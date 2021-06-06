import React from 'react';
import {View, StyleSheet} from 'react-native';
import PN from 'persian-number';
import {connect} from 'react-redux'; //jg

import colors from '../config/colors';
import CalculatorNumber from './CalculatorNumber';
import CardView from './CardView';
import AppText from './AppText';
import LineSeparator from './LineSeparator';
import {addAdult, addChild, subAdult, subChild} from '../store/reserve';

class CardRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adult: 0,
      child: 0,
    };
  }

  componentDidMount() {
    this.setState({
      adult: this.props.adult,
      child: this.props.child,
    });
  }

  render() {
    return (
      <CardView style={styles.card}>
        <AppText style={styles.titleCard}>
          {PN.convertEnToPe('اتاق شماره ' + this.props.number)}
        </AppText>
        <View style={styles.container}>
          <CalculatorNumber
            start={this.props.rooms[this.props.number - 1].adult}
            min={0}
            plus={() => this.props.addAdult(this.props.number)}
            minus={() => this.props.subAdult(this.props.number)}
          />
          <AppText style={styles.text}>بزرگسال</AppText>
        </View>
        <LineSeparator horizontal={true} style={{backgroundColor: '#BDBDBD'}} />
        <View style={styles.container}>
          <CalculatorNumber
            start={this.props.rooms[this.props.number - 1].children}
            min={0}
            plus={() => this.props.addChild(this.props.number)}
            minus={() => this.props.subChild(this.props.number)}
          />
          <AppText style={styles.text}>کودک</AppText>
        </View>
      </CardView>
    );
  }

  addAdult() {
    const temp = this.state.adult + 1;
    this.setState({
      adult: temp,
    });
  }

  addChild() {
    const temp = this.state.child + 1;
    this.setState({
      child: temp,
    });
  }

  removeAdult() {
    const temp = this.state.adult - 1;
    this.setState({
      adult: temp,
    });
  }

  removeChild() {
    const temp = this.state.child - 1;
    this.setState({
      child: temp,
    });
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.semitransparent,
    marginTop: 10,
    padding: 0,
    width: '100%',
    marginBottom: 15,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  text: {
    fontFamily: 'Dana-DemiBold',
    fontSize: 12,
    color: colors.darkGray,
  },
  titleCard: {
    fontFamily: 'Dana-DemiBold',
    fontSize: 12,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
});

const mapStateToprops = state => ({
  rooms: state.entities.reserve.rooms,
});

const mapDispatchToprops = dispatch => ({
  addAdult: index => dispatch(addAdult(index)),
  subAdult: index => dispatch(subAdult(index)),
  addChild: index => dispatch(addChild(index)),
  subChild: index => dispatch(subChild(index)),
});

export default connect(
  mapStateToprops,
  mapDispatchToprops,
)(CardRoom);
