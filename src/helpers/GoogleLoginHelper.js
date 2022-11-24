import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import util from '../util';

GoogleSignin.configure({
  iosClientId:
    '211338026456-6kf2or0edu4dt5oe7p70i6sb0gh3bia1.apps.googleusercontent.com',
  webClientId:
    '211338026456-ru65t7gfceker97gpq4burnr9gdii8ps.apps.googleusercontent.com',
  offlineAccess: true,
  androidClientId:
    '211338026456-ti5fv0kf6n2fa5p2kjdgjauu2ps30tjs.apps.googleusercontent.com',
  forceCodeForRefreshToken: true,
});

export const GoogleLogin = async loginRequest => {
  try {
    await GoogleSignin.signOut();

    const hasGooglePlayServices = await GoogleSignin.hasPlayServices();
    if (!hasGooglePlayServices) {
    }
    const userInfo = await GoogleSignin.signIn();

    loginRequest(userInfo.idToken, 'google');
  } catch (error) {
    console.log({error});
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    } else if (error.code === statusCodes.IN_PROGRESS) {
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    } else {
    }
  }
};
