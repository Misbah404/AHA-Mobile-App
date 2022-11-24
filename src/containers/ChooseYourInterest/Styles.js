import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: 28,
  },
  bottomButtonsCont: {
    paddingHorizontal: 10,
  },
  skipButton: {
    marginHorizontal: 12,
  },
  nextButton: {
    backgroundColor: Colors.text.purple,
  },
  bottomButtonsText: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.type.medium,
  },
  selectedItemCont: {
    borderRadius: 10,
    backgroundColor: Colors.appColorPurple,
    padding: 7,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  unSelectedItemCont: {
    borderRadius: 8,
    backgroundColor: Colors.background.grey,
    padding: 7,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  titleText: {
    fontSize: 13,
    fontFamily: Fonts.type.regular,
    color: Colors.text.darkBlue,
  },
  selectedTitleText: {
    color: Colors.text.white,
  },
  flatListView: {
    borderRadius: 17,
    overflow: 'hidden',
    paddingBottom: 100,
  },
  view: {
    flexGrow: 1,
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: 'hidden',
    paddingTop: 10,
  },
});
