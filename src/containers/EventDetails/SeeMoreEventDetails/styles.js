// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  itemEventView: {
    height: 120,
    width: '95%',
    marginVertical: 5,
    borderRadius: 10,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  eventViewDetail: {
    shadowColor: 'rgba(22,36,49,0.4)',
    shadowOffset: {width: 0, height: -120},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    height: 120,
    width: '100%',
    marginVertical: 5,
    borderRadius: 10,
  },
  itemEventImage: {
    height: 120,
    width: '100%',
    marginVertical: 5,
    borderRadius: 10,
  },
  itemEventDateTxt: {
    alignSelf: 'flex-end',
    color: Colors.white,
    fontFamily: Fonts.type.Asap,
    fontSize: Fonts.size.xxSmall,
    marginTop: 5,
    marginRight: 10,
    fontWeight: '600',
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
