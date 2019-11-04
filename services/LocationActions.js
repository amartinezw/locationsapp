import * as LocationActionsTypes from './LocationActionsTypes';
import LocationModel from '../models/LocationModel';

// eslint-disable-next-line import/prefer-default-export
export const updateLocationScanned = (location: LocationModel) => ({
  type: LocationActionsTypes.UPDATE_SCANNED_LOCATION,
  payload: location,
});

export const updateLocatedItems = (sku: Number) => ({
  type: 'locateitemscan/LOCATED',
  payload: sku,
});

export const updateProducts = (Product: Array<Object>) => ({
  type: 'getproductlocations',
  payload: Product,
});
