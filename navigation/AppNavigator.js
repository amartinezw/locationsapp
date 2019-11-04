import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import LocationScreen from '../screens/LocationScreen';
import LoginScreen from '../screens/LoginScreen';
import AuthLoading from '../screens/AuthLoading';
import LocationScannerScreen from '../screens/LocationScannerScreen';
import ProductScreen from '../screens/ProductScreen';
import MenuScreen from '../screens/MenuScreen';

const AuthStack = createStackNavigator({
  Login: { screen: LoginScreen },
});

const AppStack = createStackNavigator(
    {
      Home: HomeScreen,
      Location: LocationScreen,
      LocationScanner: LocationScannerScreen,
      Product: ProductScreen,
      Menu: MenuScreen,
    },
    {
      initialRouteName: 'Home',
    }
  );

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading,
      AppStack,
      AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);