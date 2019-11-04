import axios from 'axios';
import LocationServicesConfig from './LocationServicesConfig';

export const LocationServicesClient = axios.create({
  baseURL: LocationServicesConfig.baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const AuthServicesClient = axios.create({
  baseURL: LocationServicesConfig.baseAuthUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default LocationServicesClient;
