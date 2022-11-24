import React from 'react';
import {Image as RnImage, TouchableOpacity, View} from 'react-native';
import {Text} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import util from '../../util';
import styles from './QuantityInputStyles';

export default function QuantityInputView(props) {
  const {
    handleIncrement,
    handleDecrement,
    dark,
    fromStore,
    isBottomSheet,
    maxQuantity,
    postAnArt,
    quantity,
    onTextChange,
    ref,
    onSubmitEditing,
    sellAnArt,
    isMaxQuantity,
  } = props;

  return (
    <>
      {postAnArt ? (
        <View style={styles.view}>
          <View style={[styles.quantityViewPostAnArt]}>
            <Text
              size={dark ? Fonts.size.font13 : Fonts.size.font8}
              color={dark ? Colors.white : Colors.raven}
              style={{flex: 1, height: 30, marginTop: 10, color: Colors.white}}
              type="medium">
              {quantity.toString()}
            </Text>
          </View>

          <View>
            <TouchableOpacity
              disabled={sellAnArt}
              style={[styles.plusWrapper]}
              onPress={handleIncrement}
              activeOpacity={0.5}>
              <View style={[styles.roundBtn, dark && styles.darkRoundBtn]}>
                {isBottomSheet && <RnImage source={Images.RightIcon} />}
                {!isBottomSheet && (
                  <RnImage
                    source={Images.topArrow}
                    style={[
                      {width: 8, height: 8},
                      sellAnArt
                        ? {tintColor: 'rgba(162, 165, 184,0.3)'}
                        : {tintColor: Colors.white},
                    ]}
                    resizeMode={'contain'}
                  />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={sellAnArt}
              style={[
                styles.minusWrapper,
                {alignItems: 'center', justifyContent: 'center'},
              ]}
              onPress={handleDecrement}>
              <View style={[styles.roundBtn, dark && styles.darkRoundBtn]}>
                {isBottomSheet && <RnImage source={Images.backButton} />}
                {!isBottomSheet && (
                  <RnImage
                    source={Images.topArrow}
                    style={[
                      {
                        width: 8,
                        height: 8,

                        transform: [{rotate: '180deg'}],
                        marginTop: 7,
                      },
                      sellAnArt
                        ? {tintColor: 'rgba(162, 165, 184,0.3)'}
                        : {tintColor: Colors.white},
                    ]}
                    resizeMode={'contain'}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          {isBottomSheet && <Text style={styles.quantityText}>Quantity</Text>}
          <View
            style={[
              styles.incrementWrap,
              !util.isPlatformAndroid() && !fromStore && {width: '87%'},
              isBottomSheet && {
                flexDirection: 'row-reverse',
              },
            ]}>
            <TouchableOpacity
              style={[styles.plusWrapper]}
              onPress={handleIncrement}
              activeOpacity={0.5}>
              <View style={[styles.roundBtn, dark && styles.darkRoundBtn]}>
                {isBottomSheet && <RnImage source={Images.RightIcon} />}
                {!isBottomSheet && (
                  <Text
                    style={{lineHeight: !util.isPlatformAndroid() ? 21 : 26}}
                    size={Fonts.size.small}
                    color={Colors.white}
                    type="bold"
                    textAlign="center">
                    +
                  </Text>
                )}
              </View>
            </TouchableOpacity>

            <View
              style={[
                styles.quantityView,
                isBottomSheet && {backgroundColor: 'transparent'},
              ]}>
              <Text
                size={dark ? Fonts.size.font13 : Fonts.size.font8}
                color={dark ? Colors.white : Colors.raven}
                style={{textAlign: 'center'}}
                type="medium">
                {quantity.toString()}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.minusWrapper,
                {alignItems: 'center', justifyContent: 'center'},
              ]}
              onPress={handleDecrement}>
              <View style={[styles.roundBtn, dark && styles.darkRoundBtn]}>
                {isBottomSheet && <RnImage source={Images.backButton} />}
                {!isBottomSheet && (
                  <Text
                    style={{
                      lineHeight: !util.isPlatformAndroid() ? 21 : 22,
                    }}
                    size={Fonts.size.medium}
                    color={Colors.white}
                    type="bold"
                    textAlign="center">
                    -
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
          {maxQuantity > 0 && isMaxQuantity && (
            <Text numberOfLines={2} style={styles.quantityExceeds}>
              {strings.QUANTITY_LIMIT_EXTEND} {maxQuantity}
            </Text>
          )}
        </View>
      )}
    </>
  );
}
