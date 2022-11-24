// @flow
import {BlurView} from '@react-native-community/blur';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {addToCart, getArtsRelatedRequest} from '../../actions/CartActions';
import {QuantityInput} from '../../components';
import {appDefaultData, strings} from '../../constants';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import FastImage from 'react-native-fast-image';
import util from '../../util';
import Loader from '../Loader';
import styles from './styles';
import {mixpanel} from '../../helpers/mixpanelHelper';
import LinearGradient from 'react-native-linear-gradient';

const BuyPostBottomSheetContent = props => {
  const {
    sheetRef,
    isFullViewVisible,
    setShowBottomSheet,
    feedItem,
    isSinglePostItem,
    artsRelated,
    myCartList,
  } = props;

  const {
    max_quantity,
    price,
    size,
    isForSale,
    title,
    description,
    id,
    thumbnail,
    artist,
    weight,
    template,
    mass_unit,
  } = feedItem || {};
  let [scrolled] = useState(0);

  const [maxQuantity, setMaxQuantity] = useState(() =>
    !util.isArrayEmpty(size) ? size[0]?.quantity : max_quantity,
  );
  const [feedPrice, setFeedPrice] = useState(() =>
    !util.isEmptyValue(price) ? price : size[0]?.price,
  );

  const [selectSize, setSelectSize] = useState(() => size[0]?.size);
  const [selectSizeTemplete, setSelectSizeTemplete] = useState(
    () => size[0]?.template?.token,
  );
  const [selectSizeMassUnit, setSelectSizeMassUnit] = useState(
    () => size[0]?.mass_unit,
  );
  const [selectSizeWeight, setSelectSizeWeight] = useState(
    () => size[0]?.weight,
  );
  const [selectedItem, setSelectedItem] = useState(() => {});
  const [selectSizeIndex, setSelectSizeIndex] = useState(() => 0);
  const [quantity, setQuantity] = useState(() => 1);
  const [isLoading, setIsLoading] = useState(() => false);
  const [isMaxQuantity, setIsMaxQuantity] = useState(() => false);
  const [isLoadingImage, setIsLoadingImage] = useState(() => true);
  const [isMoreInfo, setMoreInfo] = useState(() => false);
  const [height, setHeight] = useState(() =>
    !util.isArrayEmpty(size) ? size[0]?.template?.height : template?.height,
  );
  const [Length, setLength] = useState(() =>
    !util.isArrayEmpty(size) ? size[0]?.template?.length : template?.length,
  );
  const [width, setWidth] = useState(() =>
    !util.isArrayEmpty(size) ? size[0]?.template?.width : template?.width,
  );
  const [distanceUnit, setDistanceUnit] = useState(() =>
    !util.isArrayEmpty(size)
      ? size[0]?.template?.distance_unit
      : template?.distance_unit,
  );

  const flatListRef = useRef<FlatList<any>>();
  const dispatch = useDispatch();
  const scrollOnce = Metrics.screenWidth - 20;

  useEffect(() => {
    //todo need to work on it umer and alishaheer
    if (!!!util.isEmptyObject(selectedItem)) {
      setSelectSize(selectedItem?.size);
      setSelectSizeWeight(selectedItem?.weight);
      setSelectSizeMassUnit(selectedItem?.mass_unit);
      setSelectSizeTemplete(selectedItem?.template?.token);
      setMaxQuantity(selectedItem?.quantity);
      setQuantity(1);
      setFeedPrice(selectedItem?.price);
    }

    const mIndexCartCheck = util.findIndexById(myCartList, id);
    if (mIndexCartCheck != -1) {
      if (!!!util.isArrayEmpty(size)) {
        let isSameSizePostAlreadyExist = util.some(
          myCartList,
          item =>
            util.areValuesEqual(item.id, id) &&
            util.areValuesEqual(item.size, selectedItem?.size),
        );
        if (isSameSizePostAlreadyExist) {
          const mIndexCart = _.findIndex(
            myCartList,
            item =>
              util.areValuesEqual(item.id, id) &&
              util.areValuesEqual(item.size, selectedItem?.size),
          );
          const mQuantityCart = myCartList[mIndexCart].quantity;
          const mQuantityFeed = util.isEmptyObject(selectedItem)
            ? size[0]?.quantity
            : selectedItem.quantity;
          setMaxQuantity(mQuantityFeed - mQuantityCart);
          setQuantity(1);
          setIsMaxQuantity(false);
        } else {
          const mQuantityFeed = !util.isArrayEmpty(size)
            ? size[0]?.quantity
            : selectedItem.quantity;
          setMaxQuantity(mQuantityFeed);
          setQuantity(1);
          setIsMaxQuantity(false);
        }
      } else {
        const mIndexCart = _.findIndex(myCartList, item =>
          util.areValuesEqual(item.id, id),
        );
        const mQuantityFeed = max_quantity;
        const mQuantityCart = myCartList[mIndexCart].quantity;
        setMaxQuantity(mQuantityFeed - mQuantityCart);

        setQuantity(1);
        setIsMaxQuantity(false);
      }
    } else {
      const mQuantityFeed = !util.isArrayEmpty(size)
        ? selectedItem
          ? selectedItem?.quantity
          : size[0]?.quantity
        : max_quantity;
      setMaxQuantity(mQuantityFeed);
      setQuantity(1);
      setIsMaxQuantity(false);
    }
  }, [selectedItem, myCartList, feedItem]);
  3;

  useEffect(() => {
    setIsMaxQuantity(false);
    if (!!!util.isEmptyObject(selectedItem)) {
      setQuantity(1);
    }
  }, [selectedItem, feedItem]);

  useEffect(() => {
    !util.isUndefinedValue(id) &&
      setFeedPrice(!util.isEmptyValue(price) ? price : size[0]?.price);
  }, [feedItem]);

  useEffect(() => {
    getArtsRelated();
  }, [feedItem]);

  function handleSelectedItem(item, index) {
    setSelectedItem(item);
    setSelectSizeIndex(index);
    setLength(item?.template?.length);
    setWidth(item?.template?.width);
    setHeight(item?.template?.height);
    setDistanceUnit(item?.template?.distance_unit);
  }

  function getArtsRelated() {
    setIsLoading(true);
    if (!util.isUndefinedValue(id)) {
      const params = `?art_id=${id}&offset=0&limit=9`;
      dispatch(
        getArtsRelatedRequest(params, res => {
          setIsLoading(false);
        }),
      );
    }
  }

  function handlerAddToCart() {
    sheetRef?.current?.snapTo(2);

    if (util.isArrayEmpty(myCartList)) {
      const MyCardItem = {
        price: price ? price : feedPrice,
        title: title,
        description: description,
        size: selectSize,
        id: id,
        quantity: quantity,
        thumbnail: thumbnail,
        maxQuantity: maxQuantity,
        mass_unit: util.isFieldNil(selectSize) ? mass_unit : selectSizeMassUnit,
        weight: util.isFieldNil(selectSize) ? weight : selectSizeWeight,
        template: util.isFieldNil(selectSize)
          ? template?.token
          : selectSizeTemplete,
      };
      util.isFieldNil(selectSize) && delete MyCardItem.size;
      dispatch(addToCart(MyCardItem));

      setQuantity(1);
      Actions.cart({isSinglePostItem});

      mixpanel.track('Add Cart', {
        ItemName: title,
        ItemPrice: price ? price : feedPrice,
        Size: selectSize,
        ItemQuantity: quantity,
        SaleItem: isForSale,
        ItemDesigner: artist?.profileTagId,
        ItemID: artist?.id,
      });
    } else {
      const MyCardItem = {
        price: price ? price : feedPrice,
        title: title,
        description: description,
        size: selectSize,
        id: id,
        quantity: quantity,
        thumbnail: thumbnail,
        maxQuantity: maxQuantity,
        mass_unit: util.isFieldNil(selectSize) ? mass_unit : selectSizeMassUnit,
        weight: util.isFieldNil(selectSize) ? weight : selectSizeWeight,
        template: util.isFieldNil(selectSize)
          ? template?.token
          : selectSizeTemplete,
      };
      util.isFieldNil(selectSize) && delete MyCardItem.size;

      dispatch(addToCart(MyCardItem));
      setQuantity(1);

      util.topAlert(strings.ADD_TO_CART_LIST);

      mixpanel.track('Add Cart', {
        ItemName: title,
        ItemPrice: price ? price : feedPrice,
        Size: selectSize,
        itemQuantity: quantity,
        SaleItem: isForSale,
        ItemDesigner: artist?.profileTagId,
        ItemID: artist?.id,
      });
    }
  }

  function leftButton() {
    flatListRef?.current?.scrollToOffset({
      animated: true,
      offset: scrolled - scrollOnce,
    });
  }

  function rightButton() {
    flatListRef?.current?.scrollToOffset({
      animated: true,
      offset: scrolled + scrollOnce,
    });
  }

  const renderViewHeader = () => (
    <View
      style={{
        position: 'relative',
        alignSelf: 'flex-end',
        right: -23,
      }}>
      <TouchableOpacity
        style={styles.ArrowView}
        onPress={() => {
          if (!!isFullViewVisible) {
            sheetRef?.current?.snapTo(2);
          } else {
            sheetRef?.current?.snapTo(0);
          }
        }}>
        <Image
          source={!!isFullViewVisible ? Images.bottomArrow : Images.topArrow}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    </View>
  );

  const renderCart = () => (
    <View>
      <View style={styles.pricesView}>
        <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
          <Text style={styles.price}>
            {appDefaultData.currency.symbol}
            {Number(feedPrice).toFixed(2)}
          </Text>
          <Text style={styles.priceText}>{`  /   ${'Price Incl.'}`}</Text>
        </View>
      </View>

      <View style={styles.sizeMainView}>
        <FlatList
          data={size}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => handleSelectedItem(item, index)}
                activeOpacity={0.5}
                style={[
                  styles.sizeView,
                  util.areValuesEqual(selectSizeIndex, index) && {
                    borderWidth: 1,
                    borderColor: Colors.white,
                  },
                ]}>
                <Text style={styles.sizeText}>{item?.size}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View style={styles.addToCartView}>
        <View style={styles.addToCartBtnView}>
          <TouchableOpacity
            disabled={maxQuantity === 0 ? true : false}
            style={[styles.addToCartButton]}
            onPress={handlerAddToCart}>
            <Text style={styles.addToCartButtonText}>
              {strings.ADD_TO_CART}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quantityMainView}>
          {maxQuantity > 0 ? (
            <View style={styles.quantityView}>
              <QuantityInput
                isBottomSheet={true}
                maxQuantity={maxQuantity}
                incomingQuantity={quantity}
                setIsMaxQuantity={setIsMaxQuantity}
                isMaxQuantity={isMaxQuantity}
                handleChangeQuantity={setQuantity}
              />
            </View>
          ) : (
            <Text style={[{color: Colors.white, fontSize: 14}]}>sold out</Text>
          )}
        </View>
      </View>
    </View>
  );

  const renderDescription = () => (
    <View
      style={util.isArrayEmpty(size) ? {marginTop: '10%'} : {marginTop: '5%'}}>
      <Text numberOfLines={3} ellipsizeMode="tail" style={styles.heading}>
        {title}
      </Text>
      {
        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.description}>
          {description}
        </Text>
      }
    </View>
  );

  const renderNoDataFoundImage = useMemo(
    () => <Image source={Images.NoDataFoundImage} resizeMode={'contain'} />,
    [],
  );

  const renderRelatedArtsList = () => (
    <View style={{height: 400}}>
      <View style={styles.sliderView}>
        <Text style={styles.heading1}>{strings.CAN_NOT_GET_THE_ORIGINAL}</Text>
        {!!!util.isArrayEmpty(artsRelated) && (
          <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
            <TouchableOpacity onPress={leftButton}>
              <Image source={Images.backButton} style={AppStyles.mRight20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={rightButton}>
              <Image source={Images.RightIcon} style={AppStyles.mLeft5} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {!!isLoading ? (
        <View style={styles.loaderView}>
          <Loader loading={true} />
        </View>
      ) : (
        <View
          style={{
            marginTop: 10,
            height: '40%',
          }}>
          {!util.isArrayEmpty(artsRelated) ? (
            <FlatList
              data={artsRelated}
              horizontal
              showsHorizontalScrollIndicator={false}
              ref={flatListRef}
              onScroll={e => {
                scrolled = e.nativeEvent.contentOffset.x;
              }}
              snapToAlignment={'start'}
              snapToInterval={Metrics.screenWidth - 20}
              decelerationRate={'fast'}
              renderItem={({item, index}) => {
                const isFirstItem = index === 0;
                const {thumbnail} = item || {};
                return (
                  <View
                    style={{
                      width: (Metrics.screenWidth - 25) / 3,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setShowBottomSheet(false);
                        Actions.singlePostContainerWithoutTabs({
                          postID: item.id,
                        });
                      }}
                      style={[
                        styles.relatedPostView,
                        isFirstItem && styles.relatedImgViewFirstItem,
                      ]}
                      activeOpacity={0.5}>
                      {!util.isFieldNil(thumbnail) && (
                        <FastImage
                          style={[
                            {
                              height: 151,
                            },
                            isFirstItem && {
                              borderTopLeftRadius: 10,
                              borderBottomLeftRadius: 10,
                            },
                          ]}
                          onLoad={() => setIsLoadingImage(false)}
                          source={{
                            uri: thumbnail,
                            priority: FastImage.priority.high,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      )}
                      <Text
                        style={styles.suggestionText}
                        numberOfLines={1}
                        ellipsizeMode={'tail'}>
                        {item.title}
                      </Text>
                      <View
                        style={{
                          position: 'absolute',
                          top: '40%',
                          left: '50%',
                        }}>
                        <Loader loading={isLoadingImage} />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={(_, index) => index}
            />
          ) : (
            renderNoDataFoundImage
          )}
        </View>
      )}
    </View>
  );

  const moreInfo = () => {
    return (
      <View>
        {isMoreInfo && (
          <View style={{marginTop: 10}}>
            <LinearGradient
              style={styles.LGstyles}
              colors={['rgba(91.4, 91.4, 92.5,0)', 'rgba(91.4, 91.4, 92.5,1)']}
              start={{x: 0.75, y: 0}}
              end={{x: 0, y: 0}}>
              <View style={[styles.LGView]} />
            </LinearGradient>
            <View>
              <Text style={styles.productTxt}>Product Detail</Text>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={feedItem?.vibes}
              renderItem={({item}) => {
                return (
                  <View style={styles.vibesMainView}>
                    <FastImage
                      style={styles.imageVibes}
                      source={{uri: item.image}}
                    />
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.txtVibe}>
                      {item.title}
                    </Text>
                  </View>
                );
              }}
            />

            {!util.isUndefinedValue(distanceUnit) && (
              <View style={styles.dimenstionUnit}>
                <Text style={styles.dimenttionTxt}>
                  {distanceUnit?.toUpperCase()}
                </Text>
              </View>
            )}
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              style={{flexDirection: 'row'}}>
              {!util.isUndefinedValue(Length) && (
                <View style={styles.dimnensitionBtn}>
                  <Text style={styles.dimenttionTxt}>Length {Length}</Text>
                </View>
              )}
              {!util.isUndefinedValue(width) && (
                <View style={styles.dimnensitionBtn}>
                  <Text style={styles.dimenttionTxt}>Width {width}</Text>
                </View>
              )}
              {!util.isUndefinedValue(height) && (
                <View style={styles.dimnensitionBtn}>
                  <Text style={styles.dimenttionTxt}>Height {height} </Text>
                </View>
              )}
            </ScrollView>
          </View>
        )}
        <View style={{height: 40, marginTop: 10}}>
          <LinearGradient
            style={styles.LGstyles}
            colors={[
              'rgba(91.4, 91.4, 92.5,0)',
              'rgba(91.4, 91.4, 92.5,1)',
              'rgba(91.4, 91.4, 92.5,1)',
              'rgba(91.4, 91.4, 92.5,0)',
              'rgba(91.4, 91.4, 92.5,0)',
            ]}
            start={{x: 0.75, y: 0}}
            end={{x: 0, y: 0}}>
            <View style={styles.LGView} />
          </LinearGradient>
          <TouchableOpacity
            onPress={() => setMoreInfo(!isMoreInfo)}
            style={{
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: Colors.white,
                fontSize: Fonts.size.small,
                fontWeight: '700',
              }}>
              {!isMoreInfo ? 'More Info' : 'Show Less'}
            </Text>
          </TouchableOpacity>
          <LinearGradient
            style={styles.LGstyles}
            colors={[
              'rgba(91.4, 91.4, 92.5,0)',
              'rgba(91.4, 91.4, 92.5,1)',
              'rgba(91.4, 91.4, 92.5,1)',
              'rgba(91.4, 91.4, 92.5,0)',
              'rgba(91.4, 91.4, 92.5,0)',
            ]}
            start={{x: 0.75, y: 0}}
            end={{x: 0, y: 0}}>
            <View style={styles.LGView} />
          </LinearGradient>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.roundCorner]}>
      <BlurView style={{flex: 1}} blurType="dark">
        <View style={styles.bottomSheetCont}>
          {renderViewHeader()}

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}>
            {renderCart()}

            {renderDescription()}
            {moreInfo()}

            <View style={{marginRight: -20, marginTop: 15, marginBottom: 5}}>
              {renderRelatedArtsList()}
            </View>
          </ScrollView>
        </View>
      </BlurView>
    </View>
  );
};

BuyPostBottomSheetContent.propTypes = {
  isSinglePostItem: PropTypes.bool,
};
BuyPostBottomSheetContent.defaultProps = {
  isSinglePostItem: false,
};

const mapStateToProps = ({cart}) => ({
  artsRelated: cart.artsRelated,
  myCartList: cart.myCartList,
});

export default connect(mapStateToProps, null)(BuyPostBottomSheetContent);
