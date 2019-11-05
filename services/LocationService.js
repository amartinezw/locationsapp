import LocationServicesClient from './config/LocationServicesClient';
import LocationServicesConfig, { LOCATION_ENDPOINTS } from './config/LocationServicesConfig';
import { store as AppStore } from '../AppStore';
import * as LocationActions from './LocationActions';
import UserToken from '../models/UserToken';
import LocationModel from '../models/LocationModel';

export const getLocation = (userToken: UserToken, locationString: String) => LocationServicesClient.get(
  LOCATION_ENDPOINTS.SCAN_LOCATION+'?warehouse_id=1&mapped_string='+locationString,
  {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `${userToken.tokenType} ${userToken.accessToken}`,
    },
  },
)
  .then((response) => {      
      const locationModel = LocationModel.mapFromLocationServiceResponse(response.data);      
      AppStore.dispatch(LocationActions.updateLocationScanned(locationModel));
      Promise.resolve();
  })
  .catch((error) => {       
    console.log('There has been a problem with your fetch operation: ' + error.message);
      throw error;
  });

export const getLocationOfItem = (userToken: UserToken, sku: Number) => LocationServicesClient.get(
  LOCATION_ENDPOINTS.GET_LOCATIONS_OF_PRODUCT+'?sku='+sku,
  {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `${userToken.tokenType} ${userToken.accessToken}`,
    },
  },
)
  .then((response) => {      
      return Promise.resolve(response.data);
  })
  .catch((error) => {    
    return Promise.reject(new Error(error));
  });

  export const locateItem = (userToken: UserToken, locationString: String, sku: Number, withSiblings: Boolean) => LocationServicesClient.post(    
    LOCATION_ENDPOINTS.LOCATE_ITEM_SCAN,
    {
      warehouse_id: 1,
      mapped_string: locationString,
      sku: sku,
      withSiblings: withSiblings
    },
    {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `${userToken.tokenType} ${userToken.accessToken}`,
      },
    },
  )
    .then((response) => {      
      return Promise.resolve(response.data);
    })
    .catch((error) => {          
      console.log('There has been a problem with your fetch operation: ' + error.message);
      throw error;
    });

  export const removeItemFromLocation = (userToken: UserToken, warehouseLocation: Number, sku: Number, withSiblings: Boolean) => LocationServicesClient.post(    
    LOCATION_ENDPOINTS.REMOVE_ITEM_FROM_LOCATION_SCAN,
    {
      warehouse_id: 1,
      sku: sku,
      warehouselocation_id: warehouseLocation,
      withSiblings: withSiblings 
    },
    {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `${userToken.tokenType} ${userToken.accessToken}`,
      },
    },
  )
    .then((response) => {      
      return Promise.resolve(response.data);
    })
    .catch((error) => {    
      console.log('There has been a problem with your fetch operation: ' + error.message);
      throw error;
    });

