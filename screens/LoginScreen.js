import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Button,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import logoApp from '../assets/images/location.png';
import LoginStyle from '../styles/LoginStyle';
import PasswordInput from '../components/PasswordInput';

import { navigationTypes } from '../types';
import { loginUser } from '../services/Auth/AuthService';

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      hidePassword: true,
    };
    this.emailRef = null;
    this.passwordRef = null;
  }

  onPressLogin = () => {
    const { email, password } = this.state;
    const {
      navigation: { navigate },
    } = this.props;

    if (email === '' || password === '') {
      if (email === '') {
        this.emailRef.shake(500);
      }
      if (password === '') {
        this.passwordRef.shake(500);
      }
    } else {
      this.setState({ isLoading: true });
      Keyboard.dismiss();
      loginUser(email, password)
        .then(() => navigate('AppStack'))
        .catch(() => this.setState({ isLoading: false }));
    }
  };

  togglePassword = () => {
    const { hidePassword } = this.state;
    this.setState({ hidePassword: !hidePassword });
  };

  render() {
    const {
      email, password, hidePassword, isLoading,
    } = this.state;
    return (
      <KeyboardAvoidingView style={LoginStyle.container} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={LoginStyle.loginScreen}>
            <View style={LoginStyle.loginHeader}>
              <Text style={LoginStyle.headerTitle}>CCP Warehouse Suite</Text>
              <Image style={LoginStyle.image} source={logoApp} />
              <Text style={LoginStyle.imageSubTitle}>Locations</Text>
            </View>
            <View style={LoginStyle.loginForm}>
              <Animatable.View ref={ref => (this.emailRef = ref)} style={LoginStyle.loginInput}>
                <MaterialCommunityIcons style={LoginStyle.inputIcon} name="email" />
                <TextInput
                  style={LoginStyle.inputText}
                  placeholder="Correo"
                  value={email}
                  onChangeText={email => this.setState({ email })}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!isLoading}
                />
              </Animatable.View>
              <Animatable.View ref={ref => (this.passwordRef = ref)} style={LoginStyle.loginInput}>
                <MaterialCommunityIcons style={LoginStyle.inputIcon} name="key" />
                <PasswordInput
                  password={password}
                  onChangePassword={password => this.setState({ password })}
                  hidePassword={hidePassword}
                  togglePassword={this.togglePassword}
                />
              </Animatable.View>
              {isLoading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Button iconName="login" title="Iniciar Sesión" onPress={this.onPressLogin} />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

LoginScreen.propTypes = {
  navigation: navigationTypes.isRequired,
};
