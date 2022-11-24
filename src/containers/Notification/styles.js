import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background.primary},
  selectionListView: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  selectionListStyle: {
    paddingHorizontal: 20,
    paddingLeft: 20,
  },
  newView: {
    height: 0.4,
  },
  newTxt: {
    color: Colors.white,
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.semiBold,
  },
  earlierView: {
    height: 0.4,
    // backgroundColor: 'rgba(60, 60, 67, 0.29)',
    marginTop: 20,
  },
  itemLikeView: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  img: {width: 30, height: 30, borderRadius: 15},
  imgNoView: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.headerTitle,
  },
  itemTxt: {
    color: Colors.white,
    alignSelf: 'center',

    fontSize: 17,
    fontFamily: Fonts.type.semiBold,
  },
  itemMessageTxt: {
    color: Colors.gray10,
  },
  userName: {
    flex: 0.7,
    alignItems: 'flex-start',

    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hrsTxt: {
    color: Colors.gray7,
    marginTop: 2,
    marginLeft: 8,
  },
  postImg: {
    width: 44,
    height: 44,
    position: 'absolute',

    right: 10,
  },
  nameAndSentenceView: {
    flex: 0.7,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
});
