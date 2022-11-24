import {call, fork, takeLatest, put, take} from 'redux-saga/effects';
import {
  ADDRESSES_LIST,
  ADDRESS_DELETE,
  BECOME_AN_ARTIST,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CHANGE_PHONE,
  CHANGE_PHONE_OPT,
  CHOOSE_YOUR_INTERESTS,
  CHOOSE_YOUR_VIBE,
  CONTACT_ADMIN,
  CREATE_ADDRESS,
  DELETE_PROFILE_SUBSECTION_DATA,
  EDIT_PROFILE,
  FOLLOW_UNFOLLOW_ARTIST,
  GET_FOLLOWERS_LIST,
  GET_FOLLOWING_LIST,
  GET_LOGGED_IN_USER_DETAILS,
  GET_POSTS_LIST_BY_USER_ID,
  GET_PROFILE_SECTIONS,
  GET_SELECTED_COMMUNITIES,
  GET_SELECTED_INTERESTS,
  GET_SELECTED_VIBES,
  PERSONAL_INFO,
  POST_PROFILE_DATA,
  REMOVE_FOLLOWER,
  SELECT_DEFAULT,
  SIGNUP_RESEND_OTP,
  UPDATE_ADDRESS,
  UPDATE_USER_PROFILE,
  USER_CONFIRM_OTP_FGPASS,
  USER_CONFIRM_OTP_SIGNUP,
  USER_FORGOT_PASSWORD,
  USER_SIGNIN,
  USER_SIGNOUT,
  USER_SIGNUP,
  USER_UPDATE_PASSWORD,
  GET_FOLLOWING_SEARCH_LIST,
  GET_FOLLOWER_SEARCH_LIST,
  SOCAIL_LOGIN,
  MARK_PICKING_POINT,
} from '../actions/ActionTypes';
import {
  allAddressesSuccess,
  becomeAnArtistSuccess,
  changeEmailSuccess,
  changePasswordSuccess,
  changePhoneSuccess,
  createAddressSuccess,
  deleteAddressSuccess,
  editProfileSuccess,
  followUnFollowArtistSuccess,
  getFollowerListSearchSuccess,
  getFollowersListSuccess,
  getFollowingListSearchSuccess,
  getFollowingListSuccess,
  getLoggedInUserDetailsSuccess,
  getPostsListByUserIDRequest,
  getPostsListByUserIDSuccess,
  getProfileSectionsSuccess,
  getSelectedCommunitiesSuccess,
  getSelectedInterestsSuccess,
  getSelectedVibesSuccess,
  markPickingPointSucces,
  removeFollowerSuccess,
  selectDefaultAddressSuccess,
  updateAddressSuccess,
  updateUserProfileSuccess,
  userSigninSuccess,
  userSignOutSuccess,
} from '../actions/UserActions';
import {
  ADDRESSES_LIST as ADDRESSES_LIST_URL,
  ADDRESS_DELETE as ADDRESS_DELETE_URL,
  BECOME_AN_ARTIST as BECOME_AN_ARTIST_URL,
  callRequest,
  CHANGE_EMAIL as CHANGE_EMAIL_URL,
  CHANGE_PASSWORD as CHANGE_PASSWORD_URL,
  CHANGE_PHONE as CHANGE_PHONE_URL,
  CHANGE_PHONE_OPT as CHANGE_PHONE_OPT_URL,
  CHOOSE_YOUR_INTERESTS as CHOOSE_YOUR_INTERESTS_URL,
  CHOOSE_YOUR_VIBE as CHOOSE_YOUR_VIBE_URL,
  CONTACT_ADMIN as CONTACT_ADMIN_URL,
  CREATE_ADDRESS as CREATE_ADDRESS_URL,
  DELETE_PROFILE_SUBSECTION_DATA as DELETE_PROFILE_SUBSECTION_DATA_URL,
  EDIT_PROFILE as EDIT_PROFILE_URL,
  FOLLOW_UNFOLLOW_ARTIST as FOLLOW_UNFOLLOW_ARTIST_URL,
  GET_FOLLOWERS_LIST as GET_FOLLOWERS_LIST_URL,
  GET_FOLLOWING_LIST as GET_FOLLOWING_LIST_URL,
  GET_LOGGED_IN_USER_DETAILS as GET_LOGGED_IN_USER_DETAILS_URL,
  GET_POSTS_LISTING as GET_POSTS_LISTING_URL,
  GET_PROFILE_SECTIONS as GET_PROFILE_SECTIONS_URL,
  GET_SELECTED_COMMUNITIES as GET_SELECTED_COMMUNITIES_URL,
  GET_SELECTED_INTERESTS as GET_SELECTED_INTERESTS_URL,
  GET_SELECTED_VIBES as GET_SELECTED_VIBES_URL,
  PERSONAL_INFO as PERSONAL_INFO_URL,
  POST_PROFILE_DATA as POST_PROFILE_DATA_URL,
  REMOVE_FOLLOWER as REMOVE_FOLLOWER_URL,
  SELECT_DEFAULT as SELECT_DEFAULT_URL,
  SIGNUP_RESEND_OTP as SIGNUP_RESEND_OTP_URL,
  UPDATE_ADDRESS as UPDATE_ADDRESS_URL,
  UPDATE_USER_PROFILE as UPDATE_USER_PROFILE_URL,
  USER_CONFIRM_OTP_FGPASS as USER_CONFIRM_OTP_FGPASS_URL,
  USER_CONFIRM_OTP_SIGNUP as USER_CONFIRM_OTP_SIGNUP_URL,
  USER_FORGOT_PASSWORD as USER_FORGOT_PASSWORD_URL,
  USER_SIGNIN as USER_SIGNIN_URL,
  USER_SIGNOUT as USER_SIGNOUT_URL,
  USER_SIGNUP as USER_SIGNUP_URL,
  USER_UPDATE_PASSWORD as USER_UPDATE_PASSWORD_URL,
  SOCAIL_LOGIN as SOCAIL_LOGIN_URL,
  MARK_PICKING_POINT as MARK_PICKING_POINT_URL,
} from '../config/WebService';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';
import {manipulateCommunitiesListData} from '../helpers/communityHelper';
import {manipulatePostsListingData} from '../helpers/postsHelper';
import {
  manipulateFollowingAndFollowersList,
  manipulateLoggedInUserObject,
  manipulateSignInAndPersonsalInfoData,
} from '../helpers/userHelper';
import ApiSauce from '../services/ApiSauce';
import {default as util, default as Util} from '../util';

