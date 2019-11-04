import { store as AppStore } from '../AppStore';
import * as UserProfileActions from '../User/UserProfile/UserProfileActions';
import {
  getUserToken,
  // revokeUserToken
} from './UserToken/UserTokenService';
// import UserToken from '../../models/UserToken';
import { getUserProfile } from './UserProfileService';

export const loginUser = (email: String, password: String) => getUserToken(email, password)
  .then(userToken => getUserProfile(userToken)
    .then((userProfile) => {
      AppStore.dispatch(UserProfileActions.updateUserProfile(userProfile));      
    })
    .catch(() => {
      this.logoutDefault();
      Promise.reject();
    }))
  .catch(() => {
    this.logoutDefault();
    Promise.reject();
  });

export const logoutUser = () => {
  AppStore.dispatch(UserProfileActions.deleteUserProfile());
  AppStore.dispatch(UserActivitiesActions.deleteUserActivities());
  return Promise.resolve();
};
export const logoutDefault = () => {
  AppStore.dispatch(UserProfileActions.deleteUserProfile());
  AppStore.dispatch(UserActivitiesActions.deleteUserActivities());
};