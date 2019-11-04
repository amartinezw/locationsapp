import { combineReducers } from 'redux';

import AuthReducer from './services/Auth/AuthReducer';
import UserReducer from './services/User/UserReducer';
import LocationReducer from './services/LocationReducer';

export default combineReducers({  
  auth: AuthReducer,
  user: UserReducer,  
  scannedLocation: LocationReducer,
});
