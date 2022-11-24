// @flow

import {Platform} from 'react-native';

const type = {
  bold: 'Asap-Bold',
  semiBold: 'Asap-Bold',
  medium: 'Asap-Medium',
  regular: 'Asap-Regular',
  bold_italic: 'Asap-BoldItalic',
  italic: 'Asap-Italic',
  medium_italic: 'Asap-MediumItalic',
  semiBold_italic: 'Asap-SemiBoldItalic',
  Asap: Platform.select({
    ios: 'Asap',
    android: 'Asap',
  }),
};

// Metrics.generatedFontSize(ios, android)

const size = {
  xxxxSmall: 10,
  xxxSmall: 11,
  xxSmall: 13,
  xSmall: 14,
  small: 15,
  normal: 17,
  medium: 18,
  large: 20,
  xLarge: 24,
  xxLarge: 30,
  xxxLarge: 36,
  xxxxLarge: 40,
};

export default {
  type,
  size,
};
