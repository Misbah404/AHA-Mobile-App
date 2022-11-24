// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: '#0B1319',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 4,
  },

  textView: {
    flex: 1,
    marginLeft: 15,
    color: Colors.white,
  },
  activityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: Colors.primary,
    height: '100%',
    width: '100%',
  },

  description: {
    fontSize: 13,
    color: Colors.white,
  },

  amount: {
    fontSize: 16,
    fontFamily: Fonts.type.bold,
    marginTop: 5,
    color: Colors.white,
  },

  sizeAndQuantity: {
    fontSize: 13,
    marginTop: 4,
    color: Colors.white,
  },
});
