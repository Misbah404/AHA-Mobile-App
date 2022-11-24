import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts} from '../../theme';

// commit

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  view: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    fontSize: 17,
    color: Colors.white,
    paddingLeft: 20,
  },

  becomeAnArtistMainView: {
    backgroundColor: Colors.background.purple,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
  },

  becomeAnArtistView: {
    paddingVertical: 25,
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

  listView: {
    paddingHorizontal: 15,
    marginTop: 20,
    flex: 1,
  },

  imageView: {
    marginRight: 10,
    marginLeft: 15,
    height: 50,
    width: 40,
    ...AppStyles.centerInner,
    resizeMode: 'contain',
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});
