// @flow
import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  horizontalLine: {
    width: 100,
    height: 2,
    backgroundColor: Colors.border.primary,
  },
  circle: {
    height: 68,
    width: 68,
    borderColor: Colors.border.primary,
    borderWidth: 4,
    borderRadius: 40,
    backgroundColor: Colors.appColorPurple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIconStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
