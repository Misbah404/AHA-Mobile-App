// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.purple,
    padding: 3,
    marginHorizontal: 5,
    borderRadius: 3,
    flexDirection: 'row',
  },
  filterTextStyle: {
    marginLeft: 5,
    fontSize: Fonts.size.xSmall,
    fontFamily: Fonts.type.Asap,
    maxWidth: 50,
  },
  crossIconCont: {
    alignSelf: 'center',
  },
  crossIcon: {
    width: 7,
    marginLeft: 10,
    marginRight: 5,
    height: 7,
  },
});
