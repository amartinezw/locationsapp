import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  Image,
  Platform,
  Alert,
  ScrollView,
  StyleSheet,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Vibration,
} from 'react-native';
import { connect } from 'react-redux';
import { MonoText } from '../components/StyledText';
import LaserScannerStyle from '../styles/LaserScannerStyle';
import HeaderButton from '../components/HeaderButton';
import barCodeScanner from '../assets/images/barcode_scanner.png';
import UserToken from '../models/UserToken';
import { StackActions } from 'react-navigation-stack';
import { getLocationOfItem } from '../services/LocationService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }, 
  contentContainer: {
    paddingTop: 30,
  },
  
});

class HomeScreen extends Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'CCP - Ubicaciones',
      headerRight: <HeaderButton 
        onPress={() => {
          navigation.navigate('Menu');
        }}        
        iconName="account-settings"
        iconSize={30}
      />
    }
  };

  state = {
    'textInput': '',
  };

  inputScan;

  inputScanSetFocus = () => {
    this.inputScan.focus();
  }

  async componentDidMount() {    
    const { navigation } = this.props;    
    this.focusListener = navigation.addListener('didFocus', this.inputScanSetFocus);
  }

  componentWillUnmount() {
    this.focusListener.remove(this.inputScanSetFocus);
  }

  handleBarCodeScanned = (textInput: String) => {
    const PATTERN = [100, 100, 100, 100];
    const {navigation, userToken} = this.props;
    if (!Number(textInput) && textInput.length <= 9) {
      navigation.navigate('Location', {
        mapped_string: textInput
      })
    } else if(Number(textInput)) {
      getLocationOfItem(userToken,textInput)
        .then((response) => {
            Vibration.vibrate(250);                      
            navigation.navigate('Product', {
              product: response
            })          
        })
        .catch((error) => {          
          Vibration.vibrate(PATTERN);
          console.log(error);
          Alert.alert(
            'Error al Escanear',
            'No se encontró el SKU/Estilo '+textInput,
            [{ text: 'Ok', onPress: () => {
              this.inputScan.focus(); 
            } }],
            { cancelable: false },
          );
        });

    }     
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          
          <View style={LaserScannerStyle.content}>
            <Image style={LaserScannerStyle.image} source={barCodeScanner} />
            <TextInput
              ref={(input) => { this.inputScan = input; }}
              placeholder="Escanear Ubicacion/Producto"
              placeholderTextColor="#787575"
              style={LaserScannerStyle.input}
              autoFocus
              onFocus={() => Keyboard.dismiss()}
              value={this.state.textInput}  
              onChangeText={ (text) => {
                  if(this.searchWaiting)
                      clearTimeout(this.searchWaiting);
                  this.searchWaiting = setTimeout(() => {
                      this.searchWaiting = null;
                      this.handleBarCodeScanned(text);
                  }, 500);
                  
                }
              }
            />          
          </View>
        </ScrollView>
      </View>
    );  
  }

  
}

const mapStateToProps = (state: Object) => ({
  userToken: UserToken.mapFromJson(state.auth.userToken),  
});

export default connect(mapStateToProps)(HomeScreen);