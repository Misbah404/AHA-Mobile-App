import React from 'react';
import {View} from 'react-native';
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import {TextInput} from '..';
import {strings} from '../../constants';
import {Images} from '../../theme';
import styles from './styles';

export default function CountryNamePicker(props) {
  const {
    _value,
    setCountry,
    _error,
    placeholder = strings.SELECT_YOUR_COUNTRY,
  } = props || {};
  return (
    <>
      <TextInput
        label={strings.COUNTRY}
        labelStyle={styles.textInputLabel}
        value={_value}
        error={_error}
        editable={false}
        pointerEvents="none"
        placeholder={placeholder}
        rightIcon={Images.dropDownIcon}
      />
      <View style={styles.countryPickerCont}>
        <CountryPicker
          theme={DARK_THEME}
          withFilter={true}
          placeholder={''}
          {...{
            country: _value,
            onSelect: country => setCountry(country?.name ?? ''),
          }}
          containerButtonStyle={styles.countryBtnPickerStyle}
        />
      </View>
    </>
  );
}
