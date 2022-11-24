import {Platform} from 'react-native';
import jwt_decode from 'jwt-decode';
import _ from 'lodash';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {strings, SOCIAL_LOGIN_TYPES} from '../constants';
import util from '../util';

export const appleSignIn = async loginRequest => {
  if (Platform.OS === 'ios') {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      const {identityToken, fullName, nonce} = appleAuthRequestResponse;
      const {familyName, givenName} = fullName;

      const decoded = jwt_decode(identityToken);

      const {email} = decoded;

      let name = null;
      if (!_.isNil(givenName)) {
        name = `${givenName}`;
      }

      if (!_.isNil(familyName)) {
        name += ` ${familyName}`;
      }

      if (_.isNil(familyName) && _.isNil(givenName)) {
        let splittedArr = _.split(email, '@');
        name = splittedArr[0].replace(/[0-9]/g, '');
      }

      const payload = {
        email: email,
        name: name,
      };

      loginRequest(payload, 'apple');
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        // errorCallback({token_type: SOCIAL_LOGIN_TYPES.apple});
        console.log({error});
      } else {
        console.warn({error});
        //errorCallback({token_type: SOCIAL_LOGIN_TYPES.apple});
      }
    }
  }
};
