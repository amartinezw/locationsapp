import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RFPercentage from 'react-native-responsive-fontsize';

const FullButton = ({
  show, onPress, order, buttonColor, title, titleColor, titleSize, iconName, elevation, roundBorder,
}) => show && (
<TouchableOpacity
  onPress={onPress}
  style={{
    elevation,
    borderRadius: roundBorder,
    backgroundColor: buttonColor,
    paddingVertical: '4%',
  }}
>
  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
    <MaterialCommunityIcons name={iconName} color={titleColor} size={RFPercentage(titleSize + 1)} />
    <Text
      style={{
        color: titleColor,
        fontSize: RFPercentage(titleSize),
        alignSelf: 'center',
        fontFamily: 'Roboto',
        paddingLeft: 7,
      }}
    >
      {order}
      {title}
    </Text>
  </View>
</TouchableOpacity>
);

FullButton.defaultProps = {
  show: true,
  buttonColor: 'black',
  titleColor: 'white',
  titleSize: 3,
  elevation: 3,
  roundBorder: 3,
};

FullButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  show: PropTypes.bool,
  buttonColor: PropTypes.string,
  titleColor: PropTypes.string,
  titleSize: PropTypes.number,
  elevation: PropTypes.number,
  roundBorder: PropTypes.number,
};

export default FullButton;
