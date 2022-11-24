import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import util from '../util';

export const FBLogin = async loginRequest => {
  LoginManager.logOut();
  if (util.isPlatformAndroid) {
    LoginManager.setLoginBehavior('web_only');
  }

  await LoginManager.logInWithPermissions([
    // 'name',
    //'picture',
    'email',
    'public_profile',
  ]).then(
    function (result) {
      if (result.isCancelled) {
      } else {
        AccessToken.getCurrentAccessToken().then(data => {
          loginRequest(data.accessToken, 'facebook');
        });
      }
    },
    function (error) {
      console.log({error});
    },
  );
};
