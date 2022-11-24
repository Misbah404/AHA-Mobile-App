import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {
  ButtonView,
  CountryNamePicker,
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  SearchComponent,
  TextInput,
} from '../../components';
import {filterScreenConsts, strings} from '../../constants';
import {AppStyles} from '../../theme';
import util from '../../util';
import styles from './Styles';

const getValueByType = (dataArray, type) => {
  let filteredArr = util.filterArray(dataArray, item =>
    util.areValuesEqual(item.type, type),
  );
  if (!util.isArrayEmpty(filteredArr)) {
    const dataObj = filteredArr[0];
    return dataObj?.title ?? '';
  }
  return '';
};

const FilterScreen = props => {
  const {
    setFilterDataObjectsCallBack = () => {},
    dataArray,
    searchText,
    setSearchText,
    onResetBtnPressCallBack,
  } = props || {};
  const [searchFieldText, setSearchFieldText] = useState(() => searchText);
  const stateRef = useRef(() => null);
  const cityRef = useRef(() => null);
  const [country, setCountry] = useState(
    getValueByType(dataArray, filterScreenConsts.COUNTRY),
  );
  const [state, setState] = useState(
    getValueByType(dataArray, filterScreenConsts.STATE),
  );
  const [city, setCity] = useState(
    getValueByType(dataArray, filterScreenConsts.CITY),
  );
  const [stateError, setStateError] = useState(() => '');
  const [cityError, setCityError] = useState(() => '');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const validation = () => {
    let isValid = true;
    Keyboard.dismiss();

    if (!util.isValidName(city)) {
      setCityError(strings.INVALID_CITY);
      cityRef?.current?.focus?.();
      isValid = false;
    }

    if (!util.isValidName(state)) {
      setStateError(strings.INVALID_STATE);
      stateRef?.current?.focus?.();
      isValid = false;
    }

    if (
      util.isEmptyValue(country) &&
      util.isEmptyValue(city) &&
      util.isEmptyValue(state)
    ) {
      util.topAlertError('Please Enter valid details to filter out the data!');
      isValid = false;
    }

    return isValid;
  };

  const onSubmit = () => {
    if (validation()) {
      if (!util.areValuesEqual(searchFieldText, searchText))
        setSearchText(searchFieldText);

      const filterDataObj = [];
      if (!util.isEmptyValue(country))
        filterDataObj.push({
          title: country,
          type: filterScreenConsts.COUNTRY,
        });
      if (!util.isEmptyValue(state))
        filterDataObj.push({
          title: state,
          type: filterScreenConsts.STATE,
        });
      if (!util.isEmptyValue(city))
        filterDataObj.push({
          title: city,
          type: filterScreenConsts.CITY,
        });

      setFilterDataObjectsCallBack(filterDataObj);

      Keyboard.dismiss();
      setTimeout(() => {
        Actions.pop();
      }, 100);
    }
  };

  const onResetPressHandler = () => {
    setCity('');
    setCountry('');
    setState('');
    onResetBtnPressCallBack();
  };

  const renderCustomNavBar = () => (
    <CustomNavbar
      title={strings.FILTER}
      titleStyle={AppStyles.titleStyleForLeft}
      hasBack
      leftRightButtonWrapperStyle={{justifyContent: 'center'}}
    />
  );

  const renderSearchComponent = () => (
    <SearchComponent
      isFilterIconDisable={true}
      value={searchFieldText}
      setSearchFieldText={setSearchFieldText}
    />
  );

  const renderCountryPickerField = () => (
    <CountryNamePicker
      _value={country}
      setCountry={setCountry}
      placeholder={strings.COUNTRY}
    />
  );

  const renderStateAndCityTextInput = () => (
    <>
      <TextInput
        label={strings.STATE}
        placeholder={strings.STATE}
        labelStyle={[styles.addressText, AppStyles.mTop25]}
        ref={stateRef}
        returnKeyType="next"
        value={state}
        onChangeText={val => {
          setStateError('');
          setState(val);
        }}
        error={stateError}
      />
      <TextInput
        label={strings.CITY}
        placeholder={strings.CITY}
        labelStyle={[styles.addressText, AppStyles.mTop25]}
        ref={cityRef}
        onSubmitEditing={onSubmit}
        value={city}
        onChangeText={val => {
          setCityError('');
          setCity(val);
        }}
        error={cityError}
      />
    </>
  );

  const renderBottomButtons = () => (
    <View style={styles.bottomBtnContainer}>
      <ButtonView onPress={onResetPressHandler} style={styles.buttonView}>
        <Text style={[styles.buttonText, styles.resetBtnText]}>
          {strings.RESET}
        </Text>
      </ButtonView>
      <ButtonView onPress={onSubmit} style={styles.buttonView}>
        <Text style={[styles.buttonText, styles.searchBtnText]}>
          {strings.SEARCH}
        </Text>
      </ButtonView>
    </View>
  );

  return (
    <>
      {renderCustomNavBar()}
      <View style={styles.container}>
        <View style={[AppStyles.mBottom10]}>{renderSearchComponent()}</View>

        <KeyboardAwareScrollViewComponent
          style={{flexGrow: 1}}
          scrollEnabled={true}>
          <View style={styles.view}>
            <View>
              {renderCountryPickerField()}
              {renderStateAndCityTextInput()}
            </View>
          </View>
          {!isKeyboardVisible && renderBottomButtons()}
        </KeyboardAwareScrollViewComponent>
      </View>
    </>
  );
};
FilterScreen.propTypes = {
  setFilterDataObjectsCallBack: PropTypes.object.isRequired,
  onResetBtnPressCallBack: PropTypes.func.isRequired,
};
FilterScreen.defaultProps = {};

const mapStateToProps = ({}) => ({});
export default connect(mapStateToProps, null)(FilterScreen);
