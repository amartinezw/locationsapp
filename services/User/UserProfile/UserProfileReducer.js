import UserProfile from '../../../models/UserProfile';
import * as UserProfileActionsTypes from './UserProfileActionsTypes';

const initialState = new UserProfile(null, null, null, null);

export default (state: UserProfile = initialState, { type, payload }) => {
  switch (type) {
    case UserProfileActionsTypes.UPDATE_USER_PROFILE:
      return payload;

    case UserProfileActionsTypes.DELETE_USER_PROFILE:
      return initialState;

    default:
      return state;
  }
};
