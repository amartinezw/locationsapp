import { Alert } from 'react-native';
import Sentry from 'sentry-expo';

import { AuthServicesClient } from '../../config/LocationServicesClient';
import LocationServicesConfig, { TOKEN_ENDPOINTS } from '../../config/LocationServicesConfig';

import UserToken from '../../../models/UserToken';

export const getUserToken = (username: String, password: String) => AuthServicesClient.post(TOKEN_ENDPOINTS.REQUEST_TOKEN, {
  grant_type: 'password',
  client_id: LocationServicesConfig.clientId,
  client_secret: LocationServicesConfig.clientSecret,
  username,
  password,
})
  .then(response => UserToken.mapFromServiceResponse(response))
  .catch((error) => {
    // Sentry.captureException(
    //   new Error(
    //     JSON.stringify({
    //       service: 'getUserToken',
    //       user: username,
    //       status: error.response.status,
    //       response: error.response.data,
    //     }),
    //   ),
    // );
    if (error.response && error.response.status === 401) {
      Alert.alert('Credenciales Invalidas', 'Ingrese un usuario y contraseña validos.');
    } else {
      console.log(error.response);
      Alert.alert('Error en el Servicio', 'No se pudo iniciar sesión, intente mas tarde.');
    }
    return Promise.reject();
  });

export const revokeUserToken = (userToken: UserToken) => AuthServicesClient.get(TOKEN_ENDPOINTS.REVOKE_TOKEN, {
  headers: {
    Authorization: `${userToken.tokenType} ${userToken.accessToken}`,
  },
})
  .then(() => Promise.resolve())
  .catch((error) => {
    Sentry.captureException(
      new Error(
        JSON.stringify({
          service: 'revokeUserToken',
          status: error.response.status,
          response: error.response.data,
        }),
      ),
    );
    Alert.alert('Error en el Servicio', 'No se pudo cerrar sesión, intente mas tarde.');
    return Promise.reject();
  });
