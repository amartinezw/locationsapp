import { Alert } from 'react-native';

import Sentry from 'sentry-expo';
import LocationServicesClient from '../../config/LocationServicesClient';
import { USER_ENDPOINTS } from '../../config/LocationServicesConfig';

import UserToken from '../../../models/UserToken';
import UserProfile from '../../../models/UserProfile';

// eslint-disable-next-line import/prefer-default-export
export const getUserProfile = (userToken: UserToken) => {  
  return LocationServicesClient.get(
    USER_ENDPOINTS.USER_PROFILE,
    {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `${userToken.tokenType} ${userToken.accessToken}`,
      },
    },
  )
    .then((response) => {      
      return UserProfile.mapFromServiceResponse(response);            
    })
    .catch((error) => {
      // Sentry.captureException(
      //   new Error(
      //     JSON.stringify({
      //       service: 'getUserProfile',
      //       status: error.response.status,
      //       response: error.response.data,
      //     }),
      //   ),
      // );
      console.log(error);
      if (error.response && error.response.status === 401) {
        Alert.alert('Credenciales Invalidas', 'Ingrese un usuario y contraseña validos.');
      } else {
        Alert.alert('Error en el Servicio', 'No se pudo obtener la información del usuario, intente mas tarde.');
      }
      return Promise.reject();
    }); 
}
