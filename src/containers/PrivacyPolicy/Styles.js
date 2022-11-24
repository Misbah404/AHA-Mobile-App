import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  mainCont: {
    backgroundColor: Colors.background.primary,
    flex: 1,
  },
  container: {
    backgroundColor: Colors.background.primary,
    paddingHorizontal: 30,
  },
  loader: {
    position: 'absolute',
    flex: 1,
    zIndex: 1,
    top: '50%',
    alignSelf: 'center',
  },

  pStyle: {
    marginTop: 10,
    color: Colors.white,
    fontSize: 16,
  },
  hStyle: {color: Colors.white},
});
