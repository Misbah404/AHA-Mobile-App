// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  itemEventView: {
    height: 120,
    width: '100%',
    marginVertical: 5,
    borderRadius: 10,
    alignSelf: 'center',
  },
  eventViewDetail: {
    height: 120,
    width: '100%',
    borderRadius: 10,
  },
  itemEventImage: {
    height: 120,
    width: '100%',
    borderRadius: 10,
    opacity: 0.5,
  },
  itemEventDateTxt: {
    alignSelf: 'flex-end',
    height: 30,
    color: Colors.white,
    fontFamily: Fonts.type.Asap,
    fontSize: Fonts.size.xxSmall,
    marginTop: 5,
    marginRight: 10,
    fontWeight: '600',
    zIndex: 1,
    position: 'absolute',
  },
  itemEventnNameView: {flexDirection: 'row', flex: 1},
  itemEventNameTxt: {
    alignSelf: 'flex-end',
    color: Colors.white,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.xLarge,
    marginBottom: 5,
    marginHorizontal: 20,
    alignItems: 'flex-end',
    zIndex: 2,
  },
  itemEventDispcriptionTxt: {
    color: Colors.white,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.xSmall,
    marginBottom: 15,
    marginHorizontal: 20,
    alignItems: 'flex-end',
    fontWeight: '400',
  },
});
