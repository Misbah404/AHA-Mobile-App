import React, {useEffect, useMemo} from 'react';
import {View, Image} from 'react-native';
import {CustomNavbar, ButtonView, Text} from '../../components';
import {Colors, AppStyles, Fonts, Images} from '../../theme';
import {strings} from '../../constants';
import styles from './styles';
import {Actions} from 'react-native-router-flux';
import {mixpanel} from '../../helpers/mixpanelHelper';

export default function ArtistPreferences() {
  const navBar = useMemo(() => {
    return (
      <CustomNavbar
        hasBack
        titleStyle={AppStyles.titleStyleForLeft}
        leftRightButtonWrapperStyle={{justifyContent: 'center'}}
        title={strings.SETTINGS}
      />
    );
  }, []);

  useEffect(() => {
    mixpanel.track('Visit', {
      PageName: 'Artist Preferences',
    });
  }, []);

  function ArtistPreferencesList() {
    return (
      <View style={{flex: 1, margin: 30}}>
        <Text
          color={Colors.white}
          type={Fonts.type.Asap}
          style={styles.artirstPreferenceTxt}
          size={Fonts.size.large}>
          Artist Preferences
        </Text>

        <View style={{marginTop: 20}}>
          <ButtonView
            onPress={() => Actions.yourVibe()}
            style={[styles.artirstView]}>
            <Image source={Images.yourVibesIcon} />
            <Text
              color={Colors.white}
              type={Fonts.type.Asap}
              style={styles.artirstTxt}
              size={Fonts.size.normal}>
              Artist Vibe
            </Text>
          </ButtonView>

          <ButtonView
            onPress={() => Actions.yourInterest()}
            style={styles.artirstView}>
            <Image source={Images.yourInterestIcon} />
            <Text
              color={Colors.white}
              type={Fonts.type.Asap}
              style={styles.artirstTxt}
              size={Fonts.size.normal}>
              Artist Interest
            </Text>
          </ButtonView>
          <ButtonView
            onPress={() => Actions.artistCommunitiesListing()}
            style={styles.artirstView}>
            <Image source={Images.yourCommunityIcon} />
            <Text
              color={Colors.white}
              type={Fonts.type.Asap}
              style={styles.artirstTxt}
              size={Fonts.size.normal}>
              Artist Community
            </Text>
          </ButtonView>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.background.primary}}>
      {navBar}
      {ArtistPreferencesList()}
    </View>
  );
}
