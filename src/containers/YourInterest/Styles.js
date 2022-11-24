import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    paddingTop: 5,
  },

  headingView: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  heading: {
    color: Colors.text.white,
    fontSize: 30,
    fontFamily: Fonts.type.bold,
  },
  description: {
    fontSize: 16,
    color: '#B0B7BB',
    marginTop: 5,
  },
  flatListView: {
    borderRadius: 17,
    overflow: 'hidden',
  },
  bottomButtonsText: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.type.bold,
  },
  updateButton: {
    backgroundColor: Colors.text.purple,
    borderRadius: 6,
    marginVertical: 20,
  },
});
