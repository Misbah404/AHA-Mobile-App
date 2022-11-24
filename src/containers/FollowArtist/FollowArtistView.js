import React from 'react';
import { FlatList, ImageBackground, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ArtistAndCommunityItem, CustomNavbar } from '../../components';
import OnBoardingBottomButtons from '../../components/OnBoardingBottomButtons';
import { strings } from '../../constants';
import { Images } from '../../theme';
import styles from './FollowArtistStyles';

export default function FollowArtistView(props) {
  const {artistsList, followButtonPressHandler} = props;

  return (
    <ImageBackground source={Images.onBoardingBgImage} style={styles.container}>
      <CustomNavbar
        hasBack={true}
        title={strings.FOLLOW_ARTIST}
        titleStyle={styles.title}
        subTitle={strings.FIND_YOUR_ARTIST}
        shouldShowHorizontalBar={true}
        style={{backgroundColor: 'transparent'}}
      />

      <View style={styles.flatListCont}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={artistsList}
          keyExtractor={(_, index) => index}
          renderItem={({item, index}) => (
            <ArtistAndCommunityItem
              _item={item}
              followButtonPressHandler={followButtonPressHandler}
            />
          )}
        />
      </View>

      <OnBoardingBottomButtons
        onSkipBtnPress={() => {
          Actions.reset('dashboard');
        }}
        onNextBtnPress={() => {
          Actions.followCommunity();
        }}
      />
    </ImageBackground>
  );
}
