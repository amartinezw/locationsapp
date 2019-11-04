import { combineReducers } from 'redux';

import UserProfileReducer from './UserProfile/UserProfileReducer';

export default combineReducers({
  profile: UserProfileReducer,  
});
