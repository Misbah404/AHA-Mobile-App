import React, {useMemo} from 'react';
import {Image, ImageBackground, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  Text,
} from '../../components';
import {strings} from '../../constants';
import {Images} from '../../theme';
import styles from './styles';

function BeAnArtistOnboarding(props) {
  const {userContact} = props;
  const navBar = useMemo(() => {
    return (
      <CustomNavbar
        hasBack={true}
        title={strings.BECOME_AN_ARTIST}
        titleStyle={styles.title}
        subTitle={strings.LET_GO_WITH_FLOW}
        shouldShowHorizontalBar={true}
      />
    );
  }, []);

  const bannerImage = useMemo(() => {
    return (
      <Image
        source={Images.emailVerificationImageBanner}
        style={[styles.phoneImgStyle]}
        resizeMode={'contain'}
      />
    );
  }, []);

  const becomeAnArtistForm = useMemo(() => {
    return (
      <TouchableOpacity
        onPress={() => Actions.personalInfoArtist({userContact: userContact})}
        style={styles.becomeArtirtView}>
        <View style={styles.becomeArtirtInnerView}>
          <View style={styles.becomeArtistInnerImageView}>
            <Image
              style={styles.becomeArtistInnerImage}
              source={Images.becomeArtirtInner}
            />
          </View>
          <View style={styles.becomeArtistInnerTxtView}>
            <Text style={styles.becomeArtistTxt}>
              {strings.BECOME_AN_ARTIST}
            </Text>
            <Text style={styles.becomeArtistDescriptionTxt}>
              {strings.BECOME_ARTIST_DESCRIPTION}{' '}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => Actions.personalInfoArtist({userContact: userContact})}
          style={styles.becomeArtistClickView}>
          <Image
            style={styles.becomeArtistInnerClickImage}
            source={Images.becomeArtirtClick}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }, [userContact]);

  return (
    <ImageBackground
      style={styles.container}
      source={Images.onBoardingBottomBgImg}>
      {navBar}
      <KeyboardAwareScrollViewComponent scrollEnabled={true}>
        {bannerImage}
        {becomeAnArtistForm}
        <TouchableOpacity
          onPress={() => Actions.personalInfo({userContact})}
          style={styles.skipTxtView}>
          <Text style={styles.skipTxt}>Skip</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollViewComponent>
    </ImageBackground>
  );
}

BeAnArtistOnboarding.propTypes = {};
BeAnArtistOnboarding.defaultProps = {};

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(BeAnArtistOnboarding);
