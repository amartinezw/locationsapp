import UserToken from '../../../models/UserToken';
import * as UserTokenActionsTypes from './UserTokenActionsTypes';

const initialState = new UserToken(null, null, null, null, null);

export default (state: UserToken = initialState, { type, payload }) => {
  switch (type) {
    case UserTokenActionsTypes.UPDATE_USER_TOKEN:
      return payload;

    case UserTokenActionsTypes.DELETE_USER_TOKEN:
      return initialState;

    default:
      return state;
  }
};
