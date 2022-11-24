// @flow
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const CANCEL = 'CANCEL';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

export const NETWORK_INFO = 'NETWORK_INFO';
export const USER_SIGNUP = createRequestTypes('USER_SIGNUP');
export const USER_SIGNIN = createRequestTypes('USER_SIGNIN');
export const USER_SIGNOUT = createRequestTypes('USER_SIGNOUT');
export const USER_GALLERY = createRequestTypes('USER_GALLERY');
export const CLEAR_GALLERY = createRequestTypes('CLEAR_GALLERY');

export const POST_AN_ART = createRequestTypes('POST_AN_ART');

export const APP_SETTTINGS = createRequestTypes('APP_SETTTINGS');

export const MARK_GALLERY_IMAGE_SELECTED = createRequestTypes(
  'MARK_GALLERY_IMAGE_SELECTED',
);

export const UPDATE_USER_PROFILE = createRequestTypes('UPDATE_USER_PROFILE');
export const USER_FORGOT_PASSWORD = createRequestTypes('USER_FORGOT_PASSWORD');
export const USER_CONFIRM_OTP_FGPASS = createRequestTypes(
  'USER_CONFIRM_OTP_FGPASS',
);
export const USER_CONFIRM_OTP_SIGNUP = createRequestTypes(
  'USER_CONFIRM_OTP_SIGNUP',
);
export const USER_UPDATE_PASSWORD = createRequestTypes('USER_UPDATE_PASSWORD');
export const AUTOPLAY_VIDEO_FEED = createRequestTypes('AUTOPLAY_VIDEO_FEED');
export const PIN_FEED = createRequestTypes('PIN_FEED');
export const BECOME_AN_ARTIST = createRequestTypes('BECOME_AN_ARTIST');
export const CONTACT_ADMIN = createRequestTypes('CONTACT_ADMIN');
export const GET_SERVICE_TYPES = createRequestTypes('GET_SERVICE_TYPES');
export const GET_NEARBY_SERVICE_PROVIDERS = createRequestTypes(
  'GET_NEARBY_SERVICE_PROVIDERS',
);
export const CLEAR_SERVICE_PROVIDERS_DATA = 'CLEAR_SERVICE_PROVIDERS_DATA';
export const GET_NEWS = createRequestTypes('GET_NEWS');
export const GET_EVENTS = createRequestTypes('GET_EVENTS');
export const UPDATE_EVENTS = 'UPDATE_EVENTS';
export const GET_MONTLY_EVENTS = createRequestTypes('GET_MONTLY_EVENTS');
export const GET_SEARCH_EVENTS = createRequestTypes('GET_SEARCH_EVENTS');
export const GET_ORGANIZATIONS = createRequestTypes('GET_ORGANIZATIONS');
export const GET_REVIEWS = createRequestTypes('GET_REVIEWS');
export const GET_PROFILE_SECTIONS = createRequestTypes('GET_PROFILE_SECTIONS');
export const POST_PROFILE_DATA = createRequestTypes('POST_PROFILE_DATA');
export const PERSONAL_INFO = createRequestTypes('PERSONAL_INFO');

export const CHOOSE_YOUR_INTERESTS = createRequestTypes(
  'CHOOSE_YOUR_INTERESTS',
);
export const CHOOSE_YOUR_VIBE = createRequestTypes('CHOOSE_YOUR_VIBE');

export const DELETE_PROFILE_SUBSECTION_DATA = createRequestTypes(
  'DELETE_PROFILE_SUBSECTION_DATA',
);

export const GET_BRAIN_TREE_TOKEN = createRequestTypes('GET_BRAIN_TREE_TOKEN');
export const BRAIN_TREE_PAYMENT = createRequestTypes('BRAIN_TREE_PAYMENT');

export const SIGNUP_RESEND_OTP = createRequestTypes('SIGNUP_RESEND_OTP');
export const GET_INTERESTS_LIST = createRequestTypes('GET_INTERESTS');
export const SEARCH_INTERESTS_LIST = createRequestTypes(
  'SEARCH_INTERESTS_LIST',
);
export const GET_VIBES_LIST = createRequestTypes('GET_VIBES');
export const SEARCH_VIBES_LIST = createRequestTypes('SEARCH_VIBES_LIST');

