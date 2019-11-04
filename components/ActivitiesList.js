import React from 'react';
import { Text, View, FlatList } from 'react-native';
import RF from 'react-native-responsive-fontsize';
import PropTypes from 'prop-types';

import ActivityItemList from './ActivityItemList';
import { userActivitiesTypes } from '../types';

const ActivitiesList = ({ userActivities, onPressItem }) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
    }}
  >
    {userActivities.length > 0 ? (
      <FlatList
        data={userActivities}
        renderItem={({ item }) => <ActivityItemList activity={item} onPress={onPressItem} />}
        keyExtractor={(item, index) => index.toString()}
      />
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingTop: '40%',
          paddingBottom: '10%',
        }}
      >
        <Text
          style={{
            fontSize: RF(4),
            color: '#7A7675',
            textAlign: 'center',
            fontFamily: 'Roboto',
          }}
        >
          No hay actividades registradas
        </Text>
      </View>
    )}
  </View>
);

ActivitiesList.propTypes = {
  userActivities: userActivitiesTypes.isRequired,
  onPressItem: PropTypes.func.isRequired,
};

export default ActivitiesList;
