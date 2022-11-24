// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  communityView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  communityImage: {
    height: 47,
    width: 47,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.white,
    marginRight: 10,
  },
  communityText: {
    marginRight: 20,
    fontSize: 13,
    fontFamily: Fonts.type.bold,
  },
  crossIconCommunity: {
    position: 'absolute',
    right: 20,
    top: -5,
    width: 14,
  },
});
