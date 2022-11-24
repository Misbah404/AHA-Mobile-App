// @flow
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
  CLEAR_GALLERY,
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
  IS_UPLOADING_POST_IN_BACKGROUND,
  MARK_GALLERY_IMAGE_SELECTED,
  PERSONAL_INFO,
  POST_PROFILE_DATA,
  REFRESH_TOKEN,
  REMOVE_FOLLOWER,
  SELECT_DEFAULT,
  SIGNUP_RESEND_OTP,
  UPDATE_ADDRESS,
  UPDATE_USER_PROFILE,
  USER_CONFIRM_OTP_FGPASS,
  USER_CONFIRM_OTP_SIGNUP,
  USER_FORGOT_PASSWORD,
  USER_GALLERY,
  USER_SIGNIN,
  USER_SIGNOUT,
  USER_SIGNUP,
  USER_UPDATE_PASSWORD,
  GET_FOLLOWING_SEARCH_LIST,
  GET_FOLLOWER_SEARCH_LIST,
  SAVE_PIN_TO_COLLECTIONS_LIST_AGAINST_ARTIST_KEY,
  SAVE_PINNED_POSTS_AND_COLLECTIONS_LIST_AGAINST_ARTIST_KEY,
  SOCAIL_LOGIN,
  MARK_PICKING_POINT,
} from './ActionTypes';

export function userSignupRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_SIGNUP.REQUEST,
  };
}

export function userSignupSuccess(data) {
  return {
    data,
    type: USER_SIGNUP.SUCCESS,
  };
}

export function userSigninRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_SIGNIN.REQUEST,
  };
}

export function userSigninSuccess(data) {
  return {
    data,
    type: USER_SIGNIN.SUCCESS,
  };
}

export function userSignOutRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_SIGNOUT.REQUEST,
  };
}

export function userSignOutSuccess() {
  return {
    type: USER_SIGNOUT.SUCCESS,
  };
}

export function userGallerySuccess(data) {
  return {
    data,
    type: USER_GALLERY.SUCCESS,
  };
}

export function clearGallery() {
  return {
    type: CLEAR_GALLERY.SUCCESS,
  };
}

export function markImageSelected(data) {
  return {
    data,
    type: MARK_GALLERY_IMAGE_SELECTED.SUCCESS,
  };
}

export function updateUserProfileRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_USER_PROFILE.REQUEST,
  };
}

export function updateUserProfileSuccess(data) {
  return {
    data,
    type: UPDATE_USER_PROFILE.SUCCESS,
  };
}

export function becomeAnArtistRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: BECOME_AN_ARTIST.REQUEST,
  };
}

export function becomeAnArtistSuccess(data) {
  return {
    data,
    type: BECOME_AN_ARTIST.SUCCESS,
  };
}

export function forgotPasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_FORGOT_PASSWORD.REQUEST,
  };
}

export function confirmForgetPasswordOtpRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_CONFIRM_OTP_FGPASS.REQUEST,
  };
}

export function confirmForgetPasswordOtpSuccess() {
  return {
    type: USER_CONFIRM_OTP_FGPASS.SUCCESS,
  };
}

export function confirmSignupOtpRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_CONFIRM_OTP_SIGNUP.REQUEST,
  };
}

export function confirmSignupOtpSuccess(data) {
  return {
    data,
    type: USER_CONFIRM_OTP_SIGNUP.SUCCESS,
  };
}

export function updatePasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_UPDATE_PASSWORD.REQUEST,
  };
}

export function contactAdminRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CONTACT_ADMIN.REQUEST,
  };
}

export function getProfileSectionsRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_PROFILE_SECTIONS.REQUEST,
  };
}

export function getProfileSectionsSuccess(data) {
  return {
    data,
    type: GET_PROFILE_SECTIONS.SUCCESS,
  };
}

export function postProfileDataRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: POST_PROFILE_DATA.REQUEST,
  };
}

export function deleteProfileSubSectionDataRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DELETE_PROFILE_SUBSECTION_DATA.REQUEST,
  };
}

export function personalInfoRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: PERSONAL_INFO.REQUEST,
  };
}
export function personalInfoSuccess() {
  return {
    type: PERSONAL_INFO.SUCCESS,
  };
}

export function chooseYourInterestsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHOOSE_YOUR_INTERESTS.REQUEST,
  };
}
export function chooseYourInterestsSuccess() {
  return {
    type: CHOOSE_YOUR_INTERESTS.SUCCESS,
  };
}

export function chooseYourVibeRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHOOSE_YOUR_VIBE.REQUEST,
  };
}
export function chooseYourVibeSuccess() {
  return {
    type: CHOOSE_YOUR_VIBE.SUCCESS,
  };
}

export function signUpResendOTPRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SIGNUP_RESEND_OTP.REQUEST,
  };
}

export function createAddressRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CREATE_ADDRESS.REQUEST,
  };
}
export function createAddressSuccess(data) {
  return {
    data,
    type: CREATE_ADDRESS.SUCCESS,
  };
}

export function updateAddressRequest(payload, params, responseCallback) {
  return {
    payload,
    params,
    responseCallback,
    type: UPDATE_ADDRESS.REQUEST,
  };
}
export function updateAddressSuccess(data) {
  return {
    data,
    type: UPDATE_ADDRESS.SUCCESS,
  };
}
export function selectDefaultAddressRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SELECT_DEFAULT.REQUEST,
  };
}
export function selectDefaultAddressSuccess(data) {
  return {
    data,
    type: SELECT_DEFAULT.SUCCESS,
  };
}

export function allAddressesRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ADDRESSES_LIST.REQUEST,
  };
}
export function allAddressesSuccess(data) {
  return {
    data,
    type: ADDRESSES_LIST.SUCCESS,
  };
}

