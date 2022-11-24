// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    backgroundColor: '#0B1319',
    height: 100,
    marginBottom: 5,
    flexDirection: 'row',
    width: '110%',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    paddingVertical: 12,
  },

  containerQuantity: {
    paddingVertical: 6,
  },

  CartView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '55%',
    maxWidth: '55%',
    marginRight: '5%',
  },

  CartViewTextView: {
    marginLeft: 10,
    flexShrink: 1,
  },

  CartViewHeading: {
    fontSize: 19,
    fontWeight: '700',
  },

  CartViewText: {
    fontSize: 13,
    fontWeight: '500',
    marginRight: 12,
  },

  sizeAndQuantityView: {
    width: '40%',
    maxWidth: '40%',
    flexDirection: 'row',
    alignItems: 'center',
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
    marginLeft:10
    

  },

  confirmationScreenQuantityNum: {
    fontSize: 14,
    lineHeight: 15,
  },

  confirmationScreenQuantity: {
    fontSize: 15,
    lineHeight: 15,
  },
});