export const GET_ARTISTS_LIST = createRequestTypes('GET_ARTISTS_LIST');
export const SUBMIT_INTERESTS = createRequestTypes('SUBMIT_INTERESTS');
export const SUBMIT_VIBES = createRequestTypes('SUBMIT_VIBES');

export const CHANGE_PASSWORD = createRequestTypes('CHANGE_PASSWORD');
export const CHANGE_PHONE = createRequestTypes('CHANGE_PHONE');
export const CHANGE_PHONE_OPT = createRequestTypes('CHANGE_PHONE_OPT');

export const CHANGE_EMAIL = createRequestTypes('CHANGE_EMAIL');

export const FOLLOW_UNFOLLOW_ARTIST = createRequestTypes(
  'FOLLOW_UNFOLLOW_ARTIST',
);

export const DASHBOARD_FEEDS = createRequestTypes('DASHBOARD_FEEDS');

export const SET_SELECTED_TAB = 'SET_SELECTED_TAB';
export const FOLLOW_UNFOLLOW_DASHBOARD_ARTIST =
  'FOLLOW_UNFOLLOW_DASHBOARD_ARTIST';
export const LOGOUT = 'LOGOUT';
export const ORDER_HISTORY_DETAIL = 'ORDER_HISTORY_DETAIL';

export const EMPTY = createRequestTypes('EMPTY');
export const PRIVACY_POLICY = createRequestTypes('PRIVACY_POLICY');
export const TERM_AND_CONDITION = createRequestTypes('TERM_AND_CONDITION');

export const CREATE_ADDRESS = createRequestTypes('CREATE_ADDRESS');
export const UPDATE_ADDRESS = createRequestTypes('UPDATE_ADDRESS');
export const SELECT_DEFAULT = createRequestTypes('SELECT_DEFAULT');
export const ADDRESSES_LIST = createRequestTypes('ADDRESSES_LIST');
export const ADDRESS_DELETE = createRequestTypes('ADDRESS_DELETE');
export const EDIT_PROFILE = createRequestTypes('EDIT_PROFILE');
export const GET_SELECTED_VIBES = createRequestTypes('GET_SELECTED_VIBES');
export const GET_SELECTED_INTERESTS = createRequestTypes(
  'GET_SELECTED_INTERESTS',
);
export const GET_SELECTED_COMMUNITIES = createRequestTypes(
  'GET_SELECTED_COMMUNITIES',
);
export const CREATE_COLLECTION = createRequestTypes('CREATE_COLLECTION');
export const UPDATE_COLLECTION = createRequestTypes('UPDATE_COLLECTION');
export const DELETE_COLLECTION = createRequestTypes('DELETE_COLLECTION');
export const GET_COLLECTION_LISTING = createRequestTypes(
  'GET_COLLECTION_LISTING',
);
export const GET_COLLECTION_SEARCH_LISTING = createRequestTypes(
  'GET_COLLECTION_SEARCH_LISTING',
);
export const SET_VISTING_ARTIST_COLLECTION_LISTING =
  'SET_VISTING_ARTIST_COLLECTION_LISTING';
export const GET_COLLECTION_DETAILS_BY_ID = createRequestTypes(
  'GET_COLLECTION_DETAILS_BY_ID',
);
export const DELETE_FEED = createRequestTypes('DELETE_FEED');

export const FOLLOW_UNFOLLOW_ARTIST_FROM_FOLLOWING_LIST = createRequestTypes(
  'FOLLOW_UNFOLLOW_ARTIST_FROM_FOLLOWING_LIST',
);

export const FOLLOW_UNFOLLOW_ARTIST_FROM_FOLLOWER_LIST = createRequestTypes(
  'FOLLOW_UNFOLLOW_ARTIST_FROM_FOLLOWER_LIST',
);

