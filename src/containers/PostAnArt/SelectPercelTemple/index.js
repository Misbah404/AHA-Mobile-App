import PropTypes from 'prop-types';
import {View, Image, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {CustomNavbar} from '../../../components';
import {AppStyles, Colors, Images} from '../../../theme';
import {strings, parcelTempleData} from '../../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../../util';

export default function SelectPercelTemple(props) {
  const {
    setPercelTemplePerItem,
    addSizeItem,
    addSizeIndex,
    setAddSize,
    addSize,
    isFromMainShipment,
    setShipmentType,
    selectedShipment,
  } = props;
  const [selectedItem, setSelectedItem] = useState(() =>
    addSize ? addSizeItem?.template?.name : selectedShipment,
  );

  function clickOnItem(item) {
    if (isFromMainShipment) {
      setShipmentType(item);
      Actions.pop();
    } else {
      setPercelTemplePerItem(item);
      setSelectedItem(item?.name);
      const mAddSize = util.cloneDeepArray(addSize);

      mAddSize[addSizeIndex].template = {
        token: item?.token,
        name: item?.name,
      };
      setAddSize(mAddSize);
      Actions.pop();
    }
  }
  const renderPracelTemple = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={parcelTempleData}
        keyExtractor={(_, index) => index}
        contentContainerStyle={{marginVertical: 10, paddingBottom: 50}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                clickOnItem(item);
              }}
              style={{
                height: 50,
                marginHorizontal: 10,
                borderBottomColor: Colors.grey1,
                borderBottomWidth: 1,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text style={{color: Colors.white, marginLeft: 20, flex: 0.95}}>
                {item.name}
              </Text>
              {util.areValuesEqual(selectedItem, item?.name) && (
                <Image source={Images.rightIconLight}></Image>
              )}
            </TouchableOpacity>
          );
        }}
      />
    );
  };
  const renderCustomNavBar = (
    <CustomNavbar
      title={strings.CHOOSE_SHIPMENT_TYPE}
      titleStyle={AppStyles.titleStyleForCenter}
      leftRightButtonWrapperStyle={{justifyContent: 'center'}}
      hasBack
      leftBtnPress={() => {
        Actions.pop();
      }}
    />
  );
  return (
    <View style={styles.container}>
      {renderCustomNavBar}
      {renderPracelTemple()}
    </View>
  );
}

SelectPercelTemple.propTypes = {
  setPercelTemplePerItem: PropTypes.func,
  addSizeItem: PropTypes.object,
  addSizeIndex: PropTypes.any,
  setAddSize: PropTypes.func,
  addSize: PropTypes.object,
  isFromMainShipment: PropTypes.bool,
  setShipmentType: PropTypes.object,
};
SelectPercelTemple.defaultProps = {
  setPercelTemplePerItem: Function(),
  addSizeItem: {},
  addSizeIndex: 0,
  setAddSize: Function(),
  addSize: {},
  isFromMainShipment: false,
  setShipmentType: {},
};
