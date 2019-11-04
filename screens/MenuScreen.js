import React, { Component } from 'react';
import {
  View, Text, ActivityIndicator, Image, ScrollView, Switch, Button
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { store as AppStore } from '../AppStore';
import {  
  navigationTypes,
  userProfileTypes,
} from '../types';
import { logoutUser } from '../services/Auth/AuthService';
import * as AppJson from '../app.json';
import MenuStyle from '../styles/MenuStyle';

import UserToken from '../models/UserToken';
import FullButton from '../components/FullButton';
import UserProfile from '../models/UserProfile';
import profileImage from '../assets/images/profile.png';

class MenuScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Usuario y Configuración',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  onPressLogout = () => {
    const {
      // userToken,
      navigation: { navigate },
    } = this.props;

    this.setState({ isLoading: true });

    // logoutUser(userToken)
    logoutUser()
      .then(() => navigate('AuthStack'))
      .catch(() => this.setState({ isLoading: false }));
  };

  render() {
    const { isLoading } = this.state;
    const { userProfile, zebraScanner } = this.props;

    return (
      <ScrollView style={MenuStyle.container}>
        <View style={MenuStyle.menuContainer}>
          <View style={MenuStyle.menuCard}>
            <Text style={MenuStyle.cardTitle}>Usuario</Text>
            <Image style={MenuStyle.profileImage} source={profileImage} />
            <Text style={MenuStyle.profileTitle}>{userProfile.email}</Text>
            {userProfile.roles !== null && <Text style={MenuStyle.profileSubtitle}>{userProfile.roles[0].name}</Text>}
          </View>
          <View>
            {isLoading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Button
                iconName="logout"
                title="Cerrar Sesión"
                onPress={this.onPressLogout}
                titleColor="#515151"
                titleSize={3}
                buttonColor="none"
                elevation={0}
              />
            )}
          </View>
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <Text style={MenuStyle.versionText}>{`Version: ${AppJson.expo.version}`}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

MenuScreen.propTypes = {
  // userToken: userTokenTypes.isRequired,
  userProfile: userProfileTypes.isRequired,
  navigation: navigationTypes.isRequired,  
};

const mapStateToProps = (state: Object) => ({
  userToken: UserToken.mapFromJson(state.auth.userToken),
  userProfile: UserProfile.mapFromJson(state.user.profile),  
});

export default connect(mapStateToProps)(MenuScreen);