export const REMOVE_FOLLOWER = createRequestTypes('REMOVE_FOLLOWER');
export const GET_LOGGED_IN_USER_DETAILS = createRequestTypes(
  'GET_LOGGED_IN_USER_DETAILS',
);
export const GET_SINGLE_POST_BY_ID = createRequestTypes(
  'GET_SINGLE_POST_BY_ID',
);
export const GET_POSTS_LISTING = createRequestTypes('GET_POSTS_LISTING');
export const GET_SINGLE_USER_OR_ARTIST_POST_LIST = createRequestTypes(
  'GET_SINGLE_USER_OR_ARTIST_POST_LIST',
);
export const DELETE_POST_FROM_COLLECTION = createRequestTypes(
  'DELETE_POST_FROM_COLLECTION',
);

export const GET_ARTS_RELATED = createRequestTypes('GET_ARTS_RELATED');

export const STORE_CREATE_POST_DATA_TEMP = 'STORE_CREATE_POST_DATA_TEMP';
export const EMPTY_CREATE_POST_DATA_TEMP = 'EMPTY_CREATE_POST_DATA_TEMP';
export const CURRENT_ACTIVE_ACTION = 'CURRENT_ACTIVE_ACTION';
export const CURRENT_LOCATION_ACTION = 'CURRENT_LOCATION_ACTION';
export const ADD_TO_CART = 'ADD_TO_CART';

export const CLEAN_CART = 'CLEAN_CART';

export const MY_CART_LIST_UPDATE = 'MY_CART_LIST_UPDATE';
export const REMOVE_CART = 'REMOVE_CART';
export const POST_ORDER = createRequestTypes('POST_ORDER');
export const GET_USER_DETAILS_BY_ID_REQUEST = createRequestTypes(
  'GET_USER_DETAILS_BY_ID_REQUEST',
);
export const GET_ORDER_HISTORY = createRequestTypes('GET_ORDER_HISTORY');
export const GET_ORDER_HISTORY_DETAIL = createRequestTypes(
  'GET_ORDER_HISTORY_DETAIL',
);
export const GET_ARTIST_COMMUNITIES_LIST = createRequestTypes(
  'GET_ARTIST_COMMUNITIES_LIST',
);
export const GET_COMMUNITIES_LIST_I_AM_PART_OF = createRequestTypes(
  'GET_COMMUNITIES_LIST_I_AM_PART_OF',
);
export const GET_COMMUNITY_DROPS = createRequestTypes('GET_COMMUNITY_DROPS');
export const GET_CREDIT_CARDS_LISTING = createRequestTypes(
  'GET_CREDIT_CARDS_LISTING',
);
export const DELETE_CREDIT_CARD = createRequestTypes('DELETE_CREDIT_CARD');
export const GET_TRANSACTIONS_LIST = createRequestTypes(
  'GET_TRANSACTIONS_LIST',
);
export const ADD_CREDIT_CARD = createRequestTypes('ADD_CREDIT_CARD');
export const SET_DEFAULT_CARD = createRequestTypes('SET_DEFAULT_CARD');

export const UPDATE_QUANTITY_FEED_BY_ID = 'UPDATE_QUANTITY_FEED_BY_ID';
export const AFTER_POST_DASHBOARD_UPDATE = 'AFTER_POST_DASHBOARD_UPDATE';

export const SIMPLE_PIN = createRequestTypes('SIMPLE_PIN');
export const PIN_TO_COLLECTION = createRequestTypes('PIN_TO_COLLECTION');
export const GET_PIN_TO_COLLECTION_LIST = createRequestTypes(
  'GET_PIN_TO_COLLECTION_LIST',
);
export const GET_SIMPLE_PIN_LIST = createRequestTypes('GET_SIMPLE_PIN_LIST');

export const PIN_TO_COLLECTION_CREATE = createRequestTypes(
  'PIN_TO_COLLECTION_CREATE',
);
export const PIN_UNPIN = createRequestTypes('PIN_UNPIN');
export const GET_PIN_LIST = createRequestTypes('GET_PIN_LIST');
export const GET_COLLECTION_DETAILS = createRequestTypes(
  'GET_COLLECTION_DETAILS',
);
export const GET_POSTS_AND_COLLECTIONS_OF_PINNED_COLLECTION =
  createRequestTypes('GET_POSTS_AND_COLLECTIONS_OF_PINNED_COLLECTION');
