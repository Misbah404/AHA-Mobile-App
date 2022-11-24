// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  commentsWriteSection: {
    height: 70,
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 7,
    borderColor: '#ededed',
    backgroundColor: '#ededed',
    maxHeight: 130,
    color: Colors.black,
  },
  updateBtn: {
    backgroundColor: Colors.background.purple,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 100,
    height: 38,
    alignSelf: 'flex-end',
    marginTop: 13,
  },
  updateText: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.type.semiBold_italic,
    color: Colors.text.primary,
  },
  loaderSec: {
    alignSelf: 'center',
  },
  inputTextAndUpdateBtnSec: {
    marginHorizontal: 30,
  },
});
