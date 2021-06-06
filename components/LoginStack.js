import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import WelcomeScreen from '../app/Welcome/WelcomeScreen';
import LoginScreen from '../app/Login/LoginScreen';
import SignUpScreenGoogle from '../app/SignUp/SignUpScreenGoogle';
import SignUpScreenEmail from '../app/SignUp/SignUpScreenEmail';
import ForgotPassword from '../app/ForgotPassword/ForgotPasswordScreen';

const loginStack = createStackNavigator(
  {
    Splash: {
      screen: WelcomeScreen,
    },
    Login: {
      screen: LoginScreen,
    },
    SignUp: {
      screen: SignUpScreenGoogle,
    },
    SignUpWithEmail: {
      screen: SignUpScreenEmail,
    },
    ForgotPassword: {
      screen: ForgotPassword,
    },
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
    mode: 'card',
  },
);

export default createAppContainer(loginStack);
