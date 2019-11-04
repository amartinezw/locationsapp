import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { store as AppStore } from '../AppStore';
import * as UserTokenActions from '../services/Auth/UserToken/UserTokenActions';
import * as UserProfileActions from '../services/User/UserProfile/UserProfileActions';

import { navigationTypes } from '../types';
import UserToken from '../models/UserToken';

export default class AuthLoading extends Component {
  constructor(props) {
    super(props);
    this.loadStoredUserToken();
  }

  loadStoredUserToken = async () => {
    const {
      navigation: { navigate },
    } = this.props;

    const userToken = await UserToken.mapFromJson(AppStore.getState().auth.userToken);

    if (userToken.isNotNull() && userToken.isAlive()) {
      navigate('AppStack');
    } else {
      AppStore.dispatch(UserTokenActions.deleteUserToken());
      AppStore.dispatch(UserProfileActions.deleteUserProfile());
      navigate('AuthStack');
    }
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black' }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
}

AuthLoading.propTypes = {
  navigation: navigationTypes.isRequired,
};
