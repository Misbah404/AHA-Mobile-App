// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  loader: {
    position: 'absolute',
    top: 50,
    bottom: 50,
    alignSelf: 'center',
    justifyContent: 'center',

    flex: 1,
  },
  backBtnIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  btnImage: {
    position: 'absolute',
    zIndex: 1,
    top: 60,
    left: 10,
  },
  ArrowView: {
    padding: 10,
    alignSelf: 'flex-end',
  },
  bottomSheetContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  noPostsFoundCont: {
    flex: 1,
    top: 100,
  },
});
