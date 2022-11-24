import React from 'react';
import { FlatList, View } from 'react-native';
import { CustomNavbar, VibeItem } from '../../components';
import { arts, strings } from '../../constants';
import { AppStyles, Metrics } from '../../theme';
import styles from './ArtsStyles';

export default function ArtsView(props) {
  const {fromCommunity} = props;
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={
          fromCommunity ? strings.ARTS : strings.THINGS_FOR_EVERY_POP_LOVER
        }
        hasBack
        titleStyle={AppStyles.titleStyleForCenter}
        leftRightButtonWrapperStyle={AppStyles.centerInner}
      />
      <FlatList
        numColumns={2}
        data={arts}
        keyExtractor={(_, index) => index}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.collectionMainView}
        renderItem={({item}) => (
          <VibeItem
            _item={item}
            imageWidth={'50.01%'}
            imageHeight={Metrics.screenHeight / 2.45}
            isTextCenter={true}
          />
        )}
      />
    </View>
  );
}
