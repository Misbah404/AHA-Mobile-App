// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  becomeAnArtistMainView: {
    backgroundColor: Colors.background.purple,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
  },

  becomeAnArtistView: {
    width: '50%',
  },

  becomeAnArtist: {
    fontSize: 17,
    color: Colors.white,
    fontFamily: Fonts.type.bold,
  },

  becomeAnArtistDescription: {
    fontSize: 8,
    color: Colors.white,
    marginTop: 5,
  },
});
