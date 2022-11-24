// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: '#0B1319',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  viewOneTracking: {flexDirection: 'row', alignItems: 'center', zIndex: 1},
  radioViewMain: {
    backgroundColor: '#DBDEE5',
    width: 21,
    height: 21,
    borderRadius: 10.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioBtnInner: {
    backgroundColor: Colors.black,
    width: 15,
    height: 15,
    borderRadius: 7.5,
  },
  statusMainView: {marginLeft: 10},
  statusTxt: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: Fonts.size.small,
  },
  dateTracking: {
    color: Colors.text.secondary,
    fontWeight: '500',
    fontSize: Fonts.size.xxxSmall,
  },
  trackingLineView: {
    height: 90,
    width: 1,
    overflow: 'hidden',
    marginLeft: 10,
    marginTop: -10,
    marginBottom: -10,
  },
  dottedLineView: {
    height: 150,
    borderWidth: 2,
    borderColor: '#DBDEE5',
    borderStyle: 'dashed',
  },
});
