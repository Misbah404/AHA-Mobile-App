import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    zIndex: 1,
    paddingTop: 0,
  },

  wrapperStyle: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  draggableIconStyle: {
    top: 2,
    width: 85,
    backgroundColor: '#f0f3f5',
  },

  bottomSheetContainerPressStyle: {
    top: -70,
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
    position: 'absolute',
  },
});
