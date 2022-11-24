import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    flex: 1,
  },

  collectionMainView: {
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    overflow: 'hidden',
    marginBottom: 20,
    marginHorizontal: 15,
  },

  titleText: {
    fontSize: 16,
    fontFamily: Fonts.type.medium,
    color: Colors.text.white,
    zIndex: 1,
  },

  imageBackground: {
    width: 114,
    height: 151,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: Colors.background.primary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  shadow: {
    position: 'absolute',
    width: 114,
  },
});
