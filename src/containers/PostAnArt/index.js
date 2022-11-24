import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {
  editPostAnArtRequest,
  emptyCreatePostData,
  storeCreatePostData,
} from '../../actions/feedActions';
import {setSelectedTab} from '../../actions/GeneralActions';
import {isUploadingPostInBackground} from '../../actions/UserActions';
import {
  Button,
  CustomNavbar,
  QuantityInput,
  ShipmentTypeComponent,
  TextInput,
  ToggleSwitchComponent,
  WeightWithUnitShippo,
} from '../../components';
import SelectedVibeAndInterestItem from '../../components/SelectedVibeAndInterestItem';
import {MAIN_TABS_DATA, strings} from '../../constants';
import {mixpanel} from '../../helpers/mixpanelHelper';
import {uploadPostInBackground} from '../../helpers/uploadPostInBackgroundHelper';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import util from '../../util';
import styles from './Styles';

function PostAnArt(props) {
  const {_createPostData, feedItem, setSelectedMediaArr} = props;

  const {
    description,
    collection,
    id,
    isForSale,
    max_quantity,
    price,
    size,
    title,
    vibes,
    type,
    weight,
    mass_unit,
    template,
    shippable,
  } = feedItem || {};

  const editCollection = !util.isUndefinedValue(collection) ? [collection] : [];
  const {
    productTitle: _productTitle = '',
    addPrice: _addPrice = '',
    productDescription: _productDescription = '',
    addSize: _addSize = [],
    addSizeQuantity: _addSizeQuantity = 1,
    addSizeQuantityIndex: _addSizeQuantityIndex = '',
    addSizeQuantityItem: _addSizeQuantityItem = '',
    quantityRemaining: _quantityRemaining = 1,
    selectedVibesList: _selectedVibesList = [],
    sellAnArt: _sellAnArt = false,
    selectedCollectionList: _selectedCollectionList = [],
    disableAddPrice: _disableAddPrice = true,
  } = _createPostData;

  const addSizeObject = {
    size: '',
    price: 0,
    quantity: 1,
    template: {
      token: 'USPS_FlatRateCardboardEnvelope',
      name: 'Flat Rate Cardboard Envelope',
    },

    mass_unit: 'g',
    weight: 0,
  };

  const {selectedMediaArr} = props;
  const productRef = useRef(() => null);
  const addPriceRef = useRef(() => null);
  const productDetailRef = useRef(() => null);
  const sizeRef = useRef(() => null);
  const priceRef = useRef(() => null);
  const scrollViewRef = useRef(null);
  const [productTitle, setProductTitle] = useState(() =>
    title ? title : _productTitle,
  );
  const [addPrice, setAddPrice] = useState(() => (price ? price : _addPrice));
  const [priceError, setPriceError] = useState(() => '');
  const [productDescription, setProductDescription] = useState(() =>
    description ? description : _productDescription,
  );
  const [addSize, setAddSize] = useState(() =>
    !util.isArrayEmpty(size) ? size : _addSize,
  );
  const [addSizeQuantity, setAddSizeQuantity] = useState(
    () => _addSizeQuantity,
  );
  const [addSizeQuantityIndex, setAddSizeQuantityIndex] = useState(
    () => _addSizeQuantityIndex,
  );
  const [addSizeQuantityItem, setAddSizeQuantityItem] = useState(
    () => _addSizeQuantityItem,
  );
  const [quantityRemaining, setQuantityRemaining] = useState(() =>
    max_quantity ? max_quantity : _quantityRemaining,
  );
  const [productTitleError, setProductTitleError] = useState('');
  const [productDescError, setProductDescError] = useState('');
  const [selectedVibesList, setSelectedVibesList] = useState(() =>
    vibes ? vibes : _selectedVibesList,
  );
  const [vibesListError, setVibesListError] = useState(() => '');
  const [collectionListError, setCollectionListError] = useState(() => '');
  const [addSizeListError, setAddSizeListError] = useState(() => '');
  const [sellAnArt, setSellAnArt] = useState(() =>
    isForSale ? isForSale : _sellAnArt,
  );
  const [isLoading, setIsLoading] = useState(() => false);
  const [isbackhandler, setIsBackhandler] = useState(() => false);
  const [selectedCollectionList, setSelectedCollectionList] = useState(() =>
    editCollection ? editCollection : _selectedCollectionList,
  );
  const [disableAddPrice, setDisableAddPrice] = useState(() => true);
  const [postInCommunity, setPostInCommunity] = useState(() =>
    type == 'drop' ? true : false,
  );
  const [percelTemplePerItem, setPercelTemplePerItem] = useState({
    token: 'USPS_FlatRateCardboardEnvelope',
    name: 'Flat Rate Cardboard Envelope',
  });
  const [isToggleShippo, setIsToggleShippo] = useState(() =>
    shippable ? true : false,
  );
  const [shipmentType, setShipmentType] = useState(
    !util.isEmptyObject(template)
      ? template
      : {
          token: 'USPS_FlatRateCardboardEnvelope',
          name: 'Flat Rate Cardboard Envelope',
        },
  );
  const [weightShipmentItem, setWeightShipmentItem] = useState(() => '');
  const [weightShipment, setWeightShipment] = useState(() =>
    !util.areValuesEqual(weight, '0.00') ? weight : '',
  );
  const [massUnitItem, setMassUnitItem] = useState(() => '');
  const [massUnit, setMassUnit] = useState(() =>
    !util.isEmptyValue(mass_unit) ? mass_unit : 'g',
  );
  const [weightShipmentError, setWeightShipmentError] = useState(() => '');

  const dispatch = useDispatch();

  useEffect(() => {
    mixpanel.track('Visit', {PageName: 'Add Post'});
  }, []);

  useEffect(() => {
    !util.isArrayEmpty(addSize) && setDisableAddPrice(false);
    util.isArrayEmpty(addSize) && setDisableAddPrice(true);
  }, [addSize, percelTemplePerItem]);
  useEffect(() => {
    setAddSizeListError('');
    let newState = util.cloneDeepArray(addSize);
    let quantity = 0;

    const newObject = {
      size: addSizeQuantityItem?.size,
      quantity: addSizeQuantity,
      price: Number(addSizeQuantityItem.price),
      template: percelTemplePerItem,
      weight: addSizeQuantityItem?.weight,
      mass_unit: addSizeQuantityItem.mass_unit,
    };
    newState[addSizeQuantityIndex] = newObject;

    newState.forEach(element => {
      if (element.quantity > 0) {
        quantity += element.quantity;
      }
    });

    const sumOfQuantity = !util.isArrayEmpty(addSize) ? quantity : 1;
    const QuantityRemainingSum =
      addSize.length > 0 ? sumOfQuantity : sumOfQuantity.quantity;

    if (addSize.length > 0) {
      setQuantityRemaining(QuantityRemainingSum ? QuantityRemainingSum : 1);
    }

    setAddSize(newState);
  }, [addSizeQuantity]);

  useEffect(() => {
    util.isUndefinedValue(id) && saveDataIntoReducer();
  }, [
    productTitle,
    addPrice,
    productDescription,
    addSize,
    addSizeQuantity,
    addSizeQuantityIndex,
    addSizeQuantityItem,
    quantityRemaining,
    selectedVibesList,
    sellAnArt,
    selectedCollectionList,
    disableAddPrice,
  ]);

  const validation = () => {
    let validate = true;
    const validationAddSize = addSize.every(
      item => item.size && item.price && item.quantity,
    );
    const isInvalidSize = addSize.some(item =>
      util.isOnlyWhiteSpace(item.size),
    );

    if (util.isEmptyValue(productTitle)) {
      setProductTitleError(strings.REQUIRED_FIELD);
      productRef?.current?.focus?.();
      validate = false;
    }

    if (
      !util.isEmptyValueWithoutTrim(productDescription) &&
      util.onlySpaces(productDescription)
    ) {
      setProductDescError(strings.INVALID_DESCRIPTION);
      productDetailRef?.current?.focus?.();
      validate = false;
    }

    if (util.isArrayEmpty(selectedVibesList)) {
      setVibesListError(strings.REQUIRED_FIELD);
      validate = false;
    }
    if (sellAnArt && disableAddPrice) {
      if (util.isArrayEmpty(addPrice)) {
        setPriceError(strings.REQUIRED_FIELD);
        priceRef?.current?.focus?.();
        validate = false;
      } else if (addPrice < 0.5) {
        setPriceError(strings.REQUIRED_MORE_THEN_ZERO_POINT_FIVE);
        priceRef?.current?.focus?.();
        validate = false;
      } else if (addPrice >= 999999) {
        setPriceError(strings.REQUIRED_LESS_THEN_NINITY);
        priceRef?.current?.focus?.();
        validate = false;
      }
    }

    if (!util.isArrayEmpty(addSize)) {
      if (!validationAddSize) {
        setAddSizeListError(strings.REQUIRED_FIELD);
        validate = false;
      } else if (!!isInvalidSize) {
        setAddSizeListError(strings.INVALID_SIZE);
        validate = false;
      }
    }

    if (isToggleShippo) {
      if (!util.isArrayEmpty(addSize)) {
        const validationAddSizeWithShippo = addSize.every(
          item =>
            item.size &&
            item.price &&
            item.quantity &&
            item.template &&
            item.mass_unit &&
            Number(item.weight),
        );

        if (!validationAddSizeWithShippo) {
          setAddSizeListError(strings.REQUIRED_FIELD);
          validate = false;
        }
        const shipmentWeightValid = addSize.every(item =>
          util.validationForShipmentWeight(item.weight, item.mass_unit),
        );
        if (!shipmentWeightValid) {
          setAddSizeListError(strings.SHIPMENT_WEIGHT_ERROR);
          validate = false;
        }
      } else {
        if (util.isEmptyValue(weightShipment)) {
          setWeightShipmentError(strings.REQUIRED_FIELD);
          validate = false;
        } else if (util.areValuesEqual(Number(weightShipment), 0)) {
          setWeightShipmentError(strings.GREATER_THEN_ZERO);
          validate = false;
        }
      }
    }

    Keyboard.dismiss();
    return validate;
  };

  function removeFromAddSize(array, index) {
    setAddSizeListError('');

    setQuantityRemaining(quantityRemaining - array[index]?.quantity);
    if (util.areValuesEqual(array?.length, 1)) {
      setQuantityRemaining(1);
    }
    let data = [];
    array.map((item, _index) => {
      if (_index !== index) data.push(item);
    });

    setAddSize(data);
  }

  function addSizeArray() {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd();
    }, 50);
    const validation = addSize.every(
      item => item.size && item.price && item.quantity,
    );
    if (isToggleShippo) {
      const validationWithShippo = addSize.every(
        item =>
          item.size &&
          item.price &&
          item.quantity &&
          item.template &&
          item.mass_unit &&
          item.weight,
      );

      if (validationWithShippo) {
        const array = addSize.concat(addSizeObject);
        setAddSize(array);
        !util.isArrayEmpty(addSize)
          ? setQuantityRemaining(quantityRemaining + 1)
          : setQuantityRemaining(1);
      } else {
        setAddSizeListError(strings.REQUIRED_FIELD);
      }
    } else {
      if (validation) {
        const array = addSize.concat(addSizeObject);
        setAddSize(array);
        !util.isArrayEmpty(addSize)
          ? setQuantityRemaining(quantityRemaining + 1)
          : setQuantityRemaining(1);
      } else {
        setAddSizeListError(strings.REQUIRED_FIELD);
      }
    }
  }

  function setSizebyindexSize(index, item, value) {
    setAddSizeListError('');
    const newState = [...addSize];
    const newObject = {
      size: value,
      quantity: item?.quantity,
      price: item?.price,
      template: item?.template,
      mass_unit: item?.mass_unit,
      weight: item?.weight,
    };
    newState[index] = newObject;
    setAddSize(newState);
  }
  function setSizebyindexPrice(index, item, value) {
    if (isNaN(value)) {
      setAddSizeListError(isNaN(value) ? 'Invalid Price' : '');
      return;
    }
    setAddSizeListError('');
    const newState = [...addSize];
    const newObject = {
      size: item?.size,
      quantity: item?.quantity,
      price: parseInt(value),
      template: item?.template,
      mass_unit: item?.mass_unit,
      weight: item?.weight,
    };
    newState[index] = newObject;

    setAddSize(newState);
  }
  function setSizebyindexShippoWeight(index, item, value) {
    setAddSizeListError('');

    const newState = util.cloneDeepArray(addSize);
    const newObject = {
      size: item?.size,
      quantity: item?.quantity,
      price: item?.price,
      template: item?.template,
      mass_unit: item?.mass_unit,
      weight: util.isEmptyValue(value) ? 0 : parseInt(value),
    };
    newState[index] = newObject;
    setAddSize(newState);
  }
  function setSizebyindexShippoMassUnit(index, item, value) {
    setAddSizeListError('');
    const newState = [...addSize];
    const newObject = {
      size: item?.size,
      quantity: item?.quantity,
      price: item?.price,
      template: item?.template,
      mass_unit: value,
      weight: '',
    };
    newState[index] = newObject;
    setAddSize(newState);
  }

  function selectedVibesListCallBack(_list = []) {
    setSelectedVibesList(_list);
  }

  function selectedCollectionListCallBack(_list = []) {
    setSelectedCollectionList(_list);
  }

  function deleteItemPressHandler(mId, mArr, mFuncToSetDataIntoState) {
    const mDataArr = util.cloneDeepArray(mArr);
    const mFilteredData = util.filterArray(mDataArr, item => item?.id != mId);
    mFuncToSetDataIntoState(mFilteredData);
  }

  const saveDataIntoReducer = () => {
    const payload = {
      productTitle,
      addPrice,
      productDescription,
      addSize,
      addSizeQuantity,
      addSizeQuantityIndex,
      addSizeQuantityItem,
      quantityRemaining,
      selectedVibesList,
      sellAnArt,
      selectedCollectionList,
      disableAddPrice,
    };
    dispatch(storeCreatePostData(payload));
  };

  const renderCustomNavBar = (
    <CustomNavbar
      title={'Post An Art'}
      titleStyle={AppStyles.titleStyleForCenter}
      leftRightButtonWrapperStyle={{justifyContent: 'center'}}
      hasBack
      leftBtnPress={() => {
        if (!!isLoading) {
          setIsBackhandler(true);
        } else {
          Actions.pop();
        }
      }}
    />
  );

  const renderAddproductAndPriceAndDescription = () => (
    <>
      <TextInput
        label={strings.ADD_PRODUCT_TITLE}
        placeholder={strings.TITLE}
        labelStyle={styles.labelStyle}
        ref={productRef}
        onSubmitEditing={() => productDetailRef?.current?.focus?.()}
        returnKeyType="next"
        value={productTitle}
        maxLength={50}
        onChangeText={val => {
          setProductTitle(val);
          setProductTitleError('');
        }}
        error={productTitleError}
      />

      <TextInput
        label={strings.PRODUCT_DESCRIPTION}
        placeholder={strings.DESCRIPTION}
        labelStyle={styles.labelStyle}
        ref={productDetailRef}
        maxLength={100}
        containerStyle={styles.containerStyleInput}
        onSubmitEditing={() => sizeRef?.current?.focus?.()}
        returnKeyType="next"
        value={productDescription}
        onChangeText={val => {
          setProductDescription(val);
          setProductDescError('');
        }}
        error={productDescError}
      />
    </>
  );

  const renderAddPriceAndQuantity = () => (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginTop: 10,
        marginBottom: 30,
      }}>
      <View style={[AppStyles.mTop0, {flex: 0.5}]}>
        <Text style={styles.labelStyle}>Quantity Remaining</Text>

        {disableAddPrice ? (
          <QuantityInput
            maxQuantity={100}
            sellAnArt={!disableAddPrice}
            postAnArt={true}
            incomingQuantity={quantityRemaining}
            handleChangeQuantity={setQuantityRemaining}
          />
        ) : (
          <View style={styles.remainingQuantityView}>
            <Text style={styles.remainingQuantityTxt}>
              {quantityRemaining ? quantityRemaining : 1}
            </Text>
          </View>
        )}
      </View>
      <View style={{flex: 0.5, marginTop: 0}}>
        <TextInput
          label={strings.PRICE}
          placeholder={strings.PRICE}
          labelStyle={[
            styles.labelStyle,
            !disableAddPrice && {color: 'rgba(162, 165, 184,0.3)'},
          ]}
          placeholderTextColor={
            !disableAddPrice ? 'rgba(162, 165, 184,0.3)' : Colors.text.secondary
          }
          ref={addPriceRef}
          editable={disableAddPrice}
          styleInput={
            !disableAddPrice
              ? {color: 'rgba(162, 165, 184,0.3)'}
              : {color: Colors.white}
          }
          // containerStyle={[styles.containerStyleInput]}
          onSubmitEditing={() => productDetailRef?.current?.focus?.()}
          returnKeyType="next"
          keyboardType="numeric"
          maxLength={6}
          value={addPrice}
          onChangeText={val => {
            if (util.includesValue(val, '.')) {
              const splittedArrByDecimal = val.split('.');
              const valueAfterDecimal = splittedArrByDecimal[1];
              if (valueAfterDecimal.length < 3) {
                setAddPrice(val);
              }
            } else {
              setAddPrice(val);
            }
            setPriceError(isNaN(val) ? 'Invalid Price' : '');
          }}
        />
        {!util.isEmptyValue(priceError) && (
          <Text
            style={{
              position: 'absolute',
              bottom: -40,
              left: 3,
              width: 150,
              height: 40,
              color: Colors.red,
            }}>
            {priceError}
          </Text>
        )}
        {util.isEmptyValue(priceError) && (
          <Image
            style={[styles.dollarImage, priceError && {bottom: 45}]}
            source={Images.dollarIcon}
          />
        )}
      </View>
    </View>
  );

  const renderAddSize = useMemo(() => {
    return (
      <>
        <View style={styles.addSizeView}>
          <Text style={styles.labelStyle}>Add Size</Text>
          <TouchableOpacity
            onPress={() => {
              addSizeArray();
              setPriceError('');
            }}
            activeOpacity={0.5}>
            <Image source={Images.plusIcon} resizeMode={'contain'} />
          </TouchableOpacity>
        </View>
        {!_.isEmpty(addSize) && (
          <View style={styles.sizeheadingMainView}>
            <View style={styles.sizeheadingView}>
              <Text style={styles.sizeheading}>Size</Text>
            </View>
            <View style={styles.sizeheadingView}>
              <Text style={styles.sizeheading}>Quantity</Text>
            </View>
            <View style={styles.sizeheadingView}>
              <Text style={styles.sizeheading}>Price</Text>
            </View>
          </View>
        )}
        {!_.isEmpty(addSize) && (
          <FlatList
            data={addSize}
            keyExtractor={(_, index) => index}
            renderItem={({item, index}) => {
              return (
                <>
                  <View style={styles.textInputMainView}>
                    <View style={styles.textInputView}>
                      <TextInput
                        selectionColor={Colors.white}
                        placeholder={strings.SIZE}
                        ref={sizeRef}
                        maxLength={30}
                        onSubmitEditing={() => priceRef?.current?.focus?.()}
                        returnKeyType="next"
                        value={item?.size}
                        onChangeText={value => {
                          setSizebyindexSize(index, item, value);
                        }}
                      />
                    </View>
                    <View style={[styles.textInputView, {marginTop: 25}]}>
                      <QuantityInput
                        maxQuantity={100}
                        postAnArt={true}
                        incomingQuantity={item?.quantity}
                        addSizeQuantityIndex={index}
                        setAddSizeQuantityIndex={setAddSizeQuantityIndex}
                        addSizeQuantityItem={item}
                        setAddSizeQuantityItem={setAddSizeQuantityItem}
                        handleChangeQuantity={setAddSizeQuantity}
                      />
                    </View>

                    <View style={[styles.textInputView, {width: '35%'}]}>
                      <TextInput
                        selectionColor={Colors.white}
                        placeholder={strings.price}
                        ref={priceRef}
                        returnKeyType="done"
                        keyboardType="number-pad"
                        value={item?.price}
                        maxLength={6}
                        onChangeText={value => {
                          setSizebyindexPrice(index, item, value);
                        }}
                      />
                    </View>
                  </View>
                  {isToggleShippo && (
                    <>
                      <WeightWithUnitShippo
                        massUnit={item?.mass_unit}
                        weight={item?.weight}
                        setWeight={setWeightShipment}
                        setMassUnit={setMassUnitItem}
                        setSizebyindexShippoWeight={setSizebyindexShippoWeight}
                        setSizebyindexShippoMassUnit={
                          setSizebyindexShippoMassUnit
                        }
                        item={item}
                        index={index}
                      />
                      <ShipmentTypeComponent
                        setPercelTemplePerItem={setPercelTemplePerItem}
                        item={item}
                        index={index}
                        setAddSize={setAddSize}
                        addSize={addSize}
                        selectedShipment={item?.template}
                      />
                    </>
                  )}
                  <TouchableOpacity
                    onPress={() => removeFromAddSize(addSize, index)}
                    style={styles.crossIconView}>
                    <Image
                      style={styles.crossIconImage}
                      source={Images.crossIconRed}
                      resizeMode={'center'}
                    />
                  </TouchableOpacity>
                </>
              );
            }}
          />
        )}

        <Text style={{color: 'red', marginTop: 10}}>{addSizeListError}</Text>
      </>
    );
  }, [addSize, weightShipment, isToggleShippo, addSizeListError]);

  const renderOnsubmit = () => (
    <View style={styles.buttonView}>
      <Button
        style={styles.button}
        isLoading={isLoading}
        textStyle={styles.buttonStyle}
        onPress={util.isUndefinedValue(id) ? onSubmitPress : onSubmitPressEdit}>
        {strings.POST}
      </Button>
    </View>
  );

  const onSubmitPress = async () => {
    if (validation()) {
      dispatch(emptyCreatePostData({}));
      setIsLoading(true);
      const payload = {
        productTitle,
        addPrice,
        productDescription,
        addSize,
        addSizeQuantity,
        addSizeQuantityIndex,
        addSizeQuantityItem,
        quantityRemaining,
        selectedVibesList,
        sellAnArt,
        selectedCollectionList,
        disableAddPrice,
        postInCommunity,
        massUnit,
        weightShipment,
        shipmentType,
        isToggleShippo,
      };
      dispatch(isUploadingPostInBackground(true));
      uploadPostInBackground(selectedMediaArr, payload, dispatch);
      setSelectedMediaArr([]);

      if (util.isFieldNil(feedItem)) Actions.pop();

      setTimeout(() => {
        Actions.pop();
      }, 100);

      setTimeout(() => {
        Actions.jump('_dashboard_tab', {isPost: false});
        dispatch(setSelectedTab(MAIN_TABS_DATA.DASHBOARD_TAB.id));
      }, 200);
    }
  };

  const onSubmitPressEdit = () => {
    if (validation()) {
      dispatch(emptyCreatePostData({}));
      setIsLoading(true);
      const vibesList = util.getIdsFromArray(selectedVibesList);

      const collectionList = selectedCollectionList.map(a => a?.id);
      const payload = {
        title: productTitle,
        description: productDescription,
        price: Number(addPrice),
        sizes: addSize,
        max_quantity: quantityRemaining,
        collections: collectionList,
        vibes: vibesList,
        sellable: sellAnArt,
        mass_unit: massUnit,
        weight: weightShipment,
        template: shipmentType,
        shippable: isToggleShippo,
      };
      util.isEmptyValue(productDescription) && delete payload.description;
      util.isArrayEmpty(collectionList) && delete payload.collections;
      util.isArrayEmpty(addSize) && delete payload.sizes;
      !util.isArrayEmpty(addSize) && delete payload.price;
      !util.isArrayEmpty(addSize) && delete payload.mass_unit;
      !util.isArrayEmpty(addSize) && delete payload.weight;
      !util.isArrayEmpty(addSize) && delete payload.template;
      !sellAnArt && delete payload.price;
      !sellAnArt && delete payload.max_quantity;
      !isToggleShippo && delete payload.mass_unit;
      !isToggleShippo && delete payload.weight;
      !isToggleShippo && delete payload.template;

      if (!!postInCommunity) {
        payload['type'] = 'drop';
        delete payload.collections;
      }
      if (!isToggleShippo) {
        payload?.sizes?.filter(item => (item.weight = 0));
      }

      const params = `${id}`;
      dispatch(
        editPostAnArtRequest(params, payload, res => {
          setIsLoading(false);
          if (!util.isArrayEmpty(res)) {
            Actions.pop();
            util.topAlert('Post Update Successfully');
          }
        }),
      );
    }
  };

  function onSellAnArtTogglePress() {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd();
    }, 50);
    setAddSize([]);
    setSellAnArt(!sellAnArt);
    setAddSizeListError('');
  }

  const renderTitleAndSearchSec = (_title, onPress) => (
    <>
      <Text style={styles.title}>{_title}</Text>
      <TouchableOpacity style={styles.searchView} onPress={onPress}>
        <Text style={styles.searchText}>{strings.SEARCH_HERE}</Text>
        <View style={styles.borderLine} />
      </TouchableOpacity>
    </>
  );

  const renderSellAnArt = () => (
    <>
      <View
        style={[
          styles.sellAnArtAndCommunityView,
          {marginVertical: 0, zIndex: 1},
        ]}>
        <Text style={[styles.labelStyle, styles.toggleLabelText]}>
          {strings.FOR_SALE}
        </Text>
        <ToggleSwitchComponent
          isOn={sellAnArt}
          onTogglePressHandler={onSellAnArtTogglePress}
        />
      </View>
    </>
  );

  const renderPostInCommunitySection = () => (
    <>
      <View style={styles.sellAnArtAndCommunityView}>
        <Text style={[styles.labelStyle, styles.toggleLabelText]}>
          {strings.POST_IN_COMMUNITY}
        </Text>
        <ToggleSwitchComponent
          isOn={postInCommunity}
          onTogglePressHandler={() => setPostInCommunity(!postInCommunity)}
        />
      </View>
    </>
  );
  const renderToggleBtnAndTilte = (title, onPress, isToggle) => (
    <>
      <View style={styles.sellAnArtAndCommunityView}>
        <Text style={[styles.labelStyle, styles.toggleLabelText]}>{title}</Text>
        <ToggleSwitchComponent isOn={isToggle} onTogglePressHandler={onPress} />
      </View>
    </>
  );

  const renderAddYourVibeSec = useMemo(
    () => (
      <View style={AppStyles.mTop30}>
        {renderTitleAndSearchSec(strings.ADD_ART_POST_VIBE, () => {
          setVibesListError('');
          Actions.searchVibe({
            _selectedVibes: selectedVibesList,
            callBack: selectedVibesListCallBack,
          });
        })}
        <FlatList
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          data={selectedVibesList}
          keyExtractor={(_, index) => index}
          contentContainerStyle={AppStyles.mTop5}
          renderItem={item => {
            return (
              <SelectedVibeAndInterestItem
                _item={item.item}
                onCrossIconPress={id =>
                  deleteItemPressHandler(
                    id,
                    selectedVibesList,
                    setSelectedVibesList,
                  )
                }
              />
            );
          }}
        />
        {!util.isEmptyValue(vibesListError) && (
          <Text style={{color: 'red', marginTop: 5, marginBottom: 5}}>
            {vibesListError}
          </Text>
        )}
      </View>
    ),
    [selectedVibesList, vibesListError],
  );

  const renderAddYourCollectionSec = useMemo(
    () => (
      <View style={AppStyles.mTop15}>
        {renderTitleAndSearchSec(strings.ADD_ART_POST_COLLECTION, () => {
          setCollectionListError('');
          Actions.searchCollection({
            _selectedVibes: selectedCollectionList,
            callBack: selectedCollectionListCallBack,
          });
        })}
        <FlatList
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          data={selectedCollectionList}
          keyExtractor={(_, index) => index}
          contentContainerStyle={AppStyles.mTop5}
          renderItem={item => {
            return (
              <SelectedVibeAndInterestItem
                _item={item.item}
                onCrossIconPress={id =>
                  deleteItemPressHandler(
                    id,
                    selectedCollectionList,
                    setSelectedCollectionList,
                  )
                }
              />
            );
          }}
        />
      </View>
    ),
    [selectedCollectionList, collectionListError],
  );

  const shipmentToggleBtnClick = () => {
    setIsToggleShippo(!isToggleShippo);
    setAddSizeListError('');
  };

  return (
    <>
      {renderCustomNavBar}
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flex: 1,
        }}>
        <KeyboardAwareScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          {renderAddproductAndPriceAndDescription()}
          {renderAddYourVibeSec}
          {!postInCommunity && renderAddYourCollectionSec}

          {/* Toggle Button for community */}
          {renderToggleBtnAndTilte(
            strings.POST_IN_COMMUNITY,
            () => setPostInCommunity(!postInCommunity),
            postInCommunity,
          )}

          {/* Toggle Button for Sale */}
          {renderToggleBtnAndTilte(
            strings.FOR_SALE,
            onSellAnArtTogglePress,
            sellAnArt,
          )}
          {sellAnArt && <>{renderAddPriceAndQuantity()}</>}
          {/* Toggle Button for shipment */}
          {sellAnArt &&
            renderToggleBtnAndTilte(
              strings.SHIPMENT,
              shipmentToggleBtnClick,
              isToggleShippo,
            )}
          {sellAnArt && <>{renderAddSize}</>}
          {isToggleShippo && sellAnArt && util.isArrayEmpty(addSize) && (
            <>
              <WeightWithUnitShippo
                massUnit={massUnit}
                weight={weightShipment}
                setWeight={setWeightShipment}
                setMassUnit={setMassUnit}
                error={weightShipmentError}
                isFromMainShipment={true}
                setWeightShipmentError={setWeightShipmentError}
              />
              <ShipmentTypeComponent
                setShipmentType={setShipmentType}
                shipmentType={shipmentType}
                isFromMainShipment={true}
                selectedShipment={shipmentType}
              />
            </>
          )}

          {renderOnsubmit()}
        </KeyboardAwareScrollView>
      </ScrollView>
    </>
  );
}

PostAnArt.propTypes = {
  setSelectedMediaArr: PropTypes.func,
};
PostAnArt.defaultProps = {
  setSelectedMediaArr: Function(),
};

const mapStateToProps = ({post}) => ({
  _createPostData: post.temperoryDataOfCreatePost,
});

export default connect(mapStateToProps, null)(PostAnArt);
