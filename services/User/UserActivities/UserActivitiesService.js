import { Alert } from 'react-native';

import Sentry from 'sentry-expo';
import { store as AppStore } from '../../../../AppStore';
import ServicesClient from '../../config/ServicesClient';
import { USER_ENDPOINTS } from '../../config/ServicesConfig';
import * as UserActivitiesActions from './UserActivitiesActions';

import UserToken from '../../../models/UserToken';
import UserActivity from '../../../models/UserActivity';

// eslint-disable-next-line import/prefer-default-export
export const getUserHistory = (userToken: UserToken, dateToSearch: String) => ServicesClient.post(
  USER_ENDPOINTS.USER_HISTORY,
  {
    date: dateToSearch,
  },
  {
    headers: {
      Authorization: `${userToken.tokenType} ${userToken.accessToken}`,
    },
  },
)
  .then((response) => {
    const userActivities = [];

    response.data.user_activities.reverse().forEach((activity) => {
      if (activity.activity === 'picking') {
        userActivities.push(UserActivity.mapFromActivityServiceResponse(activity));
      }
    });
    AppStore.dispatch(UserActivitiesActions.updateUserActivities(userActivities));
    return Promise.resolve();
  })
  .catch((error) => {
    Sentry.captureException(
      new Error(
        JSON.stringify({
          service: 'getUserHistory',
          status: error.response.status,
          response: error.response.data,
        }),
      ),
    );
    Alert.alert('Error en el Servicio', 'No se pudieron obtener las actividades del usuario, intente mas tarde.');
    return Promise.reject();
  });
