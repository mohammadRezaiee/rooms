import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {getFirebase, actionTypes as rrfActionTypes} from 'react-redux-firebase';
import {constants as rfConstants} from 'redux-firestore';

import reducer from './reducer';

const extraArgument = {
  getFirebase,
};

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        // just ignore every redux-firebase and react-redux-firebase action type
        ...Object.keys(rfConstants.actionTypes).map(
          type => `${rfConstants.actionsPrefix}/${type}`,
        ),
        ...Object.keys(rrfActionTypes).map(
          type => `@@reactReduxFirebase/${type}`,
        ),
      ],
      ignoredPaths: ['firebase', 'firestore'],
    },
    thunk: {
      extraArgument,
    },
  }),
];

export default function() {
  return configureStore({
    reducer,
    middleware,
  });
}
