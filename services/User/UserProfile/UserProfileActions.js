import * as UserProfileActionsTypes from './UserProfileActionsTypes';
import UserProfile from '../../../models/UserProfile';

export const updateUserProfile = (userProfile: UserProfile) => ({
  type: UserProfileActionsTypes.UPDATE_USER_PROFILE,
  payload: userProfile,
});

export const deleteUserProfile = () => ({
  type: UserProfileActionsTypes.DELETE_USER_PROFILE,
});
