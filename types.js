import PropTypes from 'prop-types';
import UserProfile from './models/UserProfile';
import LocationModel from './models/LocationModel';

const { shape, instanceOf, arrayOf } = PropTypes;

export const navigationTypes = shape({
  navigate: PropTypes.func.isRequired,
  getParam: PropTypes.func.isRequired,
});

export const scannedLocationTypes = instanceOf(LocationModel);
export const userProfileTypes = instanceOf(UserProfile);