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
  rightBtnStyleSecond: {
    width: 16,
    height: 18,
    marginBottom: -2,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  collectionLoader: {
    height: 60,
    marginTop: 150,
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
  deleteModal: {
    borderColor: '#AFA3A3',
    borderRadius: 27,
    alignSelf: 'center',
    justifyContent: 'center',
    width: 330,
    height: 235,
  },
});
