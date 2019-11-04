import { store as AppStore } from '../../AppStore';
import * as UserTokenActions from './UserToken/UserTokenActions';
import * as UserProfileActions from '../User/UserProfile/UserProfileActions';
import {
  getUserToken,
} from './UserToken/UserTokenService';

import { getUserProfile } from '../User/UserProfile/UserProfileService';

export const loginUser = (email: String, password: String) => getUserToken(email, password)
  .then(userToken => getUserProfile(userToken)
    .then((userProfile) => {
      AppStore.dispatch(UserProfileActions.updateUserProfile(userProfile));
      AppStore.dispatch(UserTokenActions.updateUserToken(userToken));
    })
    .catch((error) => {
      console.log(error);
      this.logoutDefault();
      Promise.reject();
    }))
  .catch(() => {
    this.logoutDefault();
    Promise.reject();
  });

export const logoutUser = () => {
  AppStore.dispatch(UserProfileActions.deleteUserProfile());
  AppStore.dispatch(UserTokenActions.deleteUserToken());
  return Promise.resolve();
};
export const logoutDefault = () => {
  AppStore.dispatch(UserProfileActions.deleteUserProfile());
  AppStore.dispatch(UserTokenActions.deleteUserToken());
};