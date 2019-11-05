import React, { Component } from 'react';
import {
  View,
  TextInput,
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
  Text,
  FlatList,
  ScrollView,
  Vibration,
  StyleSheet,
} from 'react-native';
import { ListItem, CheckBox } from 'react-native-elements'
import Constants from 'expo-constants';
import { StackActions } from 'react-navigation-stack';
import { connect } from 'react-redux';
import {
  navigationTypes,  scannedOrderTypes,
} from '../types';
import LaserScannerStyle from '../styles/LaserScannerStyle';
import ProductStyle from '../styles/ProductStyle';
import LocationModel from '../models/LocationModel';
import UserToken from '../models/UserToken';
import { getLocation, locateItem, removeItemFromLocation } from '../services/LocationService';
import barCodeScanner from '../assets/images/barcode_scanner.png';
import emptyBox from '../assets/images/Box_Empty.png';
import { LOCATION_ENDPOINTS } from '../services/config/LocationServicesConfig';

let skuGlobal = 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

class LocationScannerScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    if (navigation.getParam('actionType') == 'LOCATE_ITEM') {
      return { headerTitle: `Asignar a ${navigation.getParam('mapped_string')}`}
    } else {
      return { headerTitle: `Desasignar de ${navigation.getParam('mapped_string')}`}
    }
  };

  state = {
    textInput: '',
    isLoading: false,
    isText: true,
    skuArray: [],
    withSiblings: false,
  };

  inputScan;

  counter = 0;

  async componentDidMount() {    
    const { scannerLocation } = this.props;
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);    
    const variationList = scannerLocation.variations;
    this.counter = variationList.length;
    let tallas = [];
    var variations = variationList.map(function(item, index) { 
      let tallas = [];
      if (item.variations.length > 0) {
        item.variations.map((talla, index) => {
          tallas[index] = talla.name;
        });
        tallas = tallas.join(', ');
      }
               
      return {
        id: item.id, 
        product: item.name,
        sizes: tallas,
        internal_reference: item.internal_reference,        
      }; 
    });
    this.setState({ skuArray: variations});
  }

  componentWillUnmount() {  
    this.backHandler.remove(this.handleBackPress);
  }


  handleBarCodeScannedLocate = (textInput: String) => {
    const { skuArray, withSiblings } = this.state;
    const { scannerLocation, userToken } = this.props;
    const PATTERN = [100, 100, 100, 100];

    if (Number(textInput) && textInput.length >= 7) {
      
      locateItem(userToken, scannerLocation.mapped_string, textInput, withSiblings)
        .then((response) => {   
          Vibration.vibrate(100);             
          this.setState({ isLoading: false });
          if (withSiblings || textInput.length > 7) {
            let tallas = [];                                      
            response[0].variations.map(function(variation, index) {
              tallas[index] = variation.name;
            });  
            tallas = tallas.join(', ');                 
            let objIndex = skuArray.findIndex((obj => obj.id == response[0].id));
            if (objIndex >= 0) {
              skuArray[objIndex].sizes = tallas;
            } else {
              this.counter++;
              skuArray.push({
                id: response[0].id,
                product: response[0].name,
                sizes: tallas, 
                internal_reference: response[0].internal_reference
              });               
            }
          } else {
            let objIndex = skuArray.findIndex((obj => obj.id == response[0].id));            
            if (objIndex >= 0) {
              skuArray[objIndex].sizes += ', '+response[0].variations[0].name;
            } else {
              this.counter++;
              skuArray.push({
                id: response[0].id,
                product: response[0].name,
                sizes: response[0].variations[0].name, 
                internal_reference: response[0].internal_reference
              });                          
            }
          }
          this.setState({ skuArray: skuArray});
        
      })
      .catch((error) => {             
        if (error.response.status == 302) {
          Alert.alert(
            'Notificación',
            error.response.data.message+'. ¿Desea incluir los productos relacionados en esta ubicación?',
            [{ text: 'Descartar', onPress: () => this.setState({ isLoading: false }) },
            { text: 'Incluir', onPress: () => {
              this.setState({withSiblings: true});
              this.handleBarCodeScannedLocate(textInput);
            } }],
            { cancelable: false },
          );          
        } else {          
          Alert.alert(
            'Error al ubicar',
            error.response.data.message+' '+textInput,
            [{ text: 'Ok', onPress: () => this.setState({ isLoading: false }) }],
            { cancelable: false },
          );
        }
        
      });
    }
  };

  handleBarCodeScannedUnallocate = (textInput: String) => {
    const { skuArray, withSiblings } = this.state;
    const { scannerLocation, userToken } = this.props;
    const PATTERN = [100, 100, 100, 100];

    if (Number(textInput) && textInput.length >= 7) {            
      removeItemFromLocation(userToken, scannerLocation.id, textInput, withSiblings)
        .then((response) => {                    
          Vibration.vibrate(250);          
          this.setState({ isLoading: false });          
          var editIndex = skuArray.map(function(item) { return item.id; }).indexOf(response.message.product_id);          
          if (withSiblings || textInput.length > 7) {          
            this.counter--;  
            skuArray.splice(editIndex, 1);            
          } else {
            skuArray[editIndex].sizes = skuArray[editIndex].sizes.replace(response.message.deletedSize, '');
          }
          this.setState({ skuArray: skuArray});
        
      })
      .catch((error) => {        
        Vibration.vibrate(PATTERN);
        Alert.alert(
          'Error al Escanear',
          'No se encontró el producto en la ubicacion',
          [{ text: 'Ok', onPress: () => {
           this.setState({ isLoading: false });
           this.inputScan.focus(); 
          } }],
          { cancelable: false },
        );
      });
    }
  };

  onSelect = () => {
    
  } 

  renderSkuList = (skuArray: Array<Object>) => skuArray.map(sku => {
    return <ListItem
      key={sku.id}
      title={sku.product}
      rightTitle={sku.sizes}
      subtitle={sku.internal_reference}
      bottomDivider
    />
  });

  handleBackPress = () => {
    const { navigation, scannerLocation, userToken } = this.props;
    const PATTERN = [100, 100, 100, 100];    
    getLocation(userToken, scannerLocation.mapped_string)
      .then((response) => {          
          
      })
      .catch((error) => {        
        Vibration.vibrate(PATTERN);
        Alert.alert(
          'Error al Escanear',
          'No se encontró la ubicacion '+scannerLocation.mapped_string,
          [{ text: 'Ok', onPress: () => {} }],
          { cancelable: false },
        );
      });
  };

  render() {
    const { textInput, isLoading, isText, skuArray } = this.state;
    const { navigation, scannerLocation } = this.props;
    const actionType = navigation.getParam('actionType');
    let userActivity = null;
    userActivity = {
      location: scannerLocation,
    };
    return (
        <View>
          <View>
            {isLoading ? (
              <ActivityIndicator size="large" color="#4f4f4f" />
            ) : (
            <ScrollView>
              <CheckBox
                title='Incluir los productos relacionados'
                checked={this.state.withSiblings}
                onPress={() => {
                  this.inputScan.focus(); 
                  this.setState({withSiblings: !this.state.withSiblings});
                }}
              />
              <TextInput
                  ref={(input) => { this.inputScan = input; }}
                  placeholder={'Escanear SKU/Estilo'}
                  placeholderTextColor="#787575"
                  style={LaserScannerStyle.input}
                  autoFocus
                  onFocus={() => Keyboard.dismiss()}
                  value={textInput}
                  onChangeText={actionType == 'LOCATE_ITEM' ? this.handleBarCodeScannedLocate : this.handleBarCodeScannedUnallocate}
                /> 
              <Text style={{ fontSize: 24}}>{'Total de productos: '+this.counter}</Text>
              <View>
                <View>
                  {this.renderSkuList(skuArray)}
                </View>                
              </View>
            </ScrollView>              
            )}
          </View>
        </View>
    );
  }
}

LocationScannerScreen.propTypes = {
  navigation: navigationTypes.isRequired,
};

const mapStateToProps = (state: Object) => ({
  actionType: state.actionType,
  userToken: UserToken.mapFromJson(state.auth.userToken),  
  scannerLocation: state.scannedLocation === null ? null : LocationModel.mapFromJson(state.scannedLocation),
});

export default connect(mapStateToProps)(LocationScannerScreen);
