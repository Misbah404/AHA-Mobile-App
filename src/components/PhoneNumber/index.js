import PropTypes from 'prop-types';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Image} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {connect} from 'react-redux';
import {Text} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Colors, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

function PhoneNumber(props) {
  const {onNumberChange, error, setPhoneNoError, phoneRef, autoFocus} = props;
  const phoneInput = useRef(null);
  const [countryCode, setCountryCode] = useState(() => '+1');
  const [countryNumber, setCountryNumber] = useState(() => '');
  const {currentLocation} = props;
  const handlePhoneNumber = phoneNumber => {
    setPhoneNoError('');
    const numberData = {
      country_code: countryCode,
      number: phoneNumber,
    };
    onNumberChange(numberData);
  };

  useEffect(() => {
    setPhoneNoError('');
    const numberData = {
      country_code: countryCode,
      number: countryNumber,
    };
    onNumberChange(numberData);
  }, [countryCode, currentLocation]);

  const renderPhoneInput = useMemo(() => {
    return (
      <PhoneInput
        ref={phoneRef}
        defaultCode={currentLocation.countryCode}
        layout="first"
        onChangeText={phoneNumber => {
          setCountryNumber(phoneNumber);
          handlePhoneNumber(phoneNumber);
        }}
        renderDropdownImage={
          <Image source={Images.dropDownIcon} style={[styles.dropDownIcon]} />
        }
        flagButtonStyle={{
          width: 50,
        }}
        onChangeCountry={code => {
          setCountryCode(`+${code?.callingCode[0]}`);
        }}
        placeholder={strings.YOUR_NUMBER}
        containerStyle={styles.textInputContainer}
        codeTextStyle={styles._codeTextStyle}
        textInputStyle={[styles._textInputStyle]}
        textInputProps={{
          placeholderTextColor: Colors.grey3,
          cursorColor: Colors.text.primary,
          selectionColor: util.isPlatformAndroid()
            ? 'transparent'
            : Colors.text.primary,
        }}
        textContainerStyle={styles._textContainerStyle}
        withDarkTheme
        withShadow
        autoFocus={autoFocus}
      />
    );
  }, [currentLocation, phoneRef, phoneInput]);

  return (
    <>
      {renderPhoneInput}
      <Text
        type="medium"
        size="small"
        color={Colors.red}
        style={[AppStyles.mTop5]}>
        {error}
      </Text>
    </>
  );
}

PhoneNumber.propTypes = {
  setPhoneNoError: PropTypes.func,
};
PhoneNumber.defaultProps = {
  setPhoneNoError: () => {},
};

const mapStateToProps = ({general}) => ({
  currentLocation: general.currentLocation,
});
export default connect(mapStateToProps, null)(PhoneNumber);
