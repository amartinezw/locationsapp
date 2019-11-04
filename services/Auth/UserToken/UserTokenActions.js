import * as UserTokenActionsTypes from './UserTokenActionsTypes';
import UserToken from '../../../models/UserToken';

export const updateUserToken = (userToken: UserToken) => ({
  type: UserTokenActionsTypes.UPDATE_USER_TOKEN,
  payload: userToken,
});

export const deleteUserToken = () => ({
  type: UserTokenActionsTypes.DELETE_USER_TOKEN,
});
