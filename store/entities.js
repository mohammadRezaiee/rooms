import {combineReducers} from 'redux';

import user from './user';
import reserve from './reserve';
import hotels from './hotles';

export default combineReducers({
  user: user,
  reserve: reserve,
  hotels: hotels,
});
