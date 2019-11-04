import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { RFPercentage } from 'react-native-responsive-fontsize';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  inputText: {
    flex: 1,
    borderColor: 'white',
    borderBottomWidth: 1,
    color: 'white',
    fontSize: RFPercentage(3),
    fontFamily: 'Roboto',
  },
  inputIcon: {
    color: '#cecece',
    fontSize: RFPercentage(5),
    paddingRight: 10,
  },
});

const PasswordInput = ({
  password, onChangePassword, hidePassword, togglePassword,
}) => (
  <View style={style.container}>
    <TextInput
      style={style.inputText}
      placeholder="Contraseña"
      value={password}
      onChangeText={onChangePassword}
      secureTextEntry={hidePassword}
      autoCorrect={false}
      autoCompleteType="off"
      autoCapitalize="none"
    />
    <MaterialCommunityIcons
      style={style.inputIcon}
      name={hidePassword ? 'eye' : 'eye-off'}
      onPress={togglePassword}
    />
  </View>
);

PasswordInput.propTypes = {
  password: PropTypes.string.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  togglePassword: PropTypes.func.isRequired,
  hidePassword: PropTypes.bool.isRequired,
};

export default PasswordInput;
