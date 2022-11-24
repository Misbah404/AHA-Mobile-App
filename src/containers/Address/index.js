import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {
  allAddressesRequest,
  createAddressRequest,
  selectDefaultAddressRequest,
} from '../../actions/UserActions';
import {
  AddressComponent,
  CountryNamePicker,
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  Loader,
  TextInput,
} from '../../components';
import {strings} from '../../constants';
import {mixpanel} from '../../helpers/mixpanelHelper';
import {AppStyles, Colors, Images} from '../../theme';
import util from '../../util';
import styles from './Styles';

function Address(props) {
  const {address_list} = props;
  const dispatch = useDispatch();
  const [selectedAddressId, setSelectedAddressId] = useState(() => '');
  const titleRef = useRef(() => null);
  const stateRef = useRef(() => null);
  const addressRef = useRef(() => null);
  const cityRef = useRef(() => null);
  const streetRef = useRef(() => null);
  const zipRef = useRef(() => null);
  const [title, setTitle] = useState(() => '');
  const [country, setCountry] = useState(() => 'United States');
  const [state, setState] = useState(() => '');
  const [address, setAddress] = useState(() => '');
  const [city, setCity] = useState(() => '');
  const [street, setStreet] = useState(() => '');
  const [zip, setZip] = useState(() => '');
  const [isLoading, setLoading] = useState(() => false);
  const [isAddNewAddress, setAddNewAddress] = useState(() => false);
  const [Errortitle, setTitleError] = useState(() => '');
  const [countryError, setCountryError] = useState(() => '');
  const [stateError, setStateError] = useState(() => '');
  const [addressError, setAddressError] = useState(() => '');
  const [cityError, setCityError] = useState(() => '');
  const [streetError, setStreetError] = useState(() => '');
  const [zipError, setZipError] = useState(() => '');
  const [isLoadingAddress, setIsLoadingAddress] = useState(() => false);

  useEffect(() => {
    setLoading(true);
    dispatch(
      allAddressesRequest({}, res => {
        setLoading(false);
      }),
    );
  }, []);

  const validation = () => {
    let validate = true;
    setAddressError('');
    setTitleError('');
    setStateError('');
    setCountryError('');

    // if (util.isEmptyValue(address)) {
    //   setAddressError(strings.REQUIRED_FIELD);
    //   addressRef?.current?.focus?.();
    //   validate = false;
    // }

    if (util.isEmptyValue(state)) {
      setStateError(strings.REQUIRED_FIELD);
      validate = false;
    } else if (!util.isValidName(state)) {
      setStateError(strings.INVALID_STATE);
      validate = false;
    }

    // if (util.isEmptyValue(country)) {
    //   setCountryError(strings.REQUIRED_FIELD);
    //   validate = false;
    // }

    if (util.isEmptyValue(title)) {
      setTitleError(strings.REQUIRED_FIELD);
      validate = false;
    }
    if (util.isEmptyValue(city)) {
      setCityError(strings.REQUIRED_FIELD);
      validate = false;
    }
    if (util.isEmptyValue(street)) {
      setStreetError(strings.REQUIRED_FIELD);
      validate = false;
    }
    if (util.isEmptyValue(zip)) {
      setZipError(strings.REQUIRED_FIELD);
      validate = false;
    }
    Keyboard.dismiss();
    return validate;
  };

  const onSubmit = () => {
    if (validation()) {
      setIsLoadingAddress(true);

      const payload = {
        title: title,
        country,
        state,
        city,
        street,
        zip,
      };

      dispatch(
        createAddressRequest(payload, res => {
          setIsLoadingAddress(false);
          if (!!res?.status ?? false) {
            setAddNewAddress(!isAddNewAddress);
            setState('');
            setTitle('');
            setZip('');
            setStreet('');
            setCity('');
          }
        }),
      );
    }
  };

  function defaultSelect(id) {
    const payload = {
      id,
    };
    dispatch(
      selectDefaultAddressRequest(payload, res => {
        setLoading(false);
        if (res) {
          setSelectedAddressId(id);
        }
      }),
    );
  }

  const renderAddress = useMemo(() => {
    return (
      <View>
        <Text style={styles.address}>Address</Text>
        <FlatList
          data={address_list}
          renderItem={({item}) => {
            return (
              <AddressComponent
                item={item}
                isDefault={true}
                selectedAddressId={selectedAddressId}
                defaultSelect={defaultSelect}
              />
            );
          }}
          keyExtractor={(_, index) => index}
        />
      </View>
    );
  }, [address_list]);

  function renderAddAddress() {
    return (
      <View style={styles.addNewAddressView}>
        <Text style={styles.addNewAddressText}>{strings.ADD_NEW_ADDRESS}</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setAddNewAddress(!isAddNewAddress);
            setAddressError('');
            setTitleError('');
            setStateError('');
            setCountryError('');
          }}>
          <Image
            source={isAddNewAddress ? Images.crossIcon : Images.addIcon}
            style={styles.addAndCrossIconStyle}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderAddressForm() {
    return (
      <>
        <View style={AppStyles.mTop15}>
          <View style={[styles.textInputView, AppStyles.mTop20]}>
            <TextInput
              label={strings.ADD_TITLE}
              placeholder={strings.TITLE}
              labelStyle={styles.textInputLabel}
              ref={titleRef}
              onSubmitEditing={() => cityRef?.current?.focus?.()}
              returnKeyType="next"
              value={title}
              error={Errortitle}
              onChangeText={val => {
                setTitleError('');
                setTitle(val);
              }}
            />
          </View>
          <View style={[styles.textInputView, AppStyles.mTop20]}>
            <TextInput
              label={strings.COUNTRY}
              placeholder={strings.TITLE}
              editable={false}
              selectTextOnFocus={false}
              labelStyle={styles.textInputLabel}
              returnKeyType="next"
              value={'United States'}
            />
          </View>
          {/* <View style={[AppStyles.mTop20, AppStyles.mLeft5]}>
            <CountryNamePicker
              _value={country}
              setCountry={setCountry}
              _error={countryError}
            />
          </View> */}

          <View style={[styles.textInputView, AppStyles.mTop20]}>
            <TextInput
              label={strings.CITY}
              placeholder={strings.CITY}
              labelStyle={styles.textInputLabel}
              ref={cityRef}
              onSubmitEditing={() => stateRef?.current?.focus?.()}
              returnKeyType="next"
              value={city}
              error={cityError}
              onChangeText={val => {
                setCityError('');
                setCity(val);
              }}
            />
          </View>
          <View style={[styles.textInputView, AppStyles.mTop20]}>
            <TextInput
              label={strings.STATE}
              placeholder={strings.STATE}
              labelStyle={styles.textInputLabel}
              ref={stateRef}
              onSubmitEditing={() => streetRef?.current?.focus?.()}
              returnKeyType="next"
              value={state}
              error={stateError}
              onChangeText={val => {
                setStateError('');
                setState(val);
              }}
            />
          </View>
          <View style={[styles.textInputView, AppStyles.mTop20]}>
            <TextInput
              label={strings.STREET}
              placeholder={strings.STREET}
              labelStyle={styles.textInputLabel}
              ref={streetRef}
              onSubmitEditing={() => zipRef?.current?.focus?.()}
              returnKeyType="next"
              value={street}
              error={streetError}
              onChangeText={val => {
                setStreetError('');
                setStreet(val);
              }}
            />
          </View>
          <View style={[styles.textInputView, AppStyles.mTop20]}>
            <TextInput
              label={strings.ZIP}
              placeholder={strings.ZIP}
              labelStyle={styles.textInputLabel}
              ref={zipRef}
              onSubmitEditing={onSubmit}
              returnKeyType="done"
              value={zip}
              keyboardType="number-pad"
              error={zipError}
              onChangeText={val => {
                setZipError('');
                setZip(val);
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonView}
          onPress={onSubmit}
          activeOpacity={0.5}>
          {!isLoadingAddress ? (
            <Text style={styles.button}>{strings.SAVE}</Text>
          ) : (
            <ActivityIndicator size={'small'} color={Colors.white} />
          )}
        </TouchableOpacity>
      </>
    );
  }

  const nav = useMemo(
    () => (
      <CustomNavbar
        title={strings.ADDRESS}
        hasBack
        titleStyle={AppStyles.titleStyleForLeft}
        leftRightButtonWrapperStyle={{justifyContent: 'center'}}
      />
    ),
    [],
  );

  return (
    <View style={styles.mainCont}>
      {nav}
      {isLoading && (
        <View style={styles.loader}>
          <Loader loading={isLoading} />
        </View>
      )}

      <KeyboardAwareScrollViewComponent style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}>
          {renderAddress}
          {renderAddAddress()}
          {!!isAddNewAddress && renderAddressForm()}
        </ScrollView>
      </KeyboardAwareScrollViewComponent>
    </View>
  );
}
Address.propTypes = {};
Address.defaultProps = {};

const mapStateToProps = ({user}) => ({
  address_list: user.address_list,
});

export default connect(mapStateToProps, null)(Address);