function alertMessage(message, type = 'error') {
  setTimeout(() => {
    Util.topAlertError(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* signup() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_SIGNUP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNUP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response?.status ?? false) {
        if (responseCallback) responseCallback(response);
        Util.topAlert(response?.message ?? '');
      } else {
        if (responseCallback) responseCallback(response);
        alertMessage(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* signin() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_SIGNIN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNIN_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response?.status ?? false) {
        yield put(
          userSigninSuccess(
            manipulateSignInAndPersonsalInfoData(response?.data ?? {}),
          ),
        );
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* signUpResendOTP() {
  while (true) {
    const {payload, responseCallback} = yield take(SIGNUP_RESEND_OTP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SIGNUP_RESEND_OTP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response?.status ?? false) {
        if (responseCallback) responseCallback(response);
        Util.topAlert(response?.message ?? '');
      } else {
        if (responseCallback) responseCallback(response);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* signout() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_SIGNOUT.REQUEST);

    try {
      const response = yield call(
        callRequest,
        USER_SIGNOUT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response?.status ?? false) {
        if (responseCallback) responseCallback(true, null);
        yield put(userSignOutSuccess());
      } else {
        alertMessage(strings.SOMETHING_WENT_WRONG);
        yield put(userSignOutSuccess());
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      yield put(userSignOutSuccess());
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* updateUserProfile() {
  while (true) {
    const {payload, responseCallback} = yield take(UPDATE_USER_PROFILE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPDATE_USER_PROFILE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response?.status ?? false) {
        yield put(
          updateUserProfileSuccess({
            first_name: payload.first_name,
            phone: payload.phone,
          }),
        );
        if (responseCallback) responseCallback(response.data, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alertMessage(strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* becomeAnArtist() {
  while (true) {
    const {payload, responseCallback} = yield take(BECOME_AN_ARTIST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        BECOME_AN_ARTIST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(becomeAnArtistSuccess(payload));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* personalInfo() {
  while (true) {
    const {payload, responseCallback} = yield take(PERSONAL_INFO.REQUEST);
    try {
      const response = yield call(
        callRequest,
        PERSONAL_INFO_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          userSigninSuccess(
            manipulateSignInAndPersonsalInfoData(response.data),
          ),
        );
        if (responseCallback) responseCallback(response.status);
      } else {
        const msg = response?.message ?? strings.SOMETHING_WENT_WRONG;
        if (responseCallback) responseCallback(response.status);
        alertMessage(msg);
      }
    } catch (err) {
      const msg = err?.message ?? strings.SOMETHING_WENT_WRONG;
      if (responseCallback) responseCallback(false);
      alertMessage(msg);
    }
  }
}

function* forgotPassword() {
  while (true) {
    const {payload, responseCallback} = yield take(
      USER_FORGOT_PASSWORD.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        USER_FORGOT_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response);
        util.topAlert(response?.message ?? '');
      } else {
        if (responseCallback) responseCallback(response);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* confirmOTP_FGPASS() {
  while (true) {
    const {payload, responseCallback} = yield take(
      USER_CONFIRM_OTP_FGPASS.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        USER_CONFIRM_OTP_FGPASS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* confirmOTP_SIGNUP() {
  while (true) {
    const {payload, responseCallback} = yield take(
      USER_CONFIRM_OTP_SIGNUP.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        USER_CONFIRM_OTP_SIGNUP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response.status);
        yield put(
          userSigninSuccess(
            manipulateSignInAndPersonsalInfoData(response.data),
          ),
        );
      } else {
        if (responseCallback) responseCallback(response.status);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* updatePassword() {
  while (true) {
    const {payload, responseCallback} = yield take(
      USER_UPDATE_PASSWORD.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        USER_UPDATE_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response.status);
        util.topAlert(
          response?.message ?? strings.YOUR_PASSWORD_HAS_BEEN_RESET,
        );
      } else {
        if (responseCallback) responseCallback(response.status);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* contactAdmin() {
  while (true) {
    const {payload, responseCallback} = yield take(CONTACT_ADMIN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CONTACT_ADMIN_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.success) {
        if (responseCallback) responseCallback(response.message, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* getProfileSections() {
  while (true) {
    const {responseCallback} = yield take(GET_PROFILE_SECTIONS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_PROFILE_SECTIONS_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.success) {
        if (responseCallback) responseCallback(true, null);
        yield put(getProfileSectionsSuccess(response.data));
      } else {
        if (responseCallback) responseCallback(null, null);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* postProfileData() {
  while (true) {
    const {payload, responseCallback} = yield take(POST_PROFILE_DATA.REQUEST);
    try {
      const response = yield call(
        callRequest,
        POST_PROFILE_DATA_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.success) {
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* chooseYourInterests() {
  while (true) {
    const {payload, responseCallback} = yield take(
      CHOOSE_YOUR_INTERESTS.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        CHOOSE_YOUR_INTERESTS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* chooseYourVibe() {
  while (true) {
    const {payload, responseCallback} = yield take(CHOOSE_YOUR_VIBE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CHOOSE_YOUR_VIBE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* deleteProfileSubSectionDataRequest() {
  while (true) {
    const {payload, responseCallback} = yield take(
      DELETE_PROFILE_SUBSECTION_DATA.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        DELETE_PROFILE_SUBSECTION_DATA_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.success) {
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* createAddress() {
  while (true) {
    const {payload, responseCallback} = yield take(CREATE_ADDRESS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CREATE_ADDRESS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(createAddressSuccess(response.data));
        if (responseCallback) responseCallback(response, null);
        Util.topAlert(response.message);
      } else {
        if (responseCallback) responseCallback(null, null);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* updateAddress() {
  while (true) {
    const {payload, params, responseCallback} = yield take(
      UPDATE_ADDRESS.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        UPDATE_ADDRESS_URL,
        payload,
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(updateAddressSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
        Util.topAlert(response.message);
      } else {
        if (responseCallback) responseCallback(null, null);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* defaultAddress() {
  while (true) {
    const {payload, responseCallback} = yield take(SELECT_DEFAULT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SELECT_DEFAULT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(selectDefaultAddressSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
        Util.topAlert(response.message);
      } else {
        if (responseCallback) responseCallback(null, null);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* allAddress() {
  while (true) {
    const {payload, responseCallback} = yield take(ADDRESSES_LIST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ADDRESSES_LIST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(allAddressesSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* deleteAddress() {
  while (true) {
    const {params, responseCallback} = yield take(ADDRESS_DELETE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ADDRESS_DELETE_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response?.status ?? false) {
        yield put(deleteAddressSuccess(params));
        if (responseCallback) responseCallback(true, null);
        Util.topAlert(response.message);
      } else {
        if (responseCallback) responseCallback(null, null);
        alertMessage(strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}
function* editProfile() {
  while (true) {
    const {payload, responseCallback} = yield take(EDIT_PROFILE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        EDIT_PROFILE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response?.status ?? false) {
        yield put(editProfileSuccess(payload));
        if (responseCallback) responseCallback(true, null);
        Util.topAlert(
          response?.message ?? strings.YOUR_RESPONSE_ADDED_SUCCESSFULLY,
        );
      } else {
        if (responseCallback) responseCallback(null, null);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* changePassword() {
  while (true) {
    const {payload, responseCallback} = yield take(CHANGE_PASSWORD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CHANGE_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response?.status ?? false) {
        yield put(changePasswordSuccess(response));
        if (responseCallback) responseCallback(true, null);
        Util.topAlert(
          response?.message ?? strings.YOUR_RESPONSE_ADDED_SUCCESSFULLY,
        );
      } else {
        if (responseCallback) responseCallback(null, null);
        Util.topAlertError(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* changeEmail() {
  while (true) {
    const {payload, responseCallback} = yield take(CHANGE_EMAIL.REQUEST);

    try {
      const response = yield call(
        callRequest,
        CHANGE_EMAIL_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response?.status ?? false) {
        yield put(changeEmailSuccess(payload));
        if (responseCallback) responseCallback(true, null);
        Util.topAlert(
          response?.message ?? strings.YOUR_RESPONSE_ADDED_SUCCESSFULLY,
        );
      } else {
        if (responseCallback) responseCallback(null, null);
        Util.topAlertError(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* changePhone() {
  while (true) {
    const {payload, responseCallback} = yield take(CHANGE_PHONE.REQUEST);

    try {
      const response = yield call(
        callRequest,
        CHANGE_PHONE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response?.status ?? false) {
        yield put(changePhoneSuccess(response.data));
        if (responseCallback) responseCallback(response, null);
        Util.topAlert(
          response?.message ?? strings.YOUR_RESPONSE_ADDED_SUCCESSFULLY,
        );
      } else {
        if (responseCallback) responseCallback(null, null);
        Util.topAlertError(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* changePhoneOTP() {
  while (true) {
    const {payload, responseCallback} = yield take(CHANGE_PHONE_OPT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CHANGE_PHONE_OPT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response?.status ?? false) {
        if (responseCallback) responseCallback(response, null);
        Util.topAlert(response?.message ?? '');
      } else {
        if (responseCallback) responseCallback(null, null);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback({status: false});
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* getSelectedVibes() {
  while (true) {
    const {responseCallback} = yield take(GET_SELECTED_VIBES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_SELECTED_VIBES_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response?.status ?? false) {
        yield put(getSelectedVibesSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* getSelectedInterests() {
  while (true) {
    const {responseCallback} = yield take(GET_SELECTED_INTERESTS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_SELECTED_INTERESTS_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response?.status ?? false) {
        yield put(getSelectedInterestsSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* getSelectedCommunities() {
  while (true) {
    const {responseCallback} = yield take(GET_SELECTED_COMMUNITIES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_SELECTED_COMMUNITIES_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response?.status ?? false) {
        getSelectedCommunitiesSuccess(
          manipulateCommunitiesListData(response.data),
        ),
          yield put(
            getSelectedCommunitiesSuccess(
              manipulateCommunitiesListData(response.data),
            ),
          );
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* getLoggedInUserDetails() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_LOGGED_IN_USER_DETAILS.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_LOGGED_IN_USER_DETAILS_URL,
        {},
        payload,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          getLoggedInUserDetailsSuccess(
            manipulateLoggedInUserObject(response.data),
          ),
        );
        if (responseCallback)
          responseCallback(manipulateLoggedInUserObject(response.data));
      } else {
        if (responseCallback) responseCallback(response.status);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* getFollowersList() {
  while (true) {
    const {params, payload, responseCallback} = yield take(
      GET_FOLLOWERS_LIST.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_FOLLOWERS_LIST_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response?.status ?? false) {
        const {id} = payload;
        const followersList = manipulateFollowingAndFollowersList(
          response.data,
        );
        const data = {
          id,
          followersList,
        };
        yield put(getFollowersListSuccess(data));
        if (responseCallback) responseCallback(data.followersList);
      } else {
        const {id} = payload;
        yield put(getFollowersListSuccess(id, []));
        if (responseCallback) responseCallback([]);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* getFollowerSearchList(action) {
  const {params, responseCallback} = action;
  try {
    const response = yield call(
      callRequest,
      GET_FOLLOWERS_LIST_URL,
      {},
      params,
      {},
      ApiSauce,
    );
    if (response?.status ?? false) {
      const followersSearchList = manipulateFollowingAndFollowersList(
        response.data,
      );
      yield put(getFollowerListSearchSuccess(followersSearchList));
      if (responseCallback)
        responseCallback(util.getIdsFromArray(followersSearchList));
    } else {
      yield put(getFollowerListSearchSuccess([]));
      if (responseCallback) responseCallback([]);
    }
  } catch (err) {
    if (responseCallback) responseCallback(false);
    alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
  }
}

function* getFollowingList() {
  while (true) {
    const {params, payload, responseCallback} = yield take(
      GET_FOLLOWING_LIST.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_FOLLOWING_LIST_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response?.status ?? false) {
        const {id} = payload;
        const followingList = manipulateFollowingAndFollowersList(
          response.data,
        );
        const data = {
          id,
          followingList,
        };
        yield put(getFollowingListSuccess(data));
        if (responseCallback) responseCallback(data.followingList);
      } else {
        const {id} = payload;
        yield put(getFollowingListSuccess(id, []));
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* getFollowingSearchList(action) {
  const {params, payload, responseCallback} = action;
  try {
    const response = yield call(
      callRequest,
      GET_FOLLOWING_LIST_URL,
      {},
      params,
      {},
      ApiSauce,
    );
    if (response?.status ?? false) {
      const followingSearchList = manipulateFollowingAndFollowersList(
        response.data,
      );
      yield put(getFollowingListSearchSuccess(followingSearchList));
      if (responseCallback)
        responseCallback(util.getIdsFromArray(followingSearchList));
    } else {
      yield put(getFollowingListSearchSuccess([]));
      if (responseCallback) responseCallback([]);
    }
  } catch (err) {
    if (responseCallback) responseCallback([]);
    alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
  }
}

function* followUnFollow() {
  while (true) {
    const {payload, responseCallback} = yield take(
      FOLLOW_UNFOLLOW_ARTIST.REQUEST,
    );
    const {item, follow} = payload;
    const data = {
      artist_id: item.id,
      follow: follow,
    };
    try {
      const response = yield call(
        callRequest,
        FOLLOW_UNFOLLOW_ARTIST_URL,
        data,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(followUnFollowArtistSuccess(payload));
        if (responseCallback) responseCallback(response.data);
      } else {
        if (responseCallback) responseCallback(response.status);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* removeFollower() {
  while (true) {
    const {params, responseCallback} = yield take(REMOVE_FOLLOWER.REQUEST);
    try {
      const response = yield call(
        callRequest,
        REMOVE_FOLLOWER_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response?.status ?? false) {
        yield put(removeFollowerSuccess(params));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* getPostsListByUserId() {
  while (true) {
    const {payload, params, responseCallback} = yield take(
      GET_POSTS_LIST_BY_USER_ID.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_POSTS_LISTING_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback)
          responseCallback(manipulatePostsListingData(response?.data ?? []));
        const {id} = payload;
        const data = {
          id,
          list: manipulatePostsListingData(response?.data),
        };
        yield put(getPostsListByUserIDSuccess(data));
      } else {
        if (responseCallback) responseCallback(response.data);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}
function* socailLogin() {
  while (true) {
    const {payload, responseCallback} = yield take(SOCAIL_LOGIN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SOCAIL_LOGIN_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          userSigninSuccess(
            manipulateSignInAndPersonsalInfoData(response.data),
          ),
        );
        if (responseCallback) responseCallback(response.data);
      } else {
        if (responseCallback) responseCallback(response.data);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}
function* markPickingPoint() {
  while (true) {
    const {payload, responseCallback} = yield take(MARK_PICKING_POINT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        MARK_PICKING_POINT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(markPickingPointSucces(response.data));
        if (responseCallback) responseCallback(true);
      } else {
        if (responseCallback) responseCallback(false);
        alertMessage(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alertMessage(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

export default function* root() {
  yield fork(signup);
  yield fork(signout);
  yield fork(signin);
  yield fork(updateUserProfile);
  yield fork(becomeAnArtist);
  yield fork(personalInfo);
  yield fork(forgotPassword);
  yield fork(confirmOTP_FGPASS);
  yield fork(confirmOTP_SIGNUP);
  yield fork(updatePassword);
  yield fork(contactAdmin);
  yield fork(getProfileSections);
  yield fork(chooseYourInterests);
  yield fork(chooseYourVibe);
  yield fork(postProfileData);
  yield fork(deleteProfileSubSectionDataRequest);
  yield fork(signUpResendOTP);
  yield fork(createAddress);
  yield fork(updateAddress);
  yield fork(defaultAddress);
  yield fork(allAddress);
  yield fork(deleteAddress);
  yield fork(editProfile);
  yield fork(changePassword);
  yield fork(changeEmail);
  yield fork(changePhone);
  yield fork(changePhoneOTP);
  yield fork(getSelectedVibes);
  yield fork(getSelectedInterests);
  yield fork(getSelectedCommunities);
  yield fork(getLoggedInUserDetails);
  yield fork(getFollowersList);
  yield fork(getFollowingList);
  yield fork(followUnFollow);
  yield fork(removeFollower);
  yield fork(getPostsListByUserId);
  yield fork(socailLogin);
  yield fork(markPickingPoint);
  yield takeLatest(GET_FOLLOWING_SEARCH_LIST.REQUEST, getFollowingSearchList);
  yield takeLatest(GET_FOLLOWER_SEARCH_LIST.REQUEST, getFollowerSearchList);
}
