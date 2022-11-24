import React from 'react';
import { FlatList, View } from 'react-native';
import { CustomNavbar, VibeItem } from '../../components';
import { collections, strings } from '../../constants';
import { AppStyles } from '../../theme';
import styles from './CollectionStyles';

export default function CollectionView(props) {
  const {fromCommunity} = props;
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={
          fromCommunity
            ? strings.COLLECTIONS
            : strings.THINGS_FOR_EVERY_POP_LOVER
        }
        hasBack
        titleStyle={AppStyles.titleStyleForCenter}
        leftRightButtonWrapperStyle={{justifyContent: 'center'}}
      />

      <FlatList
        numColumns={3}
        data={collections}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.collectionMainView}
        renderItem={({item}) => <VibeItem _item={item} />}
      />
    </View>
  );
}
