/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './src/app.json';
import React from 'react';
import {Provider} from 'react-redux';

import configureStore from './store/configureStore';

const store = configureStore();

const connector = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => connector);
