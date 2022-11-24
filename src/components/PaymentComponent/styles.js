// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.darkBlue,
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 12,
    marginTop: 15,
    flexDirection: 'row',
  },

  view: {
    flex: 1,
    paddingTop: 10,
  },

  cardNumber: {
    fontWeight: '500',
    fontSize: Fonts.size.normal,
  },

  cvvView: {
    backgroundColor: Colors.background.secondary,
    marginTop: 10,
    paddingVertical: 6,
    borderRadius: 3,
    width: 100,
  },

  cvv: {
    fontWeight: '400',
    fontSize: Fonts.size.xxSmall,
    lineHeight: 18,
    color: Colors.text.cardText,
    textAlign: 'center',
    marginHorizontal: 10,
  },

  radioBoxMainView: {
    flexDirection: 'row',
    marginTop: 5,
    alignSelf: 'center',
  },

  radioBoxView: {
    borderColor: Colors.white,
    borderRadius: 50,
    borderWidth: 1,
    height: 20,
    width: 20,
    marginRight: 10,
    ...AppStyles.centerInner,
  },

  radioBox: {
    height: 13,
    width: 13,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  cardIcon: {
    resizeMode: 'contain',
    marginRight: 5,
    height: 40,
    width: 40,
  },
  cardType: {
    color: Colors.text.primary,
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.bold,
    width: 70,
    textAlign: 'center',
    padding: 3,
  },
});
