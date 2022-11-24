import React from 'react';
import { FlatList, View } from 'react-native';
import { CustomNavbar, VibeItem } from '../../components';
import { events, strings } from '../../constants';
import { AppStyles, Metrics } from '../../theme';
import styles from './EventsStyles';

export default function EventsView(props) {
  const {fromCommunity} = props;
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={
          fromCommunity ? strings.EVENTS : strings.THINGS_FOR_EVERY_POP_LOVER
        }
        hasBack
        titleStyle={AppStyles.titleStyleForCenter}
        leftRightButtonWrapperStyle={AppStyles.centerInner}
      />

      <FlatList
        numColumns={2}
        data={events}
        keyExtractor={(_, index) => index}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.collectionMainView}
        renderItem={({item}) => (
          <VibeItem
            imageWidth={'50.01%'}
            imageHeight={Metrics.screenHeight / 2.45}
            isTextCenter={true}
            _item={item}
          />
        )}
      />
    </View>
  );
}
