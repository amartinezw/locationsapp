import React from 'react';
import RF from 'react-native-responsive-fontsize';
import {
  TouchableOpacity, Text, View, Image,
} from 'react-native';
import PropTypes from 'prop-types';

import picking from '../../assets/picking.png';
import { userActivityTypes } from '../types';

const ActivityItemList = ({ activity, onPress }) => (
  <TouchableOpacity
    onPress={() => onPress(activity)}
    style={{
      flex: 1,
      flexDirection: 'row',
      padding: '3%',
      borderBottomColor: '#c4c4c4',
      borderBottomWidth: 1,
    }}
  >
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={picking} />
    </View>
    <View
      style={{
        flex: 3,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: RF(3),
          color: '#7A7675',
          fontFamily: 'RobotoMedium',
          textAlign: 'center',
        }}
      >
        {activity.createdAt}
      </Text>

      {activity.status === 'completed' && (
        <Text
          style={{
            fontSize: RF(5),
            fontFamily: 'Roboto',
            textAlign: 'center',
            color: 'green',
          }}
        >
          Completado
        </Text>
      )}

      {activity.status === 'in_progress' && (
        <Text
          style={{
            fontSize: RF(5),
            fontFamily: 'Roboto',
            textAlign: 'center',
            color: 'orange',
          }}
        >
          En Progreso
        </Text>
      )}

      {activity.status === 'not_started' && (
        <Text
          style={{
            fontSize: RF(5),
            fontFamily: 'Roboto',
            textAlign: 'center',
            color: 'gray',
          }}
        >
          No Iniciada
        </Text>
      )}

      <Text
        style={{
          fontSize: RF(3),
          fontFamily: 'RobotoLight',
          textAlign: 'center',
        }}
      >
        {activity.order.orderKey}
      </Text>
    </View>
  </TouchableOpacity>
);

ActivityItemList.propTypes = {
  activity: userActivityTypes.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ActivityItemList;
