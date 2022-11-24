import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  incrementWrap: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 6,
    paddingRight: 2,
  },

  minusWrapper: {
    paddingLeft: 5,
    paddingRight: 5,
  },

  plusWrapper: {
    paddingVertical: 1,
    paddingRight: 5,
    paddingLeft: 5,
  },

  roundBtn: {
    backgroundColor: Colors.lightRaven,
    width: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mT10: {
    marginTop: 20,
  },
  darkStyle: {
    backgroundColor: Colors.shark,
    paddingVertical: 3,
    paddingHorizontal: 3,
  },

  quantityView: {
    width: 30,

    alignItems: 'center',
  },

  quantityViewPostAnArt: {
    flex: 1,
    paddingHorizontal: 4,
    justifyContent: 'center',
  },

  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: Colors.grey1,
    borderBottomWidth: 1,
    paddingBottom: 4,
    // paddingTop: 2,
    // marginTop: 6,
  },
  quantityText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 5,
    color: Colors.text.white,
  },
  quantityExceeds: {
    fontSize: 8,
    marginRight: 10,
    color: Colors.white,
    alignSelf: 'flex-end',
  },
});
