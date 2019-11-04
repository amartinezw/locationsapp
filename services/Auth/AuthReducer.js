import { combineReducers } from 'redux';

import UserTokenReducer from './UserToken/UserTokenReducer';

export default combineReducers({
  userToken: UserTokenReducer,
});
