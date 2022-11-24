import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Fonts} from '../../theme';

// commit

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    paddingHorizontal: 15,
  },

  address: {
    color: Colors.text.primary,
    fontSize: Fonts.size.medium,
    fontWeight: '700',
    paddingLeft: 5,
  },
  textInputView: {
    paddingHorizontal: 5,
  },

  addNewAddressText: {
    color: Colors.text.primary,
    fontSize: 13,
    fontWeight: '700',
  },

  payment: {
    color: Colors.text.primary,
    fontSize: Fonts.size.medium,
    fontWeight: '700',
    paddingLeft: 5,
    marginTop: 30,
  },

  addNewPaymentText: {
    color: Colors.text.primary,
    fontSize: 13,
    fontWeight: '700',
  },

  totalPriceView: {
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
  textInputLabel: {
    fontSize: 14,
    color: '#A2A5B8',
  },
  addNewAddressView: {
    ...AppStyles.flexRow,
    ...AppStyles.spaceBetween,
    ...AppStyles.alignItemsCenter,
    ...AppStyles.mTop5,
    ...AppStyles.mBottom10,
    paddingHorizontal: 7,
  },
  addNewAddressText: {
    color: Colors.text.primary,
    fontSize: 13,
    fontFamily: Fonts.type.bold,
  },

  buttonView: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
    backgroundColor: Colors.background.purple,
    width: 100,
    alignSelf: 'center',
    paddingVertical: 10,
    borderRadius: 4,
    justifyContent: 'center',
  },

  button: {
    color: Colors.text.white,

    fontSize: 17,
    fontFamily: Fonts.type.bold_italic,
  },
  addAndCrossIconStyle: {
    resizeMode: 'contain',
  },
  addNewPaymentText: {
    color: Colors.text.primary,
    fontSize: 13,
    fontFamily: Fonts.type.bold,
  },
  addNewPaymentView: {
    ...AppStyles.flexRow,
    ...AppStyles.spaceBetween,
    ...AppStyles.alignItemsCenter,
    ...AppStyles.mTop10,
    paddingHorizontal: 5,
  },
});
