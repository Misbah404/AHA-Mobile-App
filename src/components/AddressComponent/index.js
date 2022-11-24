import {string} from 'prop-types';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import {
  deleteAddressRequest,
  markPickingPointRequest,
  updateAddressRequest,
} from '../../actions/UserActions';
import {CountryNamePicker, Text, TextInput} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import util from '../../util';
import DeleteOrRemoveModal from '../DeleteOrRemoveModal';
import styles from './styles';

const AddressComponent = props => {
  const {
    item,
    isDefault,
    isSelectedOrderId,
    setAddressForOrder,
    defaultSelect,
  } = props;
  const {
    id,
    title,
    state,
    is_selected,
    country,
    address,
    is_picking_point,
    street,
    zip,
    city,
  } = item;
  const titleRef = useRef(() => null);
  const stateRef = useRef(() => null);
  const addressRef = useRef(() => null);
  const cityRef = useRef(() => null);
  const streetRef = useRef(() => null);
  const zipRef = useRef(() => null);
  const [isLoading, setLoading] = useState(() => false);
  const [titleEdit, setTitle] = useState(() => title);
  const [countryEdit, setCountry] = useState(() => 'United States');
  const [stateEdit, setState] = useState(() => state);
  const [addressEdit, setAddress] = useState(() => address);
  const [isEditForm, setEditForm] = useState(() => false);
  const [cityEdit, setCityEdit] = useState(() => city);
  const [streetEdit, setStreetEdit] = useState(() => street);
  const [zipEdit, setZipEdit] = useState(() => zip);
  const [titleError, setTitleError] = useState(() => '');
  const [countryError, setCountryError] = useState(() => '');
  const [stateError, setStateError] = useState(() => '');
  const [addressError, setAddressError] = useState(() => '');
  const [cityError, setCityError] = useState(() => '');
  const [streetError, setStreetError] = useState(() => '');
  const [zipError, setZipError] = useState(() => '');
  const [modalVisible, setModalVisible] = useState(() => false);
  const [isLoaderMarkAddress, setIsLoaderMarkAddres] = useState(() => false);
  const dispatch = useDispatch();
  useEffect(() => {
    // setTitle(title);
    // setCountry(country);
    // setState(state);
    // setAddress(address);
  }, [props]);

  const validation = () => {
    let validate = true;

    if (util.isEmptyValue(addressEdit)) {
      setAddressError(strings.REQUIRED_FIELD);
      validate = false;
    }

    if (util.isEmptyValue(stateEdit)) {
      setStateError(strings.REQUIRED_FIELD);
      validate = false;
    }

    if (util.isEmptyValue(countryEdit)) {
      setCountryError(strings.REQUIRED_FIELD);
      validate = false;
    }

    if (util.isEmptyValue(titleEdit)) {
      setTitleError(strings.REQUIRED_FIELD);
      validate = false;
    }
    if (util.isEmptyValue(cityEdit)) {
      setCityError(strings.REQUIRED_FIELD);
      validate = false;
    }
    if (util.isEmptyValue(streetEdit)) {
      setStreetError(strings.REQUIRED_FIELD);
      validate = false;
    }
    if (util.isEmptyValue(zipEdit)) {
      setZipError(strings.REQUIRED_FIELD);
      validate = false;
    }
    Keyboard.dismiss();
    return validate;
  };

  const onSubmit = () => {
    if (validation()) {
      setTitleError('');
      setStateError('');
      setCountryError('');
      setAddressError('');
      setLoading(true);

      const payload = {
        title: titleEdit,
        country: countryEdit,
        state: stateEdit,
        street: streetEdit,
        city: cityEdit,
        zip: zipEdit,
      };
      const params = `${id}`;
      dispatch(
        updateAddressRequest(payload, params, res => {
          setLoading(false);
          setEditForm(!isEditForm);
        }),
      );
    }
  };

  function deleteAddress() {
    setModalVisible(!modalVisible);
    const params = `${id}`;

    dispatch(deleteAddressRequest(params, res => {}));
  }

  function clickOnMarkPickingPoint() {
    const payload = {
      id: id,
    };
    setIsLoaderMarkAddres(true);
    dispatch(
      markPickingPointRequest(payload, res => {
        setEditForm(!isEditForm);
        setIsLoaderMarkAddres(false);
      }),
    );
  }

  const EditForm = useMemo(() => {
    return (
      <View>
        <Text
          size={Fonts.size.small}
          style={AppStyles.mTop15}
          type={Fonts.type.Asap}>
          Update Address
        </Text>
        <View style={[styles.textInputView, AppStyles.mTop20]}>
          <TextInput
            label={strings.ADD_TITLE}
            placeholder={strings.TITLE}
            labelStyle={styles.textInputLabel}
            ref={titleRef}
            onSubmitEditing={() => cityRef?.current?.focus?.()}
            returnKeyType="next"
            value={titleEdit}
            error={titleError}
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

        {/* <View style={[styles.textInputView, AppStyles.mTop20]}>
          <CountryNamePicker
            _value={countryEdit}
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
            value={cityEdit}
            error={cityError}
            onChangeText={val => {
              setCityError('');
              setCityEdit(val);
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
            value={stateEdit}
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
            value={streetEdit}
            error={streetError}
            onChangeText={val => {
              setStateError('');
              setStreetEdit(val);
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
            value={zipEdit}
            error={zipError}
            keyboardType="number-pad"
            onChangeText={val => {
              setZipError('');
              setZipEdit(val);
            }}
          />
        </View>
        <View>
          {/* <TouchableOpacity
            onPress={() => (is_picking_point ? {} : clickOnMarkPickingPoint())}
            activeOpacity={is_picking_point ? 1 : 0.5}
            style={[styles.updateBtn, {flex: 1}]}>
            {isLoaderMarkAddress ? (
              <ActivityIndicator
                style={{position: 'absolute', bottom: 0, left: 20}}
                color={Colors.white}
              />
            ) : (
              <Text
                style={[
                  styles.updateText,
                  is_picking_point
                    ? {
                        fontSize: Fonts.size.normal,
                        color: Colors.text.disable,
                      }
                    : {},
                ]}>
                {is_picking_point
                  ? strings.PICKING_POINT_ADDRESS
                  : strings.MARK_AS_PICKING_POINT}
              </Text>
            )}
          </TouchableOpacity> */}
          <TouchableOpacity onPress={onSubmit} style={styles.updateBtn}>
            {isLoading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.updateText}>{strings.UPDATE}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [
    item,
    cityEdit,
    titleEdit,
    countryEdit,
    stateEdit,
    zipEdit,
    streetEdit,
    isLoading,
    isLoaderMarkAddress,
    is_picking_point,
    isEditForm,
    cityError,
    zipError,
    streetError,
    stateError,
    countryError,
    titleError,
    isDefault,
    isSelectedOrderId,
  ]);

  const itemAddress = useMemo(() => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.container]}
          onPress={() => {
            isDefault
              ? !!!is_selected && defaultSelect(id)
              : setAddressForOrder(item);
          }}>
          <View style={styles.radioBoxMainView}>
            <View style={styles.radioBoxView}>
              {isDefault
                ? !!is_selected && <View style={styles.radioBox}></View>
                : isSelectedOrderId == item.id && (
                    <View style={styles.radioBox}></View>
                  )}
            </View>
          </View>
          <View style={styles.view}>
            <Text style={styles.heading}>{title}</Text>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={styles.description}>
              {street},{city}, {state}, {country},{zip}
            </Text>
          </View>
          <View
            style={[
              AppStyles.flexRow,
              AppStyles.flex,
              {justifyContent: 'flex-end'},
            ]}>
            <View style={styles.radioBoxMainView}>
              <TouchableOpacity
                style={{marginRight: 10}}
                onPress={() => setEditForm(!isEditForm)}>
                <Image
                  style={{width: 20, height: 20}}
                  source={
                    isEditForm ? Images.crossIcon : Images.paymentCardEdit
                  }
                />
              </TouchableOpacity>
            </View>

            <View style={styles.radioBoxMainView}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Image
                  style={{width: 20, height: 20}}
                  source={Images.deleteIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        {/* {is_picking_point && !isEditForm && isDefault && (
          <View style={{marginLeft: 30, zIndex: 1, paddingTop: 10}}>
            <FastImage
              style={{width: '100%', height: 1}}
              source={Images.gardainLineBothSide}
            />
            <View style={{zIndex: 1, marginVertical: 5}}>
              <Text style={styles.markPickingPoint}>
                {strings.PICKING_POINT_ADDRESS}
              </Text>
            </View>
          </View>
        )} */}
      </>
    );
  }, [
    id,
    title,
    state,
    is_selected,
    country,
    address,
    is_picking_point,
    street,
    zip,
    city,
    isEditForm,
    isDefault,
    isSelectedOrderId,
  ]);

  const renderDeleteAddressModal = useMemo(
    () => (
      <DeleteOrRemoveModal
        heading={strings.DELETE_ADDRESS}
        description={strings.ARE_YOU_SURE}
        positiveBtnText={strings.DELETE}
        negativeBtnText={strings.DONT_DELETE}
        positiveBtnPressHandler={() => deleteAddress()}
        setModalVisibility={() => setModalVisible(!modalVisible)}
        isModalVisible={modalVisible}
      />
    ),
    [modalVisible],
  );

  return (
    <View style={styles.editForm}>
      {itemAddress}
      {isEditForm && EditForm}
      {renderDeleteAddressModal}
    </View>
  );
};

AddressComponent.propTypes = {};
AddressComponent.defaultProps = {};

export default AddressComponent;
