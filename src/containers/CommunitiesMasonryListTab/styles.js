// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, AppStyles} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background.primary},
  headerView: {flex: 0.5, marginBottom: 20},
  mansoryListView: {marginTop: 40, flex: 9},
  mansoryListContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    paddingBottom: 20,
  },
  itemView: {alignSelf: 'stretch', borderRadius: 5, margin: 2},
  titleTxt: {
    marginTop: 8,
    color: Colors.white,
    position: 'absolute',
    bottom: 5,
    left: 10,
    fontSize: Fonts.size.xxSmall,
    right: 20,
    fontFamily: Fonts.type.Asap,
  },
  imgItem: {position: 'absolute', left: 5, top: 5},
});
