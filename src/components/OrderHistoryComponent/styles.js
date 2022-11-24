// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: '#0B1319',
    marginBottom: 5,
    flexDirection: 'row',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    paddingVertical: 15,
  },

  containerQuantity: {
    paddingVertical: 6,
  },

  CartView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    marginRight: '5%',
  },

  CartViewTextView: {
    marginLeft: 15,
    flexShrink: 1,
  },

  CartViewHeading: {
    fontSize: 19,
    fontWeight: '700',
  },

  CartViewText: {
    fontSize: 13,
    fontWeight: '500',
    marginTop:2
  },

  sizeAndQuantityView: {
    width: '40%',
    maxWidth: '40%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: '10%',
  },
  sizeAndQuantityViewOrderHistory: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: 0,
    width: '32%',
  },

  sizeView: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 7,
    // flex: 1,
    ...AppStyles.centerInner,
  },

  size: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },

  quantityView: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 30,
    marginTop: -5,
  },

  quantity: {
    backgroundColor: '#15232E',
    width: 44,
    height: 27,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantityText: {
    fontSize: 14,
    fontWeight: '700',
  },

  add: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },

  minus: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: -8,
  },

  status: {
    fontSize: 13,
    marginTop: 5,
  },

  confirmationScreenQuantityView: {
    alignItems: 'center',
  },

  confirmationScreenQuantityNum: {
    fontSize: 14,
    lineHeight: 15,
  },

  confirmationScreenQuantity: {
    fontSize: 15,
    marginLeft: 10,
    lineHeight: 15,
  },

  numberOfProductView: {
    position: 'absolute',
    right: -5,
    top: -5,
    height: 26,
    width: 26,
    backgroundColor: '#0B1319',
    borderRadius: 50,
    ...AppStyles.centerInner,
  },

  numberOfProduct: {
    backgroundColor: Colors.white,
    width: 18,
    height: 18,
    borderRadius: 50,
    paddingTop: 2,
  },
  numberOfProductText: {
    color: Colors.black,
    textAlign: 'center',
    fontSize: 10,
  },
});
