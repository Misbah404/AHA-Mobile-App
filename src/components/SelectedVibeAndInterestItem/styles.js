// @flow
import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  selectedItemView: {
    backgroundColor: Colors.background.purple,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 10,
    width: '47.6%',
    marginRight: 10,
  },
  selectedItemText: {
    marginLeft: 7,
    marginRight: 10,
    fontSize: 16,
  },
  crossIcon: {
    position: 'absolute',
    right: -5,
    top: -5,
    width: 14,
  },
  imageStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});
