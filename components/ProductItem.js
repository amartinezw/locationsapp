import React from 'react';
import RF from 'react-native-responsive-fontsize';
import PropTypes from 'prop-types';
import {
  Text, View, Image, TouchableOpacity,
} from 'react-native';
import { productTypes } from '../types';

const ProductItem = ({
  product, onPress, showLocation, statusActivity,
}) => (
  <TouchableOpacity
    onPress={() => onPress(product, showLocation, statusActivity)}
    style={{
      flexDirection: 'row',
      borderBottomColor: '#c4c4c4',
      borderBottomWidth: 0.5,

      //  paddingVertical: '2%',
    }}
  >
    <View
      style={{
        flex: 1,
      }}
    >
      <Image source={{ uri: product.photos[0] }} style={{ width: 100, height: 100, resizeMode: 'contain' }} />
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
            {`SKU: ${product.sku}`}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text
            style={{
              fontSize: RF(4),
              fontFamily: 'RobotoMedium',
            }}
          >
            {product.size}
          </Text>
        </View>
      </View>
      {showLocation && (
        <Text
          style={{
            fontSize: RF(4),
            fontFamily: 'RobotoMedium',
            color: 'blue',
          }}
        >
          {`${product.location.stand} - ${product.location.block} - ${product.location.floor}`}
        </Text>
      )}
      <Text
        style={{
          fontSize: RF(4),
          fontFamily: 'RobotoLight',
        }}
      >
        {product.categoryName}
      </Text>

      {statusActivity === 'completed' && (
        <Text
          style={{
            fontSize: RF(4),
            fontFamily: 'Roboto',
            color: 'green',
          }}
        >
          {`TOTAL: ${product.total}`}
        </Text>
      )}
      {statusActivity === 'in_progress'
        && (product.total === product.picked ? (
          <Text
            style={{
              fontSize: RF(4),
              fontFamily: 'Roboto',
              color: 'green',
            }}
          >
            {`TOTAL: ${product.picked} de ${product.total}`}
          </Text>
        ) : (
          <Text
            style={{
              fontSize: RF(4),
              fontFamily: 'Roboto',
              color: 'orange',
            }}
          >
            {`TOTAL: ${product.picked} de ${product.total}`}
          </Text>
        ))}
      {statusActivity === 'not_started' && (
        <Text
          style={{
            fontSize: RF(4),
            fontFamily: 'Roboto',
            color: 'gray',
          }}
        >
          {`TOTAL: ${product.total}`}
        </Text>
      )}
    </View>
  </TouchableOpacity>
);

ProductItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  product: productTypes.isRequired,
  showLocation: PropTypes.bool.isRequired,
  statusActivity: PropTypes.string.isRequired,
};

export default ProductItem;