export const PIN_UNPIN_FEED = 'PIN_UNPIN_FEED';
export const SINGLE_POST_ITEM_DATA = 'SINGLE_POST_ITEM_DATA';
export const EMPTY_COMMENTS_LIST = 'EMPTY_COMMENTS_LIST';
export const GET_COMMENTS_LIST = createRequestTypes('GET_COMMENTS_LIST');
export const POST_COMMENT = createRequestTypes('POST_COMMENT');
export const REPLY_ON_COMMENT = createRequestTypes('REPLY_ON_COMMENT');
export const EDIT_COMMENT = createRequestTypes('EDIT_COMMENT');
export const LIKE_UNLIKE_COMMENT = createRequestTypes('LIKE_UNLIKE_COMMENT');
export const DELETE_COMMENT = createRequestTypes('DELETE_COMMENT');
export const DELETE_POSTS_COLLECTION = createRequestTypes(
  'DELETE_POSTS_COLLECTION',
);
export const GET_FOLLOWERS_LIST = createRequestTypes('GET_FOLLOWERS_LIST');
export const GET_FOLLOWING_LIST = createRequestTypes('GET_FOLLOWING_LIST');
export const CHANGE_PIN_PRIVACY = createRequestTypes('CHANGE_PIN_PRIVACY');
export const GET_FOLLOWING_SEARCH_LIST = createRequestTypes(
  'GET_FOLLOWING_SEARCH_LIST',
);
export const GET_FOLLOWER_SEARCH_LIST = createRequestTypes(
  'GET_FOLLOWER_SEARCH_LIST',
);
export const GET_POSTS_LIST_BY_USER_ID = createRequestTypes(
  'GET_POSTS_LIST_BY_USER_ID',
);
export const IS_UPLOADING_POST_IN_BACKGROUND =
  'IS_UPLOADING_POST_IN_BACKGROUND';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const SAVE_PIN_TO_COLLECTIONS_LIST_AGAINST_ARTIST_KEY =
  'SAVE_PIN_TO_COLLECTIONS_LIST_AGAINST_ARTIST_KEY';
export const SAVE_PINNED_POSTS_AND_COLLECTIONS_LIST_AGAINST_ARTIST_KEY =
  'SAVE_PINNED_POSTS_AND_COLLECTIONS_LIST_AGAINST_ARTIST_KEY';
export const PIN_UNPIN_LIST_UPDATE = 'PIN_UNPIN_LIST_UPDATE';
export const PIN_TO_COLLECTION_ADD = 'PIN_TO_COLLECTION_ADD';
export const PIN_AND_COLLECTION_PRIVACY = 'PIN_AND_COLLECTION_PRIVACY';
export const COLLECTION_TO_PIN_UPDATE = 'COLLECTION_TO_PIN_UPDATE';
export const CREATE_PIN_TO_COLLECTION_ADD_LIST =
  'CREATE_PIN_TO_COLLECTION_ADD_LIST';
export const PIN_TO_COLLECTION_AFTER_DELETE_UNPIN =
  'PIN_TO_COLLECTION_AFTER_DELETE_UNPIN';
export const EDIT_PIN_TO_COLLECTION = createRequestTypes(
  'EDIT_PIN_TO_COLLECTION',
);
export const DELETE_PIN_TO_COLLECTION = createRequestTypes(
  'DELETE_PIN_TO_COLLECTION',
);
export const POST_COLLECTION_PIN_UNPIN = createRequestTypes(
  'POST_COLLECTION_PIN_UNPIN',
);

