import * as UserActivitiesActionsTypes from './UserActivitiesActionsTypes';
import UserActivity from '../../../models/UserActivity';

const initialState = [];

export default (state: Array<UserActivity> = initialState, { type, payload }) => {
  switch (type) {
    case UserActivitiesActionsTypes.UPDATE_USER_ACTIVITIES:
      return payload;
    case UserActivitiesActionsTypes.DELETE_USER_ACTIVITIES:
      return initialState;

    default:
      return state;
  }
};
