import React from 'react';
import {
  ScrollView, View
} from 'react-native';
import { CommunityOption, CustomNavbar } from '../../components';
import { communityOptions } from '../../constants';
import { AppStyles } from '../../theme';
import styles from './CommunityOptionsContainerStyles';

export default function CommunityOptionsContainerView(props) {
  const {index, communityName} = props;
  return (
    <>
      <CustomNavbar
        title={communityName}
        hasBack
        titleStyle={AppStyles.titleStyleForCenter}
        leftRightButtonWrapperStyle={{justifyContent: 'center'}}
      />

      <ScrollView style={styles.container}>
        <View style={styles.collectionMainView}>
          <CommunityOption array={communityOptions[index]} />
        </View>
      </ScrollView>
    </>
  );
}
