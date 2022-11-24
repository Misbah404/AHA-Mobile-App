import {
  Image as RnImage,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {Colors, Images} from '../../theme';
import util from '../../util';
import styles from './styles';
export default function QuantityInputTextAndUpDown(props) {
  const {quantity, setQuantity, maxLimit, error} = props;
  const [value, setValue] = useState(() => 1);
  let value1 = 1;
  function renderUpDownAerrow() {
    return (
      <View style={{position: 'absolute', right: 0, bottom: 10}}>
        <View
          style={{
            justifyContent: 'center',
            width: 30,
          }}>
          <TouchableOpacity
            disabled={false}
            style={styles.plusWrapper}
            onPress={() => (value1 = value1 + 1)}
            activeOpacity={0.5}>
            <View style={[styles.roundBtn]}>
              <RnImage
                source={Images.topArrow}
                style={[
                  {width: 8, height: 8},
                  false
                    ? {tintColor: 'rgba(162, 165, 184,0.3)'}
                    : {tintColor: Colors.white},
                ]}
                resizeMode={'contain'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={false}
            style={[styles.minusWrapper]}
            onPress={() => {}}>
            <View style={[styles.roundBtn]}>
              <RnImage
                source={Images.topArrow}
                style={[
                  {
                    width: 8,
                    height: 8,
                    transform: [{rotate: '180deg'}],
                    marginTop: 7,
                  },
                  false
                    ? {tintColor: 'rgba(162, 165, 184,0.3)'}
                    : {tintColor: Colors.white},
                ]}
                resizeMode={'contain'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const renderQuatityInput = useMemo(() => {
    return (
      <TextInput
        keyboardType="numeric"
        placeholder={'Quatity'}
        value={value}
        onChangeText={value => {
          setValue(value);
        }}
        cursorColor={Colors.black}
        selectionColor={
          util.isPlatformAndroid() ? 'transparent' : Colors.text.primary
        }
        placeholderTextColor={Colors.text.secondary}
        style={{
          borderBottomColor: Colors.background.secondary,
          borderBottomWidth: 0.5,
          height: 50,
          color: Colors.white,
        }}
      />
    );
  }, [value]);

  const plusBtnClick = () => {
    setValue(value + 1);
  };

  return (
    <View>
      {renderQuatityInput}
      {renderUpDownAerrow()}
    </View>
  );
}
