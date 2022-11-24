import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../../theme';

export default StyleSheet.create({
  headingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  heading: {
    fontSize: Fonts.size.normal,
    color: Colors.text.grey1,
  },
  moreButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreButtonImage: {
    height: 8,
    width: 8,
    tintColor: Colors.text.grey1,
    marginLeft: 8,
    marginTop: 2,
  },
  radiusView: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  radiusView2: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginTop: 20,
    overflow: 'hidden',
  },
  emptyViewSec: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: Metrics.screenHeight - (Metrics.screenHeight * 37) / 100,
  },
  searchToContSec: {
    position: 'absolute',
    alignSelf: 'center',
    top: '27%',
  },
});
