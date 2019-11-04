import * as UserActivitiesActionsTypes from './UserActivitiesActionsTypes';
import UserActivity from '../../../models/UserActivity';

export const updateUserActivities = (userActivities: Array<UserActivity>) => ({
  type: UserActivitiesActionsTypes.UPDATE_USER_ACTIVITIES,
  payload: userActivities,
});

export const deleteUserActivities = () => ({
  type: UserActivitiesActionsTypes.DELETE_USER_ACTIVITIES,
});
