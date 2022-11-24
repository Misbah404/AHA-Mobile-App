// @flow
import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  modal: {
    margin: 0,
  },
  progressBarContainer: {
    height: 4,
    width: 200,
    backgroundColor: Colors.gray,
    borderRadius: 5,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.blue,
    borderRadius: 5,
  },
});
