import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {BlurView} from '@react-native-community/blur';

import AppText from './AppText';
import AppIcon from './AppIcon';
import LineSeparator from './LineSeparator';

export default class SlideMenu extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    //const {navigation} = this.props;
    //const route = navigation.state;
    return (
      <SafeAreaView style={styles.menuContainer}>
        <BlurView
          style={styles.blurContainer}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.closeDrawer();
            }}>
            <View style={styles.humbergerContainer}>
              <AppIcon
                icon={require('../assets/icons/menu-dark.png')}
                width={20}
                height={20}
              />
            </View>
          </TouchableOpacity>
          <ScrollView>
            <View style={styles.textContent}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Tabs');
                  this.props.navigation.navigate('Setting');
                }}>
                <AppText style={styles.text}>تنظیمات</AppText>
              </TouchableOpacity>

              <LineSeparator horizontal={true} style={styles.line} />
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Tabs');
                  this.props.navigation.navigate('Setting');
                  this.props.navigation.navigate('PrivacyPolicy');
                }}>
                <AppText style={styles.text}>سیاست حفظ حریم خصوصی</AppText>
              </TouchableOpacity>
              <LineSeparator horizontal={true} style={styles.line} />
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Tabs');
                  this.props.navigation.navigate('Setting');
                  this.props.navigation.navigate('Supports');
                }}>
                <AppText style={styles.text}>پشتیبانی</AppText>
              </TouchableOpacity>
              <LineSeparator horizontal={true} style={styles.line} />
              <AppText style={styles.text}>ارتباط با ما</AppText>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginHorizontal: 35,
    marginTop: 25,
    width: '80%',
  },
  menuContainer: {
    flex: 1,
    borderTopLeftRadius: 35,
    overflow: 'hidden',
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  text: {
    fontFamily: 'Dana-Medium',
    fontSize: responsiveFontSize(2.46), //20
    marginVertical: 30,
  },
  textContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 110,
  },
  line: {
    backgroundColor: '#A480F7',
    marginRight: 15,
  },
  humbergerContainer: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