export const GET_SEARCH_LIST_DATA_BY_CATEGORY = createRequestTypes(
  'GET_SEARCH_LIST_DATA_BY_CATEGORY',
);
export const DELETE_MULTI_COLLECTION = 'DELETE_MULTI_COLLECTION';
export const SEARCH_COMMUNITY = createRequestTypes('SEARCH_COMMUNITY');
export const EDIT_POST = createRequestTypes('EDIT_POST');
export const SALES_HISTORY = createRequestTypes('SALES_HISTORY');
export const SALES_HISTORY_STATUS = createRequestTypes('SALES_HISTORY_STATUS');
export const SALES_ORDER_CHANGE = createRequestTypes('SALES_ORDER_CHANGE');
export const SALES_ORDER_HISTORY_DETAILS = createRequestTypes(
  'SALES_ORDER_HISTORY_DETAILS',
);
export const GET_POSTS_LIST_AS_PER_VIBES = createRequestTypes(
  'GET_POSTS_LIST_AS_PER_VIBES',
);
export const GET_NOTIFICATIONS = createRequestTypes('GET_NOTIFICATIONS');
export const DEVICE_TOKEN_NOTIFICATION = createRequestTypes(
  'DEVICE_TOKEN_NOTIFICATION',
);
export const NOTIFICATIONS_COUNT = createRequestTypes('NOTIFICATIONS_COUNT');
export const CHANGE_ORDER_PRIVACY = createRequestTypes('CHANGE_ORDER_PRIVACY');
export const GET_BANK_ACCOUNT_DETAILS = createRequestTypes(
  'GET_BANK_ACCOUNT_DETAILS',
);
export const GET_URL_TO_ADD_NEW_BANK_ACCOUNT = createRequestTypes(
  'GET_URL_TO_ADD_NEW_BANK_ACCOUNT',
);
export const DELETE_BANK_ACCOUNT = createRequestTypes('DELETE_BANK_ACCOUNT');
export const REQUEST_WITHDRAWL = createRequestTypes('REQUEST_WITHDRAWL');
export const GET_SELLABLE_ARTS_LIST = createRequestTypes(
  'GET_SELLABLE_ARTS_LIST',
);
export const SOCAIL_LOGIN = createRequestTypes('SOCAIL_LOGIN');
export const GET_ORDER_ARTS_HISTORY = createRequestTypes(
  'GET_ORDER_ARTS_HISTORY',
);
export const INCREASE_DECREASE_NOTIFICATION_COUNT =
  'INCREASE_DECREASE_NOTIFICATION_COUNT';
export const NOTIFICATION_COUNT_READ = 'NOTIFICATION_COUNT_READ';
export const SET_OPENED_SINGLE_POST_ID = 'SET_OPENED_SINGLE_POST_ID';
export const SAVE_ORDER_ART_HISTORY_AGAINST_USER_KEY =
  'SAVE_ORDER_ART_HISTORY_AGAINST_USER_KEY';
export const SAVE_USER_COMMUNITIES_AGAINST_KEY =
  'SAVE_USER_COMMUNITIES_AGAINST_KEY';
export const SAVE_ORDER_ARTS_HISTORY_IN_LIST =
  'SAVE_ORDER_ARTS_HISTORY_IN_LIST';

export const MARK_PICKING_POINT = createRequestTypes('MARK_PICKING_POINT');
export const COMMUNITIES_DATA = createRequestTypes('COMMUNITIES_DATA');
export const EVENT_DETAILS = createRequestTypes('EVENT_DETAILS');
export const ORDERS_DISPATCH_SHIPPO = createRequestTypes(
  'ORDERS_DISPATCH_SHIPPO',
);
export const CALCULATE_SHIPMENT_CHARGES = createRequestTypes(
  'CALCULATE_SHIPMENT_CHARGES',
);
export const GET_COMMENT_REPLIES = createRequestTypes('GET_COMMENT_REPLIES');
export const EDIT_COMMUNITY = createRequestTypes('EDIT_COMMUNITY');
export const COMMUNITY_DETAILS = createRequestTypes('COMMUNITY_DETAILS');
export const HIDE_SHOW_REPLIES = 'HIDE_SHOW_REPLIES';
export const EMPTY_REPLIES_OBJECT = 'EMPTY_REPLIES_OBJECT';
