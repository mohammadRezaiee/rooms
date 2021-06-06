import React from 'react';
import {FlatList} from 'react-native';

import Screen from '../../../../components/Screen';
import Header from '../../../../components/Header';
import UserComment from '../../../../components/UserComment';

export default class ReviewsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.navigation.getParam('comments');
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
  };

  render() {
    return (
      <Screen>
        <Header
          title="نظرات"
          rightIcon={require('../../../../assets/icons/menu-dark.png')}
          onPressRightIcon={() => {
            this.props.navigation.openDrawer();
          }}
          bottomBorder={true}
        />
        <FlatList
          data={this.props.navigation.state.params.comments}
          keyExtractor={item => item.commentID.toString()}
          renderItem={({item}) => (
            <UserComment
              user={item.userName}
              date={item.commentDate}
              comment={item.review}
              score1={item.scoreLocation}
              score2={item.scoreCleaning}
              score3={item.scoreService}
              score4={item.scorePrice}
            />
          )}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTo: 10,
            paddingBottom: 90,
          }}
        />
      </Screen>
    );
  }
}
