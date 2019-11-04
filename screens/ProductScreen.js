import React, { Component } from 'react';
import {
  View, ScrollView, Image, Alert, ActivityIndicator, Vibration
} from 'react-native';
import { Button, Card, Text, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { StackActions } from 'react-navigation-stack';
import ProductStyle from '../styles/ProductStyle';
import { navigationTypes, userActivitiesTypes, scannedOrderTypes } from '../types';
import { LOCATION_ENDPOINTS } from '../services/config/LocationServicesConfig';
import { getLocationOfItem, getLocation } from '../services/LocationService';
import UserToken from '../models/UserToken';
import emptyBox from '../assets/images/Box_Empty.png';

class ProductScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam('product').name}`,
  });
  
  state = {
    locationArray: [],
    isLoading: false
  };

  render() {
    const { navigation, userToken } = this.props;
    const { locationArray } = this.state;
    const renderVariationList = (variations: Array<Object>) => {
      if (variations) {
        return variations.map((variation, index) => {        
          return <ListItem
            key={index}        
            title={'Talla: '+variation.name}
            subtitle={'SKU: '+variation.sku+ ' Piezas: '+variation.stock}        
            bottomDivider
          />            
        });            
      } else {
        return true;
      }
    }
    const renderLocationButtons = (locations: Array<Object>) => {
      if (locations) {
        const PATTERN = [100, 100, 100, 100];
        return locations.map((location, index) => {
            return <Button
              key={'buttonLocation'+index}
              title={location.warehouselocation.mapped_string}
              onPress={() => {
                  getLocation(userToken, location.warehouselocation.mapped_string)
                    .then((response) => {                                
                      navigation.navigate('Location', {
                        mapped_string: location.warehouselocation.mapped_string
                      })
                      
                    })
                    .catch((error) => {
                      console.log(error)
                      Vibration.vibrate(PATTERN);
                      Alert.alert(
                        'Error al Escanear',
                        'No se encontró la ubicacion '+location.warehouselocation.mapped_string,
                        [{ text: 'Ok' }],
                        { cancelable: false },
                      );
                    });
                }
              }
            />         
          });

      } else {
        return true;
      }
    }
    let product = navigation.getParam('product');    
    return (
      <ScrollView>
        <Card style={{alignItems: 'center'}}>
          <Image
            source={product.firstimg.length > 0 ? {uri: LOCATION_ENDPOINTS.IMAGES_URL+product.firstimg[0].file} : emptyBox}
            style={{ width: 200, height: 200, alignItems: 'center' }}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text style={{marginBottom: 10}}>
            Estilo : {product.internal_reference+"\n"}
            Producto: {product.name+"\n"}
            Proveedor: {product.provider+"\n"}
            Color: {product.colors_es+"\n"}
            Depto: {product.parent_name+"\n"}
            Categoria: {product.family+"\n"}
          </Text>
          <View>
            {renderLocationButtons(product.locations)}
          </View>
          <View>
            {renderVariationList(product.variations)}
          </View>
        </Card>        
      </ScrollView>
    );
  }
}

ProductScreen.propTypes = {  
  navigation: navigationTypes.isRequired,
};
const mapStateToProps = (state: Object) => ({
  userToken: UserToken.mapFromJson(state.auth.userToken), 
});

export default connect(mapStateToProps)(ProductScreen);
