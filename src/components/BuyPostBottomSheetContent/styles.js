// @flow
import {StyleSheet} from 'react-native';
import {Fonts, Colors, AppStyles, Metrics} from '../../theme';

export default StyleSheet.create({
  ArrowView: {
    alignSelf: 'flex-end',
    marginRight: 40,
    padding: 10,
    zIndex: 1,
  },
  roundCorner: {
    borderTopRightRadius: 87,
    borderTopLeftRadius: 0,
    overflow: 'hidden',
  },
  bottomSheetCont: {
    paddingTop: 20,
    paddingHorizontal: 30,
    backgroundColor: 'rgba(0,0,0,0)',
    height: Metrics.screenHeight,
  },
  pricesView: {
    alignItems: 'center',
    ...AppStyles.flexRow,
    ...AppStyles.spaceBetween,
  },

  price: {
    fontSize: 37,
    fontFamily: Fonts.type.bold,
    color: Colors.text.white,
  },

  priceText: {
    fontFamily: Fonts.type.regular,
    fontSize: 16,
    color: Colors.text.white,
  },

  sizeMainView: {
    alignItems: 'flex-start',
    marginVertical: 10,
  },

  sizeView: {
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 8,
    alignSelf: 'center',
    paddingVertical: 2,
  },

  sizeText: {
    color: Colors.text.white,
    fontSize: 15,
  },

  addToCartView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 55,
  },

  addToCartButton: {
    backgroundColor: Colors.background.purple,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },

  addToCartButtonText: {
    color: Colors.text.white,
    fontSize: 15,
    fontFamily: Fonts.type.bold_italic,
  },

  quantityText: {
    marginRight: 10,
    textAlign: 'center',
    color: Colors.text.white,
  },

  quantityView: {
    marginTop: 6,
    marginBottom: 6,
    alignItems: 'center',
  },

  heading: {
    fontSize: 22,
    color: Colors.text.white,
    marginTop: 0,
    fontFamily: Fonts.type.bold,
  },

  description: {
    fontSize: 15,
    color: Colors.text.white,
    marginTop: 10,
  },

  sliderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginRight: 20,
  },

  heading1: {
    fontSize: 22,
    color: Colors.text.white,
  },

  imageSuggestion: {
    height: 150,
    width: 113,
    borderWidth: 1,
    borderColor: Colors.background.primary,
    justifyContent: 'flex-end',
  },

  suggestionText: {
    paddingBottom: 10,
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
    color: Colors.text.white,
  },
  loaderView: {
    justifyContent: 'center',
    marginVertical: '60%',
    marginTop: '20%',
  },
  quantityExceeds: {
    fontSize: 8,
    marginRight: 10,
    color: Colors.white,
    alignSelf: 'flex-end',
  },
  addToCartBtnView: {flex: 0.5, height: 60},
  quantityMainView: {
    flex: 0.5,
    height: 55,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  emptyRelatedFlatlist: {
    marginLeft: Metrics.screenWidth - (Metrics.screenWidth * 80) / 100,
  },
  relatedPostView: {
    borderWidth: 0.5,
    borderColor: Colors.black,
  },
  relatedImgViewFirstItem: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  firstTimeBottomView: {
    marginBottom: 110,
  },
  LGView: {width: 100, height: 0.5},
  LGstyles: {height: 2, alignItems: 'center'},
  dimnensitionBtn: {
    height: 38,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7234F9',
    borderRadius: 5,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    borderColor: Colors.white,
    borderWidth: 0.5,
  },
  dimenttionTxt: {
    fontSize: Fonts.size.xSmall,
    fontFamily: Fonts.type.Asap,
    fontWeight: '700',
    color: Colors.white,
  },
  dimenstionUnit: {
    height: 24,
    width: 58,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7234F9',
    borderRadius: 5,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    borderColor: Colors.white,
    borderWidth: 0.5,
  },
  vibesMainView: {
    height: 41,
    width: 145,
    alignItems: 'center',
    backgroundColor: '#7234F9',
    borderRadius: 8,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    borderColor: Colors.white,
    borderWidth: 0.5,
    flexDirection: 'row',
  },
  imageVibes: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginHorizontal: 10,
  },
  txtVibe: {
    fontSize: 16,
    fontFamily: Fonts.type.Asap,
    fontWeight: '500',
    color: Colors.white,
    width: 100,
  },
  productTxt: {
    color: Colors.white,
    fontFamily: Fonts.type.Asap,
    marginTop: 10,
    fontSize: Fonts.size.small,
    fontWeight: '500',
  },
});
