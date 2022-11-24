import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { CustomNavbar } from '../../components';
import { fedex, strings } from '../../constants';
import { AppStyles } from '../../theme';
import styles from './FindFedexStyles';

export default function FindFedexView(props) {
  const {} = props;
  return (
    <>
      <CustomNavbar
        title={strings.FIND_FEDEX}
        titleStyle={AppStyles.titleStyleForLeft}
        leftRightButtonWrapperStyle={{justifyContent: 'center'}}
        hasBack
      />
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={fedex}
          keyExtractor={(_, index) => index}
          renderItem={({item}) => {
            return (
              <View style={styles.view}>
                <View style={[AppStyles.flex3]}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>

                <View style={styles.icon}>
                  <Image source={item.icon} resizeMode="contain" />
                </View>
              </View>
            );
          }}
        />
      </View>
    </>
  );
}
