import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from '../../theme';

const KeyboardAwareScrollViewComponent = props => (
  <KeyboardAwareScrollView
    showsVerticalScrollIndicator={false}
    bounces={false}
    behavior={'padding'}
    keyboardShouldPersistTaps="handled"
    enableOnAndroid={true}
    extraHeight={150}
    extraScrollHeight={20}
    alwaysBounceVertical={false}
    keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
    scrollEnabled={props.scrollEnabled}
    enableAutomaticScroll={true}
    contentContainerStyle={props?.style}
    style={{backgroundColor: Colors.background.primary}}>
    {props?.children}
  </KeyboardAwareScrollView>
);

export default KeyboardAwareScrollViewComponent;
