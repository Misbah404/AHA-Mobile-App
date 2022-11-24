import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  mainCont: {
    backgroundColor: Colors.background.primary,
    flex: 1,
  },
  address: {
    color: Colors.text.primary,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold,
    paddingLeft: 5,
    marginTop: 15,
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

  textInputView: {
    paddingHorizontal: 5,
  },

  textInputLabel: {
    fontSize: 14,
    color: '#A2A5B8',
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
  loader: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    zIndex: 1,
  },
});
