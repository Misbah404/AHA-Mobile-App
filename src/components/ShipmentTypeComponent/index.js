import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Colors, Fonts, Images} from '../../theme';
import {Actions} from 'react-native-router-flux';
import {strings} from '../../constants';

export default function ShipmentTypeComponent(props) {
  const {
    setPercelTemplePerItem,
    item,
    index,
    setAddSize,
    addSize,
    isFromMainShipment,
    setShipmentType,
    shipmentType,
    selectedShipment,
  } = props;

  return (
    <View style={{marginTop: -5}}>
      <Text
        style={{
          color: '#A2A5B8',
          fontSize: 14,
          marginBottom: -5,
        }}>
        {strings.SHIPMENT_TYPE}
      </Text>
      <TouchableOpacity
        onPress={() =>
          Actions.selectPercelTemple({
            setPercelTemplePerItem,
            addSizeItem: item,
            addSizeIndex: index,
            setAddSize,
            addSize,
            isFromMainShipment,
            setShipmentType,
            selectedShipment,
          })
        }
        style={{
          width: '100%',
          height: 55,
          borderBottomColor: Colors.grey1,
          flexDirection: 'row',
          borderBottomWidth: 1,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: Colors.text.secondary,
            fontSize: Fonts.size.xSmall,
            fontFamily: Fonts.type.Asap,
            flex: 1,
            marginLeft: 12,
          }}>
          {isFromMainShipment ? shipmentType?.name : item.template?.name}
        </Text>
        <Image
          style={{
            transform: [{rotate: '180deg'}],
            marginRight: 5,
            width: 12,
            height: 15,
          }}
          source={Images.backButton}
          resizeMode={'center'}
          resizeMethod="scale"
        />
      </TouchableOpacity>
    </View>
  );
}

ShipmentTypeComponent.propTypes = {
  setPercelTemplePerItem: PropTypes.func,
  addSizeItem: PropTypes.object,
  addSizeIndex: PropTypes.any,
  setAddSize: PropTypes.func,
  addSize: PropTypes.object,
  isFromMainShipment: PropTypes.bool,
  setShipmentType: PropTypes.object,
};
ShipmentTypeComponent.defaultProps = {
  setPercelTemplePerItem: Function(),
  addSizeItem: {},
  addSizeIndex: 0,
  setAddSize: Function(),
  addSize: {},
  isFromMainShipment: false,
  setShipmentType: {},
};
