import * as LocationActionsTypes from './LocationActionsTypes';
import LocationModel from '../models/LocationModel';

const initialState = {
  variations: [],
};

export default (state: Location = initialState, { type, payload }) => {
  switch (type) {
    case LocationActionsTypes.UPDATE_SCANNED_LOCATION:
      return payload;

    default:
      return state;
  }
};
