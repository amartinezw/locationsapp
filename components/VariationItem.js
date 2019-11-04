import React from 'react';
import RF from 'react-native-responsive-fontsize';
import PropTypes from 'prop-types';
import { LOCATION_ENDPOINTS } from '../services/config/LocationServicesConfig';
import {
  Text, View, Image, TouchableOpacity,
} from 'react-native';

const VariationItem = ({
  variation,
}) => (
  <TouchableOpacity
    style={{
      flexDirection: 'row',
      borderBottomColor: '#c4c4c4',
      borderBottomWidth: 0.5,
    }}
  >
    <View
      style={{
        flex: 1,
      }}
    >{ variation.variation.product.images.length > 0 ?
      <Image source={{ uri: LOCATION_ENDPOINTS.IMAGES_URL+variation.variation.product.images[0].file }} style={{ width: 100, height: 100, resizeMode: 'contain' }} />
      : null
    }
    </View>
    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ flex: 2, alignItems: 'flex-end' }}>
          <Text
            style={{
              fontSize: RF(4),
              fontFamily: 'Roboto',
            }}
          >
            {`SKU: ${variation.variation.sku}`}
          </Text>
          <Text
            style={{
              fontSize: RF(4),
              fontFamily: 'Roboto',
            }}
          >
            {`${variation.variation.product.name}`}
          </Text>          
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text
            style={{
              fontSize: RF(4),
              fontFamily: 'RobotoMedium',
            }}
          >
            {variation.variation.name}
          </Text>
        </View>
      </View>

      
    </View>
  </TouchableOpacity>
);

export default VariationItem;
