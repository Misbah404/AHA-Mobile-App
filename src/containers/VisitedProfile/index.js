import {View, Text} from 'react-native';
import React from 'react';
import VisitArtirstProfile from './VisitArtirstProfile/index';
import VisitUserProfile from './VisitUserProfile/index';
import {Colors} from '../../theme';

export default function VisitedProfile(props) {
  const {isArtirst, feedItem} = props || {};
  return (
    <View style={{flex: 1, backgroundColor: Colors.background.primary}}>
      {isArtirst ? (
        <VisitArtirstProfile feedItem={feedItem} />
      ) : (
        <VisitUserProfile feedItem={feedItem} />
      )}
    </View>
  );
}