export function deleteAddressRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: ADDRESS_DELETE.REQUEST,
  };
}
export function deleteAddressSuccess(data) {
  return {
    data,
    type: ADDRESS_DELETE.SUCCESS,
  };
}
export function editProfileRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: EDIT_PROFILE.REQUEST,
  };
}
export function editProfileSuccess(data) {
  return {
    data,
    type: EDIT_PROFILE.SUCCESS,
  };
}

export function changeEmailRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_EMAIL.REQUEST,
  };
}
export function changeEmailSuccess(data) {
  return {
    data,
    type: CHANGE_EMAIL.SUCCESS,
  };
}

export function changePasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_PASSWORD.REQUEST,
  };
}
export function changePasswordSuccess(data) {
  return {
    data,
    type: CHANGE_PASSWORD.SUCCESS,
  };
}

export function changePhoneRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_PHONE.REQUEST,
  };
}
export function changePhoneSuccess(data) {
  return {
    data,
    type: CHANGE_PHONE.SUCCESS,
  };
}

export function changePhoneOTPRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_PHONE_OPT.REQUEST,
  };
}
export function changePhoneOTPSuccess(data) {
  return {
    data,
    type: CHANGE_PHONE_OPT.SUCCESS,
  };
}

export function getSelectedVibesRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_SELECTED_VIBES.REQUEST,
  };
}

export function getSelectedVibesSuccess(data) {
  return {
    data,
    type: GET_SELECTED_VIBES.SUCCESS,
  };
}

export function getSelectedInterestsRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_SELECTED_INTERESTS.REQUEST,
  };
}

export function getSelectedInterestsSuccess(data) {
  return {
    data,
    type: GET_SELECTED_INTERESTS.SUCCESS,
  };
}

export function getSelectedCommunitiesRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_SELECTED_COMMUNITIES.REQUEST,
  };
}

export function getSelectedCommunitiesSuccess(data) {
  return {
    data,
    type: GET_SELECTED_COMMUNITIES.SUCCESS,
  };
}

export function getLoggedInUserDetailsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_LOGGED_IN_USER_DETAILS.REQUEST,
  };
}
export function getLoggedInUserDetailsSuccess(data) {
  return {
    data,
    type: GET_LOGGED_IN_USER_DETAILS.SUCCESS,
  };
}

export function getFollowersListRequest(params, payload, responseCallback) {
  return {
    params,
    payload,
    responseCallback,
    type: GET_FOLLOWERS_LIST.REQUEST,
  };
}
export function getFollowersListSuccess(data) {
  return {
    data,
    type: GET_FOLLOWERS_LIST.SUCCESS,
  };
}

export function getFollowingListRequest(params, payload, responseCallback) {
  return {
    params,
    payload,
    responseCallback,
    type: GET_FOLLOWING_LIST.REQUEST,
  };
}
export function getFollowingListSuccess(data) {
  return {
    data,
    type: GET_FOLLOWING_LIST.SUCCESS,
  };
}

export function getFollowingListSearchRequest(
  params,
  payload,
  responseCallback,
) {
  return {
    params,
    payload,
    responseCallback,
    type: GET_FOLLOWING_SEARCH_LIST.REQUEST,
  };
}

export function getFollowingListSearchSuccess(data) {
  return {
    data,
    type: GET_FOLLOWING_SEARCH_LIST.SUCCESS,
  };
}

export function getFollowerListSearchRequest(
  params,
  payload,
  responseCallback,
) {
  return {
    params,
    payload,
    responseCallback,
    type: GET_FOLLOWER_SEARCH_LIST.REQUEST,
  };
}

export function getFollowerListSearchSuccess(data) {
  return {
    data,
    type: GET_FOLLOWER_SEARCH_LIST.SUCCESS,
  };
}

export function isUploadingPostInBackground(data) {
  return {
    data,
    type: IS_UPLOADING_POST_IN_BACKGROUND,
  };
}

export function refreshToken(data) {
  return {
    data,
    type: REFRESH_TOKEN,
  };
}

export function followUnFollowArtistRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: FOLLOW_UNFOLLOW_ARTIST.REQUEST,
  };
}

export function followUnFollowArtistSuccess(data) {
  return {
    data,
    type: FOLLOW_UNFOLLOW_ARTIST.SUCCESS,
  };
}

export function removeFollowerRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: REMOVE_FOLLOWER.REQUEST,
  };
}
export function removeFollowerSuccess(data) {
  return {
    data,
    type: REMOVE_FOLLOWER.SUCCESS,
  };
}

export function getPostsListByUserIDRequest(payload, params, responseCallback) {
  return {
    payload,
    params,
    responseCallback,
    type: GET_POSTS_LIST_BY_USER_ID.REQUEST,
  };
}
export function getPostsListByUserIDSuccess(data) {
  return {
    data,
    type: GET_POSTS_LIST_BY_USER_ID.SUCCESS,
  };
}

export function savePinToCollectionsListAgainstArtistKey(data) {
  return {
    data,
    type: SAVE_PIN_TO_COLLECTIONS_LIST_AGAINST_ARTIST_KEY,
  };
}

export function savePinnedPostsAndCollectionAgainstArtistKey(data) {
  return {
    data,
    type: SAVE_PINNED_POSTS_AND_COLLECTIONS_LIST_AGAINST_ARTIST_KEY,
  };
}
export function socailLoginRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SOCAIL_LOGIN.REQUEST,
  };
}

export function socailLoginSuccess(data) {
  return {
    data,
    type: SOCAIL_LOGIN.SUCCESS,
  };
}
export function markPickingPointRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: MARK_PICKING_POINT.REQUEST,
  };
}

export function markPickingPointSucces(data) {
  return {
    data,
    type: MARK_PICKING_POINT.SUCCESS,
  };
}
