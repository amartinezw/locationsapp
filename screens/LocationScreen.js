import React, { Component } from 'react';
import {
  View, ScrollView, Image, Alert, ActivityIndicator, Vibration
} from 'react-native';
import { connect } from 'react-redux';

import { ListItem, Button, Text } from 'react-native-elements'
import ProductStyle from '../styles/ProductStyle';
import { navigationTypes, userActivitiesTypes, scannedLocationTypes } from '../types';
import { StackActions } from 'react-navigation';
import VariationItem from '../components/VariationItem';
import LocationModel from '../models/LocationModel';
import UserToken from '../models/UserToken';
import { LOCATION_ENDPOINTS } from '../services/config/LocationServicesConfig';
import { getLocation, getLocationOfItem } from '../services/LocationService';
import emptyBox from '../assets/images/Box_Empty.png';

class LocationScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Ubicacion ${navigation.getParam('mapped_string')}`,
    }
  };
  state = {
    isLoading: true,
  };

  loadLocationData = () => {
    const { navigation, userToken } = this.props;
    const PATTERN = [100, 100, 100, 100];
    this.setState({'isLoading': true});
    getLocation(userToken, navigation.getParam('mapped_string'))
      .then(() => {
        this.setState({'isLoading': false});
      })
      .catch((error) => {        
        Vibration.vibrate(PATTERN);
        Alert.alert(
          'Error',
          'No se encontró la ubicacion '+navigation.getParam('mapped_string'),
          [{ text: 'Ok'}],
          { cancelable: false },
        );
      });
  }

  async componentDidMount() {    
    const { navigation } = this.props;
    const PATTERN = [100, 100, 100, 100];
    this.focusListener = navigation.addListener('didFocus', this.loadLocationData);
  }

  componentWillUnmount() {
    this.focusListener.remove(this.loadLocationData);
  }

  renderVariationList = (variationList: Array<Object>) => {
    const { navigation, userToken } = this.props;
    return variationList.map((variation, index) => {  
        let tallas = [];
        if (variation.variations.length > 0) {
          variation.variations.map((talla, index) => {
            tallas[index] = talla.name;
          });
          tallas = tallas.join(', ');
        }  
        return <ListItem
          key={index}
          leftAvatar={{ size:"xlarge", rounded: false, source: variation.images.length > 0 ? { uri: LOCATION_ENDPOINTS.IMAGES_URL+variation.images[0].file } : emptyBox }}
          title={'Producto: '+variation.name}
          subtitle={variation.internal_reference+' TALLAS: '+tallas}
          onPress={() => {
            getLocationOfItem(userToken, variation.internal_reference)
              .then((response) => {                                  
                  navigation.navigate('Product', {
                    product: response
                  })          
              })
              .catch((error) => {                          
                console.log(error);
                Alert.alert(
                  'Error al Escanear',
                  'No se encontró el SKU/Estilo '+variation.internal_reference,
                  [{ text: 'Ok', onPress: () => {
                    
                  } }],
                  { cancelable: false },
                );
              });
          }}
          bottomDivider
        />            
      });    
  } 

  render() {
    const { navigation, userActivities, scannerLocation } = this.props;
    const { isLoading } = this.state;
    const serviceRequest = navigation.getParam('response');    
    
    return (
        <ScrollView style={ProductStyle.container}>   
          
          <View>
            <View style={ProductStyle.letterSpace} />          
            <View style={ProductStyle.fixToText}>            
              <View style={ProductStyle.letterSpace} />
              <Button
                title="Ubicar SKU aqui"
                onPress={() => {
                    this.props.navigation.navigate('LocationScanner', {
                      serviceRequest: 'location',
                      actionType: 'LOCATE_ITEM',
                      mapped_string: scannerLocation.mapped_string
                    })
                  }
                }
              />
              <Button
                title="Quitar SKU de aqui"
                type="outline"
                onPress={() => {                  
                    this.props.navigation.navigate('LocationScanner', {
                      serviceRequest: 'location',
                      actionType: 'UNALLOCATE_ITEM',
                      mapped_string: scannerLocation.mapped_string
                    })
                  }
                }
              />
              <View style={ProductStyle.letterSpace} />
            </View>
            <View>
              <View style={ProductStyle.letterSpace} />
              <Text>{'Productos ubicados en : '+scannerLocation.mapped_string}</Text>
            </View>
            {isLoading ? ( 
              <View style={{flex: 1,justifyContent: 'center',alignContent: 'center'}}>
                <ActivityIndicator size="large" color="#4f4f4f" />
              </View> 
            ) : (
            <View>
              <View style={ProductStyle.letterSpace} />
              {this.renderVariationList(scannerLocation.variations)}    
            </View>
            )}   
          </View>                       
        </ScrollView>
      
    );
  }
}

LocationScreen.propTypes = {
  navigation: navigationTypes.isRequired,
  scannerLocation: scannedLocationTypes.isRequired
};
const mapStateToProps = (state: Object) => ({  
  userToken: UserToken.mapFromJson(state.auth.userToken), 
  scannerLocation: state.scannedLocation === null ? null : LocationModel.mapFromJson(state.scannedLocation),
});

export default connect(mapStateToProps)(LocationScreen);
