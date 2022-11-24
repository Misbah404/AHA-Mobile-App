// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Fonts, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  noPostsFoundText: {
    alignSelf: 'center',
    ...AppStyles.mTop20,
  },
  collectionLoader: {
    height: 60,
    marginTop: 150,
  },
  rightBtnStyleSecond: {
    width: 18,
    height: 20,
    right: 5,
    top: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  multiSelectedBtn: {
    alignSelf: 'flex-end',
    marginRight: 5,
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.background.purple,
    borderRadius: 5,
    zIndex: 1,
  },
  multiSelectedTxt: {color: Colors.white, fontSize: Fonts.size.small},
  bottomSheetContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});
