import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HeaderButton = ({
  show, onPress, iconName, iconColor, iconSize,
}) => show && (
<TouchableOpacity onPress={onPress} style={{ paddingRight: 5 }}>
  <MaterialCommunityIcons name={iconName} color={iconColor} size={iconSize} />
</TouchableOpacity>
);

HeaderButton.defaultProps = {
  show: true,
  iconName: 'menu',
  iconColor: 'red',
  iconSize: 35,
};

HeaderButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  show: PropTypes.bool,
  iconName: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
};

export default HeaderButton;
