import moment from 'moment';
import {Actions} from 'react-native-router-flux';
import {
  setCurrenActiveActionName,
  setSelectedTab,
} from '../actions/GeneralActions';
import {userSignOutSuccess, userSignOutRequest} from '../actions/UserActions';
import DataHandler from '../services/DataHandler';
import {Images} from '../theme';
import util from '../util';
// export const TIME_ZONE = (-1 * new Date().getTimezoneOffset()) / 60;
export const APP_URL = '';
export const APP_DOMAIN = '';
export const QUERY_LIMIT = 10;
export const SAGA_ALERT_TIMEOUT = 500;
export const RESEND_CODE_TIMER = 60;
// date time formats
export const DATE_FORMAT1 = 'DD/MM/YYYY';
export const DATE_FORMAT2 = 'MMMM DD, YYYY';
export const DATE_FORMAT3 = 'MMMM DD hh:mm a';
export const TIME_FORMAT1 = 'hh:mm A';

// Messages

export const LOCATION_PERMISSION_DENIED_ERROR2 =
  'Location permission required, please go to app settings to allow access';
export const INVALID_NAME_ERROR = 'Invalid name';
export const INVALID_EMAIL_ERROR = 'Invalid email';
export const INTERNET_ERROR = 'Please connect to the working internet';
export const SESSION_EXPIRED_ERROR = 'Session expired, Please login again';

// Message types
export const MESSAGE_TYPES = {
  INFO: 'info',
  ERROR: 'error',
  SUCCESS: 'success',
};

export const strings = {
  AHA: 'AHA',
  WELCOME_TO_AHA: 'Welcome to your AHA! Moment',
  LOGIN: 'Login',
  PLEASE_ENTER_DETAILS: 'Please enter the details below.',
  EMAIL_USERNAME: 'Email/Username',
  USERNAME: 'Username',
  EMAIL: 'Email',
  FILTER: 'Filter',
  RESET: 'Reset',
  PASSWORD: 'Password',
  PLEASE_ALLOW_GALLERY_PERMISSION:
    'Let AHA access Photos to add photos and videos.',
  PLEASE_ALLOW_GALLERY_PERMISSION_ANDROID:
    'Please allow Gallery permission from Settings.',
  NEW_PASSWORD: 'New Password',
  CONFIRM_PASSWORD: 'Confrim Password',
  PASSWORD_MUST: 'Password should not be less than 6 characters',
  ChHANGE_NUMBER: 'Change Number',
  CHANGE_NUMBER_TEXT: 'Enter your Number and we will send you a OTP code ',
  OLD_PASSWORD: 'Old Password',
  CHOOSE_YOUR_USERNAME: 'Choose your username!',
  CONFIRM_PASSWORD: 'Confirm Password',
  FORGOT_PASSWORD: 'Forgot Password',
  DONT_HAVE_AN_ACCOUNT: 'Don’t have an account?',
  SIGN_UP: 'Sign up',
  GET_REGISTERED: 'Get Registered!',
  ALREADY_HAVE_AN_ACCOUNT: 'Already have an account?',
  SIGN_IN: 'Sign in',
  I_ACCEPT_THE: 'I accept the ',
  TERMS_AND_CONDITIONS: 'Terms & Conditions',
  ENTER_YOUR_EMAIL: `Enter your number and we will
  send you a recovery code`,
  RESET_PASSWORD: 'Reset Password',
  PERSONAL_INFO: 'Personal Info',
  BIRTHDAY: 'Birthday',
  BIRTHDAY_PLACEHOLDER: 'DD/MM/YYYY',
  EMAIL_VERIFICATION: 'Verification',
  VERIFY_EMAIL: 'Verify',
  VERIFY_NUMBER: 'Verify Number',
  PLEASE_ENTER_FOUR_DIGIT_CODE: 'Please enter the 4 digit code',
  DIDNT_RECEIVE_A_CODE: 'Didn’t receive a code?',
  RESEND_CODE: 'Resend Code',
  WRONG_EMAIL: 'Wrong Phone Number ?',
  WRONG_PHONE: 'Wrong Phone Number ?',
  CHOOSE_YOU_INTEREST: 'Choose your interest',
  WHAT_DO_YOU_WANT_TO_SEE: 'What do you want to see?',
  CHOOSE_YOUR_VIBE: 'Choose your vibe',
  WHAT_IS_YOUR_VIBE: 'What is your vibe?',
  FOLLOW_ARTIST: 'Follow Artist',
  FIND_YOUR_ARTIST: 'Find your artist',
  FOLLOW_COMMUNITY: 'Follow Community',
  FIND_YOUR_COMMUNITY: 'Find your community',
  NEXT: 'Next',
  SKIP: 'Skip',
  FOLLOW: 'Follow',
  MY_CART_LIST: 'My Cart List',
  QUANTITY_LIMIT_EXTEND: 'Max Quantity is',
  TOTAL: 'Total',
  CONTINUE: 'Continue',
  MANAGE: 'Manage',
  ENABLE_PHOTO_ACCESS: 'Enable photos access',
  MANAGEHEADER:
    'You have given AHA access to a selected number of photos and videos.',
  MY_ORDER_HISTORY: 'My Order History',
  DISCOVER: 'Discover',
  FOLLOWING: 'Following',
  COMMUNITY: 'Community',
  SUPPORT: 'Support',
  POPULAR_ARTIST: 'Popular Artist',
  FOLLOW_AN_ACCOUNT_TO_SEE: 'Follow An Account to see their latest work',
  SETTINGS: 'Settings',
  CHECKOUT: 'Checkout',
  NOTIFICATIONS: 'Notifications',
  CONFIRMATION: 'Confirmation',
  BECOME_AN_ARTIST: 'Become An Artist',
  ADD_YOUR_VIBE: 'Add Your Vibe',
  ADD_YOUR_INTEREST: 'Add Your Interest',
  ADD_COMMUNITY: 'Add Community',
  ADD_YOUR_ADDRESS: 'Add Your Address',
  CHANGE_YOUR_ADDRESS: 'Change Your Address',
  ADD_ADDRESS: 'Add Address',
  ADD_TITLE: 'Add Title',
  TITLE: 'Title',
  COUNTRY: 'Country',
  STATE: 'State',
  ADDRESS: 'Address',
  SUBMIT: 'Submit',
  SEARCH: 'Search',
  MULTIPLE_ORDER: 'Multiple Order',
  SINGLE_ORDER: 'Single Order',
  ORDER_DETAIL: 'Order Detail',
  FILTER: 'Filter',
  NAME: 'Name',
  BIO: 'Bio',
  PRIVACY_POLICY: 'Privacy Policy',
  YOUR_COMMUNITY: 'Your Community',
  MY_COMMUNITIES: 'My Communities',
  SECURITY: 'Security',
  CHANGE_EMAIL: 'Change Email',
  ADD_EMAIL: 'Add Email',
  CHANGE_PASSWORD: 'Change Password',
  CHANGE_PHONE: 'Change Phone',
  SAVE: 'Save',
  ADDRESS: 'Address',
  YOUR_VIBE: 'Your Vibe',
  YOUR_INTEREST: 'Your Interest',
  FOLLOWER: 'Followers',
  EDIT_PROFILE: 'Edit Profile',
  CITY: 'City',
  REMOVE: 'Remove',
  CLEAN_CART: 'Clean Cart',
  PRODUCT: 'Product',
  SHIPMENT: 'Shipment',
  ADD_NEW_ADDRESS: 'Add New Address',
  PAYMENT: 'Payment',
  ADD_NEW_PAYMENT: 'Add New Payment',
  PAYMENTS: 'Payments',
  ORDER_HISTORY: 'Order History',
  CHECK_YOUR_ORDER_IN: 'Check Your Order in',
  THANKYOU_FOR_ORDERING: 'Thank You For Ordering',
  THINGS_FOR_EVERY_POP_LOVER: 'Things for every pop lover',
  SUB_TOTAL: 'Sub Total',
  SHIPMENT_FEE: 'Shipping Fee',
  PRIVACY: 'Privacy',
  POLICY: 'Policy',
  DONE: 'Done',
  TERMS: 'Terms',
  CONDITIONS: 'Conditions',
  WHAT_IS_YOUR_VIBE: 'What is your vibe',
  YOUR_BALANCE: 'Your Balance',
  ADD_MORE_AMMOUNT: 'Add more Ammount',
  WALLET: 'Wallet',
  FIND_FEDEX: 'Find Fedex',
  ADD_SOCIAL_LINK: 'Add Social Link',
  DRIBBBLE: 'Dribbble',
  TIKTOK: 'Tiktok',
  INSTAGRAM: 'Instagram',
  FACEBOOK: 'Facebook',
  ADD_HERE: 'Add Here',
  SALES_HISTORY: 'Sales History',
  DAILY: 'Daily',
  MONTHLY: 'Monthly',
  WEEKLY: 'Weekly',
  THIS_MONTH_SALES: 'This Month Sales',
  CREATE_COLLECTION: 'Create Collection',
  ADD_PRODUCT_TITLE: 'Add Title',
  TITLE: 'Title',
  ADD_PRICE: 'Add Price',
  PRICE: 'Price',
  price: 'price',
  NO_IMAGE_SELECTED: 'No media is selected',
  MEDIA_SIZE_ERROR: 'size should be less than',
  PRODUCT_DESCRIPTION: 'Description',
  DESCRIPTION: 'Description',
  SIZE: 'size',
  AADD_PRODUCT_VIDE: 'Add Product Vibe',
  DO_COMMENTS: 'Do Comments',
  NATURAL_ART: 'Natural Art',
  WELCOME_ONBOARD: 'Welcome Onboard!',
  NOW_YOU_CAN_POST_AND: 'Now You Can Post And',
  PLEASE_UPDATE_YOUR_PROFILE: 'Please update your profile',
  SELLYOUR_ARTS: 'Sell Your Arts',
  GO_TO_PROFILE: 'Go To Profile',
  YOUR_NUMBER: 'Your Number',
  SOMETHING_WENT_WRONG: 'Something went wrong',
  UPDATE: 'Update',
  YOUR_RESPONSE_ADDED_SUCCESSFULLY:
    'Your response has been added successfully.',
  COLLECTIONS: 'Collections',
  ARTS: 'Arts',
  EMPTY_COLLECTION: 'There is no collection',
  EVENTS: 'Events',
  ALL: 'All',
  ENTER_YOUR_OTP: 'Enter your OTP',
  INVALID_OTP: 'Invalid OTP',
  YOUR_DATA_HAS_BEEN_UPDATED: 'Your data has been successfully updated.',
  YOUR_VIBE_HAS_BEEN_UPDATED: 'Your vibes has been successfully updated.',
  YOUR_INTEREST_HAS_BEEN_UPDATED:
    'Your interests has been successfully updated.',
  YOUR_NUMBER: 'Your Number',
  REQUIRED_FIELD: '*Required Field',
  SHIPMENT_WEIGHT_ERROR: '*Shipment weight should be less',
  REQUIRED_MORE_THEN_ZERO_POINT_FIVE: '*should be equal or more than 0.5',
  REQUIRED_LESS_THEN_NINITY: '*should be less than 999,999',
  INVALID_DATA: 'Invalid Data',
  INVALID_SIZE: 'Invalid Size',
  INVALID_EMAIL: 'Invalid Email',
  PLEASE_CHECK_TERMS_AND_CONDITIONS: 'Please check Terms & Conditions.',
  PLEASE_UPLOAD_COVER_PHOTO: 'Please Upload your cover photo to continue.',
  PLEASE_UPLOAD_PROFILE_PHOTO: 'Please Upload your Profile photo to continue.',
  PLEASE_WAIT_UPLOADING_PHOTO: 'Please wait while we are uploading your image.',
  SELECT_YOUR_COUNTRY: 'Select Your Country',
  ENTER_YOUR_STATE: 'Enter Your State',
  ENTER_YOUR_CITY: 'Enter Your City',
  UPLOAD_COVER: 'Upload Cover',
  SEARCH_HERE: 'Search Here',
  SELECT_VIBE: 'Select Vibe',
  SELECT_COLLECTION: 'Select Collection',
  SELECT_INTEREST: 'Select Interest',
  SELECT_COMMUNITY: 'Select Community',
  INVALID_URL_FOUND: 'Invalid URL found.',
  PASSWORD_SHOULD_NOT_CONTAIN_ONLY_SPACES:
    'Password should not contain only spaces in it.',
  INVALID_USERNAME: 'Invalid Username.',
  FOR_VALID_USERNAME:
    'Username can only use alphabets, numbers, underscores and periods.',
  INVALID_NAME: 'Invalid Name.',
  INVALID_TITLE: 'Invalid Title.',
  INVALID_PHONE_NUMBER: 'Invalid Phone Number.',
  YOUR_PASSWORD_HAS_BEEN_RESET: 'Password has been reset successfully',
  PASSWORD_AND_CONFIRM_PASS_SHOULD_BE_SAME:
    'New password and confirm password does not match.',
  COLLECTION_PRIVACY: 'Collection Privacy',
  CHANGE_ORDER_PRIVACY: 'Change Order Privacy',
  ADD_COLLECTION_VIBE: 'Add Collection Vibe',
  ADD_ART_POST_VIBE: 'Add Product Vibe',
  ADD_ART_POST_COLLECTION: 'Add To Collection',
  PUBLIC: 'Public',
  PRIVATE: 'Private',
  PLEASE_UPLOAD_COLLECTION_IMAGE: 'Please Upload collection image to continue.',
  PLEASE_UPLOAD_COMMUNITY_IMAGE: 'Please Upload community image to continue.',
  YOUR_COLLECTION_CREATED_SUCCESSFULLY:
    'Your collection has been successfully created.',
  EDIT_COLLECTION: 'Edit Collection',
  REMOVE_FROM_COLLECTION: 'Remove From \n Collection',
  DELETE_COLLECTION: 'Delete Collection',
  DELETE_PIN_COLLECTION: 'Delete Pin Collection',
  DELETE_POSTS: 'Delete Posts',
  DONT_REMOVE: `Don't Remove`,
  DELETE: 'Delete',
  DONT_DELETE: `Don't Delete`,
  DELETE_PIN: 'Delete & Pin',
  DELETE_UNPIN: 'Delete & Unpin',
  NO_POSTS_FOUND: 'No Posts Found.',
  NO_DROPS_FOUND: 'No Drops Found.',
  NO_FOLLOWERS_FOUND: 'No Followers Found.',
  NO_DATA_FOUND: 'No Data Found.',
  THERE_ARE_NO: 'There are no',
  NO_ORDER_FOUND: 'No Order found',
  NO_PURCHASE_FOUND: 'No Purchase Found',
  DELETE_DESTRIBUTION: 'Are you sure you want to delete this collection?',
  DELETE_DESTRIBUTION_POSTS: 'Are you sure you want to delete these',
  DUMMY_TEXT:
    'Lorem Ipsum is simply dummy text of the printing and typesetting',
  SELECT: 'Select',
  NO_COLLECTIONS_FOUND: 'No Collections Found.',
  NO_PINNED_COLLECTIONS_FOUND: 'No Pin Found.',
  INVALID_URL_FOUND: 'Invalid URL Found',
  INVALID_TITLE: 'Invalid Title',
  DELETE_ADDRESS: 'Delete Address',
  ARE_YOU_SURE: 'Are you sure you want to delete this address?',
  BACKHANDLER_POST_ARE_YOU_SURE: 'Are you sure you want to discard this post?',
  BACKHANDLER_POST_TITLE: 'Discard Post',
  YES: 'YES',
  NO: 'NO',
  ADD_TO_CART_LIST: 'This Product has been successfully added to your cart.',
  PIN: 'Pin',
  UNPIN: 'Unpin',
  BUY: 'Buy',
  COMMENTS: 'Comments',
  SHARE: 'Share',
  ARE_YOU_SURE_TO_DELETE_THIS_POST:
    'Are you sure you want to delete this post?',
  DELETE_POST: 'Delete Post',
  ARE_YOU_SURE_YOU_WANT_CLEAN_CART: 'Are you sure you want to clean cart?',
  CLEAN_MYCART: 'Clean Cart',
  CLEAN: 'Clean',
  CANCEL: 'Cancel',
  CREATE: 'Create',
  RECENT: 'Recent',
  NEVER_ASK_AGAIN: 'never_ask_again',
  APP_INFO: 'App Info',
  ARE_YOU_SURE_TO_UNFOLLOW_ARTIST:
    'Are you sure you want to unfollow this Artist?',
  ARE_YOU_SURE_TO_REMOVE_FOLLOWER:
    'Are you sure you want to remove this follower?',
  UNFOLLOW_ARTIST: 'UnFollow Artist',
  YES_I_AM_SURE: `Yes, I'm sure`,
  REMOVE_FOLLOWER: `Remove Follower`,
  ARTS: `Arts`,
  DELETE_POST_FROM_COLLECTION:
    'Are you sure you want to delete this post from the collection?',
  POST_IN_COMMUNITY: `Post in Community`,
  CART_IS_EMPTY: 'You have no items',
  NO_COMMUNITIES_FOUND: 'No Communities Found.',
  NEW_DROPS: 'New Drops',
  EVENTS: 'Events',
  WHEN_YOU_FOLLOW_PEOPLE: `When you follow people, 
  you will see them here.`,
  YOU_WILL_SEE: `You will see all of the people 
       who follow you here.`,
  NO_PIN_FOUND: 'No Pins Found.',
  NO_SUGGESSTION_FOUND: 'No Suggestions Found.',
  NO_FOLLOWINGS_FOUND: 'No Followings Found.',
  DELETE_CREDIT_CARD: 'Delete Credit Card',
  ARE_YOU_SURE_TO_DELETE_THIS_CARD:
    'Are you sure you want to delete this card?',
  MULTIPLE_PRODUCT: 'Multiple Product',
  NO_TRANSACTIONS_FOUND: 'No Transactions Found.',
  ADD_CARD_DETAILS: 'Add Card Details',
  DETAILS: 'Details',
  YOUR_CARD_HAS_BEEN_ADDED: 'Your card has been successfully added.',
  CAN_NOT_GET_THE_ORIGINAL: 'Can’t get the original?',
  NO_PIN_COLLECTION_FOUND: 'No Pin Collection Found.',
  ADD_CARD: 'Add Card',
  PIN_ART: ' Pin Art',
  SAVE_TO_YOUR_COLLECTION: 'Save To Your Collection',
  CREATE_A_NEW_COLLECTION: 'Create a new collection',
  LET_GO_WITH_FLOW: 'Lets go with the flow',
  BECOME_ARTIST_DESCRIPTION:
    'You Can Post & Sell Your Arts. get you art best value from best buyer',
  UPLOAD_PROFILE_PIC: 'Upload Profile Image',
  MAX_SIZE_IMAGE: 'Maximum size 5 mb',
  NO_COMMENTS_FOUND: 'No Comments Found.',
  NO_NOTIFICATIONS_FOUND: 'No Notifications Found.',
  DELETE_COMMENT: 'Delete Comment',
  ARE_YOU_SURE_TO_DELETE_THIS_COMMENT:
    'Are you sure you want to delete this comment?',
  EDIT_COMMENT: 'Edit Comment',
  ADD_TO_CART: 'Add to Cart',
  POST: 'Post',
  ALREADY_UPLOADING_POST:
    'Already uploading a Post, please wait for a while ...',
  UPLOADING_POST: 'Uploading Post ...',
  NO_SEARCH_RESULT_FOUND: 'No Search Result Found.',
  NO_VIBES_FOUND: 'No Vibes Found.',
  NO_INTERESTS_FOUND: 'No Interests Found.',
  INVALID_DESCRIPTION: 'Invalid Description',
  PIN_COLLECTION: 'Pin Collection',
  EDIT: 'Edit',
  VIEW: 'View',
  CHANGE_COLLECTION_NAME: 'Change Collection Name',
  CHANGE_COLLECTION_PRIVACY: 'Change Collection Privacy',
  LIKE: 'Like',
  UN_LIKE: 'Unlike',
  INVALID_STATE: 'Invalid State',
  INVALID_CITY: ' Invalid City',
  COLLECTION_NAME: 'Collection Name',
  COLLECTION_PRIVACY: 'Collection Privacy',
  PIN_PRIVACY: 'Pin Privacy',
  PIN_TO_COLLECTION_DELETE_DESCRIPTION:
    'Are you sure you want to delete this collection?',
  PROCESSING: 'Processing',
  INQUEUE: 'InQueue',
  ARTIST: 'Artist',
  MORE: 'More',
  ART: 'Art',
  VIBE: 'Vibe',
  NO_ARTISTS_FOUND: 'No Artists Found.',
  COLLECTION: 'Collection',
  ADD_NEW_BANK: 'Add new bank',
  MY_BANK: 'My Bank',
  YOUR_BANK_ACCOUNT: 'Your bank account',
  ADD_BANK: 'Add Bank',
  SORRY_UNABLE_TO_GET_URL:
    'Sorry, Unable to get URL at this time. Please try again later.',
  BANK_ACCOUNT_HAS_BEEN_SUCCESSFULLY_ADDED:
    'Bank Account has been successfully added.',
  UNABLE_TO_PROCESS_REQUEST:
    'Sorry, we are not able to process your request. Please try again later.',
  DELETE_BANK_ACCOUNT: 'Delete Account Details',
  ARE_YOU_SURE_TO_DELETE_BANK_ACCOUNT:
    'Are you sure you want to delete account details?',
  BANK_ACCOUNT_VERIFICATION_IN_PROGRESS:
    'Please wait... We are verifying your bank account details.',
  BANK_ACCOUNT_DELETED_SUCCESSFULLY:
    'Bank Account has been successfully deleted.',
  REQUSET_WITHDRAWL: 'Request Withdrawl',
  PENDING: 'Pending',
  AVAILABLE: 'Available',
  WITHDRAWL_REQUEST_HAS_BEEN_SUCCESSFULLY_MADE:
    'Withdrawl request has been successfully made.',
  NO_COMMENTS_FOUND: 'No Comments Found',
  NO_POST_FOUND: 'No Post Found.',
  SUPPORT_ARTIST: 'Support Artist',
  OPERATION_IN_PROGRESS: 'Operation in progress',
  DROPS: 'Drops',
  SEE_MORE: ' See more',
  SELECT_LOGIN_TYPE: 'Select Login Type',
  PHONE: 'Phone',
  NO_EVENTS_FOUND: 'No Events Founds',
  ZIP: 'Zip',
  STREET: 'Street',
  MARK_AS_PICKING_POINT: 'Mark as Picking point',
  FOR_SALE: 'For Sale',
  ORDER_TRACKING: 'Order Tracking',
  ORDER_TRACKING: 'Order Tracking',
  WEIGHT: 'Weight',
  CHOOSE_SHIPMENT_TYPE: 'Choose Shipment Type',
  SHIPMENT_TYPE: 'Shipment Type',
  PICKING_POINT_ADDRESS: 'Picking point Address',
  GREATER_THEN_ZERO: '*Greater than zero',
  DISPATCH_ALL_ORDERS: 'Dispatch All Orders',
  CONFIRM: 'Confirm',
  LINK: 'Link',
};

export const PROFILE_COMPONENT_HEIGHT = 250;

export const filterScreenConsts = {
  COUNTRY: 'country',
  CITY: 'city',
  STATE: 'state',
};

export const dummy = {
  DUMMY_DESCRIPTION:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  DUMMY_EMAIL: 'Demo@Demo.com',
};

export const appSettings = {
  videoSize: 500,
  imageSize: 500,
};

// user Profile data
export const userProfile = {
  name: 'Alina John',
  email: 'alinajohn@dummy.com',
  username: 'alina-john',
  bio: 'Love the Natural World Life',
  profileImage:
    'https://ahauserposts.s3.amazonaws.com/vibe/image_2021_10_19T23_50_22_220Z (1).png',
  isArtist: true,
  tittokLink: () => {},
  instagramLink: () => {},
  facebookLink: () => {},
  dribbleLink: () => {},
  followers: '45.k',
  interest: [
    {
      image: Images.InterestImage2,
      title: 'Physical Art',
    },
    {
      image: Images.InterestImage1,
      title: 'Physical Art',
    },
    {
      image: Images.InterestImage3,
      title: 'Physical Art',
    },
  ],
};

export const userDetails = {
  name: 'Alina John',
  email: 'alinajohn@dummy.com',
  username: 'alina-john',
  bio: 'Love the Natural World Life',
  profileImage: 'https://picsum.photos/id/669/500/500',
  following: '15000',
  isArtist: true,
};

//  create a new constant for currency and shipment !important
export const appDefaultData = {
  interestsList: [
    {
      id: 0,
      image:
        'https://ahauserposts.s3.amazonaws.com/intrest/philipp-potocnik-5rsNohd8bY8-unsplash.jpg',

      title: 'Street Art',
    },
    {
      id: 1,
      image:
        'https://ahauserposts.s3.amazonaws.com/intrest/antenna-jqh0GEvuNBY-unsplash.jpg',

      title: 'Gallery Art',
    },
    {
      id: 2,
      image:
        'https://ahauserposts.s3.amazonaws.com/intrest/Screen Shot 2021-10-12 at 1.54.38 PM.png',
      title: 'NFTs',
    },
    {
      id: 3,
      image:
        'https://ahauserposts.s3.amazonaws.com/intrest/subvertivo-_lab-G6yracEEm8A-unsplash.jpg',
      title: 'Woodwork',
    },
    {
      id: 4,
      image:
        'https://ahauserposts.s3.amazonaws.com/intrest/europeana-VsnDYMWollM-unsplash.jpg',
      title: 'Painting',
    },
    {
      id: 5,
      image:
        'https://ahauserposts.s3.amazonaws.com/intrest/Screen Shot 2021-10-12 at 1.58.15 PM.png',
      title: 'Sculpture',
    },
    {
      id: 6,
      image:
        'https://ahauserposts.s3.amazonaws.com/intrest/mohammad-metri-E-0ON3VGrBc-unsplash (1).jpg',

      title: 'Wearable Art',
    },
    {
      id: 7,
      image:
        'https://ahauserposts.s3.amazonaws.com/intrest/alex-lvrs-4N5huJDOydQ-unsplash.jpg',

      title: 'Sustainable Art',
    },
    {
      id: 8,
      image:
        'https://ahauserposts.s3.amazonaws.com/intrest/annie-spratt-TywjkDHf0Ps-unsplash.jpg',

      title: 'Crafts',
    },
    {
      id: 9,
      image:
        'https://ahauserposts.s3.amazonaws.com/intrest/Screen Shot 2021-10-12 at 2.00.58 PM.png',

      title: 'Lights',
    },
    {
      id: 10,
      image:
        'https://ahauserposts.s3.amazonaws.com/intrest/matthew-hamilton-kbeIGiNWDaY-unsplash.jpg',

      title: 'Collectibles',
    },
    {
      id: 11,
      image:
        'https://ahauserposts.s3.amazonaws.com/intrest/Screen Shot 2021-10-12 at 2.03.17 PM.png',

      title: 'Sports',
    },
    {
      id: 12,
      image:
        'https://ahauserposts.s3.amazonaws.com/intrest/hulki-okan-tabak-PaoG427w_As-unsplash.jpg',

      title: 'Performance art',
    },
    {
      id: 13,
      image:
        'https://ahauserposts.s3.amazonaws.com/intrest/gift-habeshaw-Etxf65FaTrs-unsplash (1).jpg',

      title: 'Dance',
    },
    {
      id: 14,
      image:
        'https://ahauserposts.s3.amazonaws.com/intrest/andrew-butler-aUu8tZFNgfM-unsplash.jpg.crdownload',
      title: 'International',
    },
  ],

  vibeList: [
    {
      id: 0,
      image:
        'https://ahauserposts.s3.amazonaws.com/vibe/mike-dorner-sf_1ZDA1YFw-unsplash.jpg',

      title: 'Minimalist',
    },
    {
      id: 1,
      image:
        'https://ahauserposts.s3.amazonaws.com/vibe/felix-dubois-robert-CuEvrPd3NYc-unsplash.jpg',

      title: 'Colorful',
    },
    {
      id: 2,
      image:
        'https://ahauserposts.s3.amazonaws.com/vibe/karsten-winegeart-ZCqQM9Hh8Fs-unsplash (1).jpg',
      title: '4/20',
    },
    {
      id: 3,
      image:
        'https://ahauserposts.s3.amazonaws.com/vibe/dominik-vanyi-5Fxuo7x-eyg-unsplash.jpg',
      title: 'Funny',
    },
    {
      id: 4,
      image:
        'https://ahauserposts.s3.amazonaws.com/vibe/yoshi-takekawa-7wk0ja-DP_c-unsplash (1).jpg',
      title: 'Outdoors',
    },
    {
      id: 5,
      image:
        'https://ahauserposts.s3.amazonaws.com/vibe/marvin-meyer-hwkTELbKW2s-unsplash (1).jpg',
      title: 'NSFW',
    },
    {
      id: 6,
      image:
        'https://ahauserposts.s3.amazonaws.com/vibe/nelson-ndongala-aF-9ZXLVQHI-unsplash.jpg',

      title: 'Pop Culture',
    },
    {
      id: 7,
      image:
        'https://ahauserposts.s3.amazonaws.com/vibe/ac-de-leon--uWiIajRN0s-unsplash.jpg',

      title: 'Fantasy/ Scifi',
    },
    {
      id: 8,
      image:
        'https://ahauserposts.s3.amazonaws.com/vibe/wisnu-widjojo-uGhitfRLq4I-unsplash.jpg',

      title: 'SPirtual',
    },
    {
      id: 9,
      image:
        'https://ahauserposts.s3.amazonaws.com/vibe/nareeta-martin-iPp_KIsFBnI-unsplash.jpg',

      title: 'International',
    },
    {
      id: 10,
      image:
        'https://ahauserposts.s3.amazonaws.com/vibe/alex-knight-2EJCSULRwC8-unsplash.jpg',

      title: 'Techy',
    },
    {
      id: 11,
      image:
        'https://ahauserposts.s3.amazonaws.com/vibe/sebastiaan-stam-RChZT-JlI9g-unsplash.jpg',

      title: 'Freaky',
    },
    {
      id: 12,
      image:
        'https://ahauserposts.s3.amazonaws.com/vibe/hulki-okan-tabak-PaoG427w_As-unsplash.jpg',

      title: 'Funky',
    },
    {
      id: 13,
      image:
        'https://ahauserposts.s3.amazonaws.com/vibe/colin-lloyd-bT3dHRFAREA-unsplash.jpg',

      title: 'Political',
    },
    {
      id: 14,
      image:
        'https://ahauserposts.s3.amazonaws.com/vibe/ajeet-mestry-UBhpOIHnazM-unsplash.jpg',

      title: 'Retro',
    },
  ],

  artList: [
    {
      id: 0,
      image:
        'https://ahauserposts.s3.amazonaws.com/AllHailArtFiles/CurrentMood.jpg',
      title: 'Minimalist',
    },
    {
      id: 1,
      image: 'https://ahauserposts.s3.amazonaws.com/AllHailArtFiles/Grow1.jpg',

      title: 'Colorful',
    },
    {
      id: 2,
      image:
        'https://ahauserposts.s3.amazonaws.com/AllHailArtFiles/CreepyPastaCarbonara.jpg',
      title: '4/20',
    },
    {
      id: 3,
      image:
        'https://ahauserposts.s3.amazonaws.com/AllHailArtFiles/Forestforthetrees.jpg',
      title: 'Funny',
    },
    {
      id: 4,
      image:
        'https://ahauserposts.s3.amazonaws.com/AllHailArtFiles/Egghead.jpg',
      title: 'Outdoors',
    },
    {
      id: 5,
      image: 'https://ahauserposts.s3.amazonaws.com/AllHailArtFiles/Grow2.jpg',
      title: 'NSFW',
    },
    {
      id: 6,
      image:
        'https://ahauserposts.s3.amazonaws.com/AllHailArtFiles/KickedBack.jpg',

      title: 'Pop Culture',
    },
    {
      id: 7,
      image:
        'https://ahauserposts.s3.amazonaws.com/AllHailArtFiles/PlantHead.jpg',

      title: 'Fantasy/ Scifi',
    },
    {
      id: 8,
      image: 'https://ahauserposts.s3.amazonaws.com/AllHailArtFiles/Spring.jpg',

      title: 'SPirtual',
    },
  ],

  collectionList: [
    {
      id: 0,
      image: 'https://ahauserposts.s3.amazonaws.com/SS1.png',
      title: 'Awesome Art',
    },
    {
      id: 1,
      image: 'https://ahauserposts.s3.amazonaws.com/SS2.png',

      title: 'Thoughts',
    },
    {
      id: 2,
      image: 'https://ahauserposts.s3.amazonaws.com/SS3.png',
      title: 'Humans',
    },
    {
      id: 3,
      image: 'https://ahauserposts.s3.amazonaws.com/SS4.png',
      title: 'Ideas',
    },
    {
      id: 4,
      image: 'https://ahauserposts.s3.amazonaws.com/SS5.png',
      title: 'Being Lazy',
    },
    {
      id: 5,
      image: 'https://ahauserposts.s3.amazonaws.com/SS6.png',
      title: 'Freedom',
    },
    {
      id: 6,
      image: 'https://ahauserposts.s3.amazonaws.com/SS7.png',

      title: '80s',
    },
    {
      id: 7,
      image: 'https://ahauserposts.s3.amazonaws.com/SS8.png',

      title: 'Politics',
    },
    {
      id: 8,
      image: 'https://ahauserposts.s3.amazonaws.com/SS9.png',

      title: 'Secret Society',
    },
  ],

  artists: [
    {
      id: 0,
      image: 'https://picsum.photos/1024/768?random=9',
      profileName: 'karennne Shuu',
      profileTagId: '@karennne',
    },
    {
      id: 1,
      image: 'https://picsum.photos/1024/768?random=11',
      profileName: 'Jan John',
      profileTagId: '@jan',
    },
    {
      id: 2,
      image: 'https://picsum.photos/1024/768?random=12',
      profileName: 'Jim Shuu',
      profileTagId: '@jim',
    },
    {
      id: 3,
      image: 'https://picsum.photos/1024/768?random=10',
      profileName: 'Sui',
      profileTagId: '@Suiofficial',
    },
    {
      id: 4,
      image: 'https://picsum.photos/1024/768?random=9',
      profileName: 'Nancy',
      profileTagId: '@Nancy3',
    },
    {
      id: 5,
      image: 'https://picsum.photos/1024/768?random=11',
      profileName: 'Mikeal',
      profileTagId: '@Mikeal',
    },
    {
      id: 6,
      image: 'https://picsum.photos/1024/768?random=12',
      profileName: 'karennne Shuu',
      profileTagId: '@karennne',
    },
    {
      id: 7,
      image: 'https://picsum.photos/1024/768?random=10',
      profileName: 'Jan John',
      profileTagId: '@jan',
    },
  ],

  communityFeedType: [
    {
      id: 0,
      title: 'Blake Jamieson ',
      subtitle: 'Minimalist',
      type: 'image',
      uri: 'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/sebastiaan-stam-RChZT-JlI9g-unsplash.jpg',
    },
    {
      id: 1,
      title: 'Helen Ratner ',
      subtitle: 'Outdoors',
      type: 'image',
      uri: 'https://ahauserposts.s3.amazonaws.com/AllHailArtFiles/CreepyPastaCarbonara.jpg',
    },
    {
      id: 2,
      title: 'Megan Watters',
      subtitle: 'Techy',
      type: 'image',
      uri: 'https://ahauserposts.s3.amazonaws.com/AllHailArtFiles/KickedBack.jpg',
    },
    {
      id: 3,
      title: 'Technodrome',
      subtitle: 'Funky',
      type: 'image',
      uri: 'https://ahauserposts.s3.amazonaws.com/AllHailArtFiles/Grow2.jpg',
    },
  ],

  communities: [
    {
      id: 0,
      image: 'https://picsum.photos/1024/768?random=12',
      profile_name:
        'karennne Shuu abhfbhjdfh jdfhjbdfhbj dfshjbsdfbhdfs sdfhjbbhjdsfjbhdsfhbj',
      profileTagId: '@karen',
    },
    {
      id: 1,
      image: 'https://picsum.photos/1024/768?random=10',
      profile_name: 'Jan John',
      profileTagId: '@Jan',
    },
    {
      id: 2,
      image: 'https://picsum.photos/1024/768?random=9',
      profile_name: 'Jim Shuu',
      profileTagId: '@Shuu',
    },
    {
      id: 3,
      image: 'https://picsum.photos/1024/768?random=11',
      profile_name: 'Sui',
      profileTagId: '@Sui',
    },
    {
      id: 4,
      image: 'https://picsum.photos/1024/768?random=12',
      profile_name: 'Nancy',
      profileTagId: '@Nan',
    },
    {
      id: 5,
      image: 'https://picsum.photos/1024/768?random=10',
      profile_name: 'Mikeal',
      profileTagId: '@Mik',
    },
    {
      id: 6,
      image: 'https://picsum.photos/1024/768?random=9',
      profile_name: 'karennne Shuu',
      profileTagId: '@Shuu',
    },
    {
      id: 7,
      image: 'https://picsum.photos/1024/768?random=11',
      profile_name: 'Jan John',
      profileTagId: '@John',
    },
  ],

  feeds: [
    {
      id: 178,
      resource: [
        {
          id: 1,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=1',
        },
        {
          id: 2,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=2',
        },
        {
          id: 3,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=3',
        },
        {
          id: 4,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=4',
        },
      ],
      thumbnail:
        'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-001.jpg',
      art_name: 'Abstract Art',
      art_description: 'Line Wall Arts With Bright Colors',
      artist: {
        id: 0,
        image:
          'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-001.jpg',
        profileName: 'karennne Shuu',
        profileTagId: '@karennne',
      },

      amount: 20.22,
      size: ['S', 'M'],
      maxQuantity: 6,
      relatedSuggestion: [
        {
          id: 100,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=5',
        },
        {
          id: 101,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=6',
        },
        {
          id: 102,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=7',
        },
        {
          id: 103,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
        {
          id: 104,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=10',
        },
        {
          id: 105,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
        {
          id: 106,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=10',
        },
        {
          id: 107,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
      ],
      art_long_description:
        'Line Wall Arts With Bright ColorsLine Wall Arts With Bright ColorsLine Wall Arts With Bright ColorsLine Wall Arts.',
      isCollectionView: false,
      comment: [
        {
          id: 1,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-002.jpg',
          username: 'Sarah',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 2,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-003.jpg',
          username: 'Ali',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 3,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-004.jpg',
          username: 'Mohd',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 4,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-005.jpg',
          username: 'Fatima',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
      ],
    },
    {
      id: 2,
      resource: [
        {
          id: 5,
          type: 'video',
          uri: 'https://ahauserposts.s3.amazonaws.com/Snaptik_6904693098178219270_helen-ratner.mp4',
        },
        {
          id: 6,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=5',
        },
        {
          id: 7,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=6',
        },
        {
          id: 8,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=7',
        },
      ],
      thumbnail:
        'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-001.jpg',

      art_name: 'Scener Art',
      art_description: 'Line Wall Arts With Bright Colors',
      artist_id: 0,
      artist: {
        id: 0,
        image:
          'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-001.jpg',
        profileName: 'karennne Shuu',
        profileTagId: '@karennne',
      },
      amount: 75.85,
      currency: {
        name: 'dollar',
        symbol: '$',
      },
      size: ['S', 'M', 'L'],
      maxQuantity: 10,
      relatedSuggestion: [
        {
          id: 100,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=5',
        },
        {
          id: 101,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=6',
        },
        {
          id: 102,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=7',
        },
        {
          id: 103,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
        {
          id: 104,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=10',
        },
        {
          id: 105,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
        {
          id: 106,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=10',
        },
        {
          id: 107,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
      ],
      art_long_description:
        'Line Wall Arts With Bright ColorsLine Wall Arts With Bright ColorsLine Wall Arts With Bright ColorsLine Wall Arts.',
      isCollectionView: false,
      comment: [
        {
          id: 1,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-006.jpg',
          username: 'Sarah',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 2,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-007.jpg',
          username: 'Ali',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 3,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-008.jpg',
          username: 'Mohd',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 4,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-009.jpg',
          username: 'Fatima',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
      ],
    },
    {
      id: 3,
      resource: [
        {
          id: 9,
          type: 'video',
          uri: 'https://ahauserposts.s3.amazonaws.com/Snaptik_6904693098178219270_helen-ratner.mp4',
        },
        {
          id: 10,
          type: 'video',
          uri: 'https://ahauserposts.s3.amazonaws.com/Snaptik_6904693098178219270_helen-ratner.mp4',
        },
        {
          id: 11,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=8',
        },
        {
          id: 12,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=9',
        },
      ],
      thumbnail:
        'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-001.jpg',
      art_name: 'Flower Art',
      art_description: 'Line Wall Arts With Bright Colors',
      artist_id: 0,
      artist: {
        id: 0,
        image:
          'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-010.jpg',
        profileName: 'karennne Shuu',
        profileTagId: '@karennne',
      },
      amount: 75.85,
      currency: {
        name: 'dollar',
        symbol: '$',
      },
      size: ['100/100', '24/24', '50/50'],
      maxQuantity: 10,
      relatedSuggestion: [
        {
          id: 100,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=5',
        },
        {
          id: 101,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=6',
        },
        {
          id: 102,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=7',
        },
        {
          id: 103,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
        {
          id: 104,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=10',
        },
        {
          id: 105,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
        {
          id: 106,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=10',
        },
        {
          id: 107,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
      ],
      art_long_description:
        'Line Wall Arts With Bright ColorsLine Wall Arts With Bright ColorsLine Wall Arts With Bright ColorsLine Wall Arts.',
      isCollectionView: true,
      comment: [
        {
          id: 1,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-011.jpg',
          username: 'Sarah',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 2,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-012.jpg',
          username: 'Ali',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 3,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-013.jpg',
          username: 'Mohd',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 4,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-014.jpg',
          username: 'Fatima',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
      ],
    },
    {
      id: 4,
      resource: [
        {
          id: 13,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=10',
        },
        {
          id: 14,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=11',
        },
        {
          id: 15,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=12',
        },
        {
          id: 16,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=13',
        },
      ],
      thumbnail:
        'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-001.jpg',
      art_name: 'Sport Art',
      art_description: 'Line Wall Arts With Bright Colors',
      artist_id: 0,
      artist: {
        id: 0,
        image:
          'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-016.jpg',
        profileName: 'karennne Shuu',
        profileTagId: '@karennne',
      },
      amount: 75.85,
      currency: {
        name: 'dollar',
        symbol: '$',
      },
      size: ['S', 'M', 'L'],
      maxQuantity: 10,
      relatedSuggestion: [
        {
          id: 100,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=5',
        },
        {
          id: 101,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=6',
        },
        {
          id: 102,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=7',
        },
        {
          id: 103,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
        {
          id: 104,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=10',
        },
        {
          id: 105,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
        {
          id: 106,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=10',
        },
        {
          id: 107,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
      ],
      art_long_description:
        'Line Wall Arts With Bright ColorsLine Wall Arts With Bright ColorsLine Wall Arts With Bright ColorsLine Wall Arts.',
      isCollectionView: false,
      comment: [
        {
          id: 1,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-017.jpg',
          username: 'Sarah',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 2,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-018.jpg',
          username: 'Ali',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 3,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-019.jpg',
          username: 'Mohd',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 4,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-020.jpg',
          username: 'Fatima',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
      ],
    },
    {
      id: 5,
      resource: [
        {
          id: 13,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=10',
        },
        {
          id: 14,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=11',
        },
        {
          id: 15,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=12',
        },
        {
          id: 16,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=13',
        },
      ],
      thumbnail:
        'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-001.jpg',
      art_name: 'Sport Art',
      art_description: 'Line Wall Arts With Bright Colors',
      artist_id: 0,
      artist: {
        id: 0,
        image:
          'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-016.jpg',
        profileName: 'karennne Shuu',
        profileTagId: '@karennne',
      },
      amount: 75.85,
      currency: {
        name: 'dollar',
        symbol: '$',
      },
      size: ['S', 'M', 'L'],
      maxQuantity: 10,
      relatedSuggestion: [
        {
          id: 100,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=5',
        },
        {
          id: 101,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=6',
        },
        {
          id: 102,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=7',
        },
        {
          id: 103,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
        {
          id: 104,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=10',
        },
        {
          id: 105,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
        {
          id: 106,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=10',
        },
        {
          id: 107,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
      ],
      art_long_description:
        'Line Wall Arts With Bright ColorsLine Wall Arts With Bright ColorsLine Wall Arts With Bright ColorsLine Wall Arts.',
      isCollectionView: false,
      comment: [
        {
          id: 1,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-017.jpg',
          username: 'Sarah',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 2,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-018.jpg',
          username: 'Ali',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 3,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-019.jpg',
          username: 'Mohd',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 4,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-020.jpg',
          username: 'Fatima',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
      ],
    },
    {
      id: 6,
      resource: [
        {
          id: 13,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=10',
        },
        {
          id: 14,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=11',
        },
        {
          id: 15,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=12',
        },
        {
          id: 16,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=13',
        },
      ],
      thumbnail:
        'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-001.jpg',
      art_name: 'Sport Art',
      art_description: 'Line Wall Arts With Bright Colors',
      artist_id: 0,
      artist: {
        id: 0,
        image:
          'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-016.jpg',
        profileName: 'karennne Shuu',
        profileTagId: '@karennne',
      },
      amount: 75.85,
      currency: {
        name: 'dollar',
        symbol: '$',
      },
      size: ['S', 'M', 'L'],
      maxQuantity: 10,
      relatedSuggestion: [
        {
          id: 100,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=5',
        },
        {
          id: 101,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=6',
        },
        {
          id: 102,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=7',
        },
        {
          id: 103,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
        {
          id: 104,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=10',
        },
        {
          id: 105,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
        {
          id: 106,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=10',
        },
        {
          id: 107,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
      ],
      art_long_description:
        'Line Wall Arts With Bright ColorsLine Wall Arts With Bright ColorsLine Wall Arts With Bright ColorsLine Wall Arts.',
      isCollectionView: false,
      comment: [
        {
          id: 1,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-017.jpg',
          username: 'Sarah',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 2,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-018.jpg',
          username: 'Ali',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 3,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-019.jpg',
          username: 'Mohd',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 4,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-020.jpg',
          username: 'Fatima',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
      ],
    },
    {
      id: 7,
      resource: [
        {
          id: 13,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=10',
        },
        {
          id: 14,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=11',
        },
        {
          id: 15,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=12',
        },
        {
          id: 16,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=13',
        },
      ],
      thumbnail:
        'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-001.jpg',
      art_name: 'Sport Art',
      art_description: 'Line Wall Arts With Bright Colors',
      artist_id: 0,
      artist: {
        id: 0,
        image:
          'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-016.jpg',
        profileName: 'karennne Shuu',
        profileTagId: '@karennne',
      },
      amount: 75.85,
      currency: {
        name: 'dollar',
        symbol: '$',
      },
      size: ['S', 'M', 'L'],
      maxQuantity: 10,
      relatedSuggestion: [
        {
          id: 100,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=5',
        },
        {
          id: 101,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=6',
        },
        {
          id: 102,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=7',
        },
        {
          id: 103,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
        {
          id: 104,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=10',
        },
        {
          id: 105,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
        {
          id: 106,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=10',
        },
        {
          id: 107,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
      ],
      art_long_description:
        'Line Wall Arts With Bright ColorsLine Wall Arts With Bright ColorsLine Wall Arts With Bright ColorsLine Wall Arts.',
      isCollectionView: false,
      comment: [
        {
          id: 1,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-017.jpg',
          username: 'Sarah',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 2,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-018.jpg',
          username: 'Ali',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 3,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-019.jpg',
          username: 'Mohd',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 4,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-020.jpg',
          username: 'Fatima',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
      ],
    },
    {
      id: 8,
      resource: [
        {
          id: 13,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=10',
        },
        {
          id: 14,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=11',
        },
        {
          id: 15,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=12',
        },
        {
          id: 16,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=13',
        },
      ],
      thumbnail:
        'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-001.jpg',
      art_name: 'Sport Art',
      art_description: 'Line Wall Arts With Bright Colors',
      artist_id: 0,
      artist: {
        id: 0,
        image:
          'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-016.jpg',
        profileName: 'karennne Shuu',
        profileTagId: '@karennne',
      },
      amount: 75.85,
      currency: {
        name: 'dollar',
        symbol: '$',
      },
      size: ['S', 'M', 'L'],
      maxQuantity: 10,
      relatedSuggestion: [
        {
          id: 100,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=5',
        },
        {
          id: 101,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=6',
        },
        {
          id: 102,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=7',
        },
        {
          id: 103,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
        {
          id: 104,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=10',
        },
        {
          id: 105,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
        {
          id: 106,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=10',
        },
        {
          id: 107,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
      ],
      art_long_description:
        'Line Wall Arts With Bright ColorsLine Wall Arts With Bright ColorsLine Wall Arts With Bright ColorsLine Wall Arts.',
      isCollectionView: false,
      comment: [
        {
          id: 1,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-017.jpg',
          username: 'Sarah',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 2,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-018.jpg',
          username: 'Ali',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 3,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-019.jpg',
          username: 'Mohd',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 4,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-020.jpg',
          username: 'Fatima',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
      ],
    },
    {
      id: 9,
      resource: [
        {
          id: 13,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=10',
        },
        {
          id: 14,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=11',
        },
        {
          id: 15,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=12',
        },
        {
          id: 16,
          type: 'image',
          uri: 'https://picsum.photos/1024/768?random=13',
        },
      ],
      thumbnail:
        'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-001.jpg',
      art_name: 'Sport Art',
      art_description: 'Line Wall Arts With Bright Colors',
      artist_id: 0,
      artist: {
        id: 0,
        image:
          'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-016.jpg',
        profileName: 'karennne Shuu',
        profileTagId: '@karennne',
      },
      amount: 75.85,
      currency: {
        name: 'dollar',
        symbol: '$',
      },
      size: ['S', 'M', 'L'],
      maxQuantity: 10,
      relatedSuggestion: [
        {
          id: 100,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=5',
        },
        {
          id: 101,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=6',
        },
        {
          id: 102,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=7',
        },
        {
          id: 103,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
        {
          id: 104,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=10',
        },
        {
          id: 105,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
        {
          id: 106,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=10',
        },
        {
          id: 107,
          name: 'Abstract Art',
          image: 'https://picsum.photos/1024/768?random=9',
        },
      ],
      art_long_description:
        'Line Wall Arts With Bright ColorsLine Wall Arts With Bright ColorsLine Wall Arts With Bright ColorsLine Wall Arts.',
      isCollectionView: false,
      comment: [
        {
          id: 1,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-017.jpg',
          username: 'Sarah',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 2,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-018.jpg',
          username: 'Ali',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 3,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-019.jpg',
          username: 'Mohd',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
        {
          id: 4,
          userImg:
            'https://ahauserposts.s3.amazonaws.com/JuliaLeexAllHailArt/04252021+-+Julia+Lee+x+AHA-020.jpg',
          username: 'Fatima',
          comment: 'The quick brown fox jump over the lazy dog.',
          isFavourite: false,
        },
      ],
    },
  ],

  communityWiseArtists: [
    {
      id: 0,
      image: 'https://picsum.photos/1024/768?random=9',
      community_name: 'Minimalist',
      profileTagId: '@karennne',
    },
    {
      id: 1,
      image: 'https://picsum.photos/1024/768?random=11',
      community_name: 'Pop Culture',
      profileTagId: '@Sui',
    },
    {
      id: 2,
      image: 'https://picsum.photos/1024/768?random=10',
      community_name: 'Minimalist',
      profileTagId: '@John',
    },
    {
      id: 3,
      image: 'https://picsum.photos/1024/768?random=12',
      community_name: 'Pop Culture',
      profileTagId: '@Rinne',
    },
  ],

  followTabArtistsList: [
    {
      id: 0,
      image: 'https://picsum.photos/1024/768?random=11',
      profileName: 'karennne Shuu',
      profileTagId: '@karennne',
      isFollowing: false,
    },
    {
      id: 1,
      image: 'https://picsum.photos/1024/768?random=9',
      profileName: 'Jan John',
      profileTagId: '@jan',
      isFollowing: false,
    },
    {
      id: 2,
      image: 'https://picsum.photos/1024/768?random=10',
      profileName: 'Jan John',
      profileTagId: '@jan',
      isFollowing: false,
    },
    {
      id: 3,
      image: 'https://picsum.photos/1024/768?random=9',
      profileName: 'Jan John',
      profileTagId: '@jan',
      isFollowing: false,
    },
  ],

  relatedItem: [
    {
      id: 1,
      image: 'https://picsum.photos/1024/768?random=9',
    },
    {
      id: 2,
      image: 'https://picsum.photos/1024/768?random=11',
    },
    {
      id: 3,
      image: 'https://picsum.photos/1024/768?random=12',
    },
    {
      id: 4,
      image: 'https://picsum.photos/1024/768?random=10',
    },
  ],

  shipment: 50,
  currency: {
    name: 'dollar',
    symbol: '$',
  },
};

// File Types
export const FILE_TYPES = {VIDEO: 'video', IMAGE: 'image', AUDIO: 'audi'};

export const dummyImageUrl = 'https://picsum.photos/1024/768?random=12';
// cardList
export const CartItemList = {
  item: [
    {
      id: 1,
      image: Images.dummyImg,
      amount: 75.85,
      description: 'Line Wall Arts With Bright Colors',
      size: 's',
      status: 'Cancelled',
    },
    {
      id: 2,
      image: Images.dummyImg,
      amount: 75.85,
      description: 'Line Wall Arts With Bright Colors',
      size: 's',
      status: 'Cancelled',
    },
    {
      id: 3,
      image: Images.dummyImg,
      amount: 75.85,
      description: 'Line Wall Arts With Bright Colors',
      size: '100/100',
      status: 'Completed',
    },
    {
      id: 4,
      image: Images.dummyImg,
      amount: 75.85,
      description: 'Line Wall Arts With Bright Colors',
      size: '24/24',
      status: 'Cancelled',
    },
    {
      id: 5,
      image: Images.dummyImg,
      amount: 75.85,
      description: 'Line Wall Arts With Bright Colors',
      size: '24/24',
      status: 'Cancelled',
    },
    {
      id: 6,
      image: Images.dummyImg,
      amount: 75.85,
      description: 'Line Wall Arts With Bright Colors',
      size: '24/24',
      status: 'Cancelled',
    },
  ],

  shipment: 50,
  currency: {
    name: 'dollar',
    symbol: '$',
  },
};

export const addresses = [
  {
    id: 1,
    title: 'Office',
    country: "Australia's",
    state: 'Sydney',
    address: 'New South Wales, 2000, AUS',
    coords: {
      latitude: 1.2,
      longitude: 1.2,
    },
    selected: true,
  },
  {
    id: 2,
    title: 'Office',
    country: "Australia's",
    state: 'Sydney',
    address: 'Sydney Opera House, Sydney,New South Wales, 2000, AUS',
    coords: {
      latitude: 1.2,
      longitude: 1.2,
    },
    selected: false,
  },
];

// remove this
export const selectedAddresses = [
  {
    id: 1,
    title: 'Office',
    country: "Australia's",
    state: 'Sydney',
    address: 'New South Wales, 2000, AUS',
    coords: {
      latitude: 1.2,
      longitude: 1.2,
    },
  },
];

export const cardTypes = {
  mastercard: Images.masterCard,
  visa: Images.masterCard,
};

export const cards = [
  {
    id: 1,
    cardNumber: '5105105105105100',
    cvv: '358',
    cardType: 'mastercard',
    expiry: '12/21',
    selected: true,
  },
  {
    id: 2,
    cardNumber: '4111111111111111',
    cvv: '358',
    cardType: 'visa',
    expiry: '12/21',
    selected: false,
  },
];

// remove this
export const selectedCards = [
  {
    id: 1,
    cardNumber: '5105105105105100',
    cvv: '358',
    cardType: 'mastercard',
    expiry: '12/21',
  },
];

export const dummyArrayOfImage = [
  {
    id: 0,
    image: 'https://picsum.photos/1024/768?random=11',
  },
  {
    id: 1,
    image: 'https://picsum.photos/1024/768?random=9',
  },
  {
    id: 2,
    image: 'https://picsum.photos/1024/768?random=11',
  },
  {
    id: 3,
    image: 'https://picsum.photos/1024/768?random=9',
  },
  {
    id: 4,
    image: 'https://picsum.photos/1024/768?random=11',
  },
  {
    id: 5,
    image: 'https://picsum.photos/1024/768?random=9',
  },
  {
    id: 6,
    image: 'https://picsum.photos/1024/768?random=11',
  },
  {
    id: 7,
    image: 'https://picsum.photos/1024/768?random=9',
  },
  {
    id: 8,
    image: 'https://picsum.photos/1024/768?random=11',
  },
  {
    id: 9,
    image: 'https://picsum.photos/1024/768?random=9',
  },
  {
    id: 10,
    image: 'https://picsum.photos/1024/768?random=11',
  },
];

export const artistSettingsList = [
  {
    id: 1,
    title: 'Security',
    icon: Images.securityIcon,
    action: () => Actions.jump('security'),
    isClickable: true,
  },
  {
    id: 2,
    title: 'Address',
    icon: Images.addressIcon,
    action: () => Actions.jump('address'),
    isClickable: true,
  },
  {
    id: 3,
    title: 'Artist Preferences ',
    icon: Images.ArtistPreferences,
    action: () => Actions.jump('artistPreferences'),
    _isArtist: true,
    isClickable: true,
  },
  {
    id: 6,
    title: 'Create Collection',
    icon: Images.CollectionIcon,
    action: () => Actions.jump('createCollection'),
    _isArtist: true,
    isClickable: true,
  },

  {
    id: 7,
    title: 'Sales',
    icon: Images.sale,
    action: () => Actions.jump('sales'),
    _isArtist: true,
    isClickable: true,
  },
  {
    id: 8,
    title: 'Privacy Policy',
    icon: Images.privacyPolicyIcon,
    action: () => Actions.jump('privacyPolicy'),
    isClickable: true,
  },
  {
    id: 9,
    title: 'Terms & Conditions',
    icon: Images.termsAndConditionIcon,
    action: () => Actions.jump('termsAndConditions'),
    isClickable: true,
  },
  {
    id: 7,
    title: 'Order History',
    icon: Images.orderHistory,
    action: () => Actions.jump('orderHistory'),
    _isArtist: true,
    isClickable: true,
  },
  {
    id: 10,
    title: 'Wallet',
    icon: Images.walletIcon,
    action: () => Actions.jump('wallet'),
    _isArtist: true,
    isClickable: true,
  },
  // {
  //   id: 11,
  //   title: 'Find Fedex',
  //   icon: Images.findFedex,
  //   action: () => Actions.jump('findFedex'),
  //   _isArtist: true,
  // },
  {
    id: 12,
    title: 'Log out',
    icon: Images.logoutIcon,
    action: () => {
      const token = util.getCurrentUserRefreshToken();
      DataHandler.getStore().dispatch(userSignOutRequest({token}, res => {}));
      Actions.reset('login');
    },
    isClickable: true,
  },
];

export const userSettingsList = [
  {
    id: 1,
    title: 'Security',
    icon: Images.securityIcon,
    action: () => Actions.jump('security'),
    isClickable: true,
  },
  {
    id: 2,
    title: 'Address',
    icon: Images.addressIcon,
    action: () => Actions.jump('address'),
    isClickable: true,
  },
  {
    id: 3,
    title: 'Your Vibes',
    icon: Images.yourVibesIcon,
    action: () => Actions.jump('yourVibe'),
    isClickable: true,
  },
  {
    id: 4,
    title: 'Your Interest',
    icon: Images.yourInterestIcon,
    action: () => Actions.jump('yourInterest'),
    isClickable: true,
  },
  {
    id: 8,
    title: 'Privacy Policy',
    icon: Images.privacyPolicyIcon,
    action: () => Actions.jump('privacyPolicy'),
    isClickable: true,
  },
  {
    id: 9,
    title: 'Terms & Conditions',
    icon: Images.termsAndConditionIcon,
    action: () => Actions.jump('termsAndConditions'),
    isClickable: true,
  },
  {
    id: 5,
    title: 'Order History',
    icon: Images.orderHistory,
    action: () => Actions.jump('orderHistory'),
    _isArtist: true,
    isClickable: true,
  },
  {
    id: 12,
    title: 'Log out',
    icon: Images.logoutIcon,
    action: () => {
      const token = util.getCurrentUserRefreshToken();
      DataHandler.getStore().dispatch(
        userSignOutRequest({token}, res => {
          if (res) {
            Actions.reset('login');
          }
        }),
      );
    },
    isClickable: true,
  },
];

export function setSelectedTabId(_id) {
  DataHandler.getStore().dispatch(setSelectedTab(_id));
}

export function setSelectedActionName(actionName) {
  DataHandler.getStore().dispatch(setCurrenActiveActionName(actionName));
}

// export const dummyImageUrl = 'https://picsum.photos/1024/768?random=12';
export const artistProfileImageArt = [
  {
    id: 1,
    image:
      'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/ScreenShot2021-10-12at20939PM.png',
    title: 'Digital',
  },
  {
    id: 2,
    image: 'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/SS1.png',
    title: 'Digital',
  },
  {
    id: 3,
    image: 'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/SS2.png',
    title: 'Digital',
  },
  {
    id: 4,
    image: 'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/SS3.png',
    title: 'Digital',
  },
  {
    id: 5,
    image: 'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/SS4.png',
    title: 'Digital',
  },
  {
    id: 6,
    image: 'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/SS5.png',
    title: 'Digital',
  },
  {
    id: 7,
    image: 'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/SS6.png',
    title: 'Digital',
  },
  {
    id: 8,
    image: 'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/SS7.png',
    title: 'Digital',
  },
  {
    id: 9,
    image: 'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/SS8.png',
    title: 'Digital',
  },
  {
    id: 10,
    image: 'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/SS9.png',
    title: 'Digital',
  },
];

export const artistProfileImageCollection = [
  {
    id: 1,
    image:
      'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/ScreenShot2021-10-12at20939PM.png',
    title: 'Digital',
  },
  {
    id: 2,
    image: 'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/SS1.png',
    title: 'Digital',
  },
  {
    id: 3,
    image: 'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/SS2.png',
    title: 'Digital',
  },
  {
    id: 4,
    image: 'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/SS3.png',
    title: 'Digital',
  },
  {
    id: 5,
    image: 'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/SS4.png',
    title: 'Digital',
  },
  {
    id: 6,
    image: 'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/SS5.png',
    title: 'Digital',
  },
  {
    id: 7,
    image: 'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/SS6.png',
    title: 'Digital',
  },
  {
    id: 8,
    image: 'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/SS7.png',
    title: 'Digital',
  },
  {
    id: 9,
    image: 'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/SS8.png',
    title: 'Digital',
  },
  {
    id: 10,
    image: 'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/SS9.png',
    title: 'Digital',
  },
];

export const artistProfileImagePin = [
  {
    id: 1,
    image:
      'https://ahauserposts.s3.amazonaws.com/ajeet-mestry-UBhpOIHnazM-unsplash.jpg',
  },
  {
    id: 2,
    image:
      'https://ahauserposts.s3.amazonaws.com/alex-knight-2EJCSULRwC8-unsplash.jpg',
  },
  {
    id: 3,
    image:
      'https://ahauserposts.s3.amazonaws.com/alex-lee-rWrfmXcO3NU-unsplash.jpg',
  },
  {
    id: 4,
    image:
      'https://ahauserposts.s3.amazonaws.com/alex-lvrs-4N5huJDOydQ-unsplash.jpg',
  },
  {
    id: 5,
    image:
      'https://ahauserposts.s3.amazonaws.com/andrew-butler-aUu8tZFNgfM-unsplash.jpg',
  },
  {
    id: 6,
    image:
      'https://ahauserposts.s3.amazonaws.com/annie-spratt-TywjkDHf0Ps-unsplash.jpg',
  },
  {
    id: 7,
    image:
      'https://ahauserposts.s3.amazonaws.com/colin-lloyd-bT3dHRFAREA-unsplash.jpg',
  },
  {
    id: 8,
    image:
      'https://ahauserposts.s3.amazonaws.com/hulki-okan-tabak-PaoG427w_As-unsplash.jpg',
  },
  {
    id: 9,
    image:
      'https://ahauserposts.s3.amazonaws.com/matthew-hamilton-kbeIGiNWDaY-unsplash.jpg',
  },
  {
    id: 10,
    image: 'https://ahauserposts.s3.amazonaws.com/ScreenShot2021-10-12at.png',
  },
];

export const UserProfileImagePin = [
  {
    id: 1,
    image:
      'https://ahauserposts.s3.amazonaws.com/ajeet-mestry-UBhpOIHnazM-unsplash.jpg',
  },
  {
    id: 2,
    image:
      'https://ahauserposts.s3.amazonaws.com/alex-knight-2EJCSULRwC8-unsplash.jpg',
  },
  {
    id: 3,
    image:
      'https://ahauserposts.s3.amazonaws.com/alex-lee-rWrfmXcO3NU-unsplash.jpg',
  },
  {
    id: 4,
    image:
      'https://ahauserposts.s3.amazonaws.com/alex-lvrs-4N5huJDOydQ-unsplash.jpg',
  },
  {
    id: 5,
    image:
      'https://ahauserposts.s3.amazonaws.com/andrew-butler-aUu8tZFNgfM-unsplash.jpg',
  },
  {
    id: 6,
    image:
      'https://ahauserposts.s3.amazonaws.com/annie-spratt-TywjkDHf0Ps-unsplash.jpg',
  },
  {
    id: 7,
    image:
      'https://ahauserposts.s3.amazonaws.com/colin-lloyd-bT3dHRFAREA-unsplash.jpg',
  },
  {
    id: 8,
    image:
      'https://ahauserposts.s3.amazonaws.com/hulki-okan-tabak-PaoG427w_As-unsplash.jpg',
  },
  {
    id: 9,
    image:
      'https://ahauserposts.s3.amazonaws.com/matthew-hamilton-kbeIGiNWDaY-unsplash.jpg',
  },
  {
    id: 10,
    image: 'https://ahauserposts.s3.amazonaws.com/ScreenShot2021-10-12at.png',
  },
];

export const UserProfileImageCollection = [
  {
    id: 1,
    image:
      'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/ScreenShot2021-10-12at209-32PM.png',
    title: 'Digital',
  },
  {
    id: 2,
    image:
      'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/Screen Shot 2019-03-06 at 2.36.03 PM.png',
    title: 'Digital',
  },
  {
    id: 3,
    image:
      'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/Screen Shot 2021-04-05 at 2.06.28 PM.png',
    title: 'Digital',
  },
  {
    id: 4,
    image:
      'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/Screen Shot 2021-04-06 at 4.48.37 PM.png',
    title: 'Digital',
  },
  {
    id: 5,
    image:
      'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/Screen Shot 2021-05-18 at 10.31.02 AM.png',
    title: 'Digital',
  },
  {
    id: 6,
    image:
      'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/Screen Shot 2021-05-18 at 10.32.03 AM.png',
    title: 'Digital',
  },
  {
    id: 7,
    image:
      'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/Screen Shot 2021-05-18 at 10.34.29 AM.png',
    title: 'Digital',
  },
  {
    id: 8,
    image:
      'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/Screen Shot 2021-10-12 at 1.58.15 PM.png',
    title: 'Digital',
  },
  {
    id: 9,
    image:
      'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/Screen Shot 2021-10-12 at 2.00.58 PM.png',
    title: 'Digital',
  },
  {
    id: 10,
    image:
      'https://ahauserposts.s3.amazonaws.com/ArtAHA2021/Screen Shot 2021-10-12 at 2.09.21 PM.png',
    title: 'Digital',
  },
];

export const selectedVibes = [
  {
    id: 1,
    title: 'Pop Culture',
    image: Images.InterestImage3,
  },
  {
    id: 2,
    title: 'Apparel ',
    image: Images.InterestImage1,
  },
  {
    id: 3,
    title: 'Minimalist',
    image: Images.InterestImage2,
  },
];

export const AddYourInterest = [
  {
    id: 1,
    title: 'Minimalist',
    image: Images.InterestImage1,
  },
  {
    id: 2,
    title: 'Pop Culture',
    image: Images.InterestImage2,
  },
  {
    id: 3,
    title: 'Apparel',
    image: Images.InterestImage3,
  },
];

export const AddCommunity = [
  {
    id: 1,
    title: 'Digital Art',
    image: 'https://picsum.photos/1024/768?random=12',
  },
  {
    id: 2,
    title: 'Digital Art',
    image: 'https://picsum.photos/1024/768?random=15',
  },
  {
    id: 3,
    title: 'Digital Art',
    image: 'https://picsum.photos/1024/768?random=12',
  },
  {
    id: 4,
    title: 'Digital Art',
    image: 'https://picsum.photos/1024/768?random=15',
  },
];

export const orderDetail = {
  data: [
    {
      id: 1,
      image: 'https://picsum.photos/1024/768?random=12',
      description: 'Line Wall Arts With Dark Back Love Printable Bright Colors',
      amount: 775.85,
      size: '24/24',
      quantity: 2,
    },
    {
      id: 2,
      image: 'https://picsum.photos/1024/768?random=9',
      description: 'Line Wall Arts With Dark Back Love Printable Bright Colors',
      amount: 325.85,
      size: '24/24',
      quantity: 5,
    },
    {
      id: 3,
      image: 'https://picsum.photos/1024/768?random=16',
      description: 'Line Wall Arts With Dark Back Love Printable Bright Colors',
      amount: 275.85,
      size: '24/24',
      quantity: 8,
    },
  ],
  subTotal: 775.85,
  total: 795.85,
  shipment: 20,
  currency: {
    name: 'dollar',
    symbol: '$',
  },
  payBy: 'Visa Card',
};

export const MAIN_TABS_DATA = {
  DASHBOARD_TAB: {
    key: 'dashboard_tab',
    icon: Images.dashboardTabIcon,
    id: 1,
    initailScreen: '_dashboard_tab',
  },
  SEARCH_TAB: {
    key: 'search_tab',
    icon: Images.searchTabIcon,
    id: 2,
    initailScreen: '_search_tab',
  },
  GALLERY_TAB: {
    key: 'gallery',
    icon: Images.searchTabIcon,
    id: 3,
    initailScreen: '_gallery',
  },
  COMMUNITY_TAB: {
    key: 'communityListingTab',
    icon: Images.communityIcon,
    id: 4,
    initailScreen: '_communityListingTab',
  },
  PROFILE_TAB: {
    key: 'profile_tab',
    icon: Images.profileTabIcon,
    id: 5,
    initailScreen: '_profile_tab',
  },
};

export const navigateToDashboard = [
  '_profile_tab',
  '_cart_tab',
  '_search_tab',
  '_gallery_tab',
  'orderHistory',
  'artistProfile',
];

export const arts = [
  {
    id: 1,
    image: 'https://ahauserposts.s3.amazonaws.com/art1.jpeg',
    title: 'Art 1',
  },
  {
    id: 2,
    image: 'https://ahauserposts.s3.amazonaws.com/art2.jpeg',
    title: 'Art 2',
  },
  {
    id: 3,
    image: 'https://ahauserposts.s3.amazonaws.com/art3.jpg',
    title: 'Art 3',
  },
  {
    id: 4,
    image: 'https://ahauserposts.s3.amazonaws.com/art4.jpg',
    title: 'Art 4',
  },
];

export const events = [
  {
    id: 1,
    image: 'https://ahauserposts.s3.amazonaws.com/Bushwick+Art+Show.png',
    title: 'Event 1',
  },
  {
    id: 2,
    image: 'https://ahauserposts.s3.amazonaws.com/Art+Party.png',
    title: 'Event 2',
  },
  {
    id: 3,
    image: 'https://ahauserposts.s3.amazonaws.com/crypto+hangout+.jpeg',
    title: 'Event 3',
  },
  {
    id: 4,
    image: 'https://ahauserposts.s3.amazonaws.com/nft.jpeg',
    title: 'Event 4',
  },
];

export let communityOptions = [
  [
    {
      id: 1,
      image: 'https://ahauserposts.s3.amazonaws.com/event.png',
      title: 'Events',
      action: () => {
        Actions.events({fromCommunity: true});
      },
    },
    {
      id: 2,
      image: 'https://ahauserposts.s3.amazonaws.com/art.png',
      title: 'Gallery',
      action: () => {
        Actions.arts({fromCommunity: true});
      },
    },
    {
      id: 3,
      image: 'https://ahauserposts.s3.amazonaws.com/artist.png',
      title: 'Drop',
      action: () => {},
    },
    {
      id: 4,
      image: 'https://ahauserposts.s3.amazonaws.com/collection.png',
      title: 'Connect',
      action: () => {},
    },
  ],
  [
    {
      id: 1,
      image: 'https://ahauserposts.s3.amazonaws.com/event.png',
      title: 'Events',
      action: () => {
        Actions.events({fromCommunity: true});
      },
    },
    {
      id: 2,
      image: 'https://ahauserposts.s3.amazonaws.com/art.png',
      title: 'Gallery',
      action: () => {
        Actions.arts({fromCommunity: true});
      },
    },
    {
      id: 3,
      image: 'https://ahauserposts.s3.amazonaws.com/artist.png',
      title: 'Drop',
      action: () => {},
    },
    {
      id: 4,
      image: 'https://ahauserposts.s3.amazonaws.com/collection.png',
      title: 'Connect',
      action: () => {
        // Actions.collection({fromCommunity: true});
      },
    },
  ],

  [
    {
      id: 1,
      image: 'https://ahauserposts.s3.amazonaws.com/event.png',
      title: 'Events',
      action: () => {
        Actions.events({fromCommunity: true});
      },
    },
    {
      id: 2,
      image: 'https://ahauserposts.s3.amazonaws.com/art.png',
      title: 'Gallery',
      action: () => {
        Actions.arts({fromCommunity: true});
      },
    },
    {
      id: 3,
      image: 'https://ahauserposts.s3.amazonaws.com/artist.png',
      title: 'Drop',
      action: () => {},
    },
    {
      id: 4,
      image: 'https://ahauserposts.s3.amazonaws.com/collection.png',
      title: 'Connect',
      action: () => {},
    },
  ],
  [
    {
      id: 1,
      image: 'https://ahauserposts.s3.amazonaws.com/event.png',
      title: 'Events',
      action: () => {
        Actions.events({fromCommunity: true});
      },
    },
    {
      id: 2,
      image: 'https://ahauserposts.s3.amazonaws.com/art.png',
      title: 'Gallery',
      action: () => {
        Actions.arts({fromCommunity: true});
      },
    },
    {
      id: 3,
      image: 'https://ahauserposts.s3.amazonaws.com/artist.png',
      title: 'Drop',
      action: () => {},
    },
    {
      id: 4,
      image: 'https://ahauserposts.s3.amazonaws.com/collection.png',
      title: 'Connect',
      action: () => {
        // Actions.collection({fromCommunity: true});
      },
    },
  ],
];

export const collections = [
  {
    id: 1,
    image: 'https://picsum.photos/1024/768?random=1',
    title: 'collection 1',
  },
  {
    id: 2,
    image: 'https://picsum.photos/1024/768?random=2',
    title: 'collection 2',
  },
  {
    id: 3,
    image: 'https://picsum.photos/1024/768?random=3',
    title: 'collection 3',
  },
  {
    id: 4,
    image: 'https://picsum.photos/1024/768?random=4',
    title: 'collection 4',
  },
  {
    id: 5,
    image: 'https://picsum.photos/1024/768?random=5',
    title: 'collection 5',
  },
  {
    id: 6,
    image: 'https://picsum.photos/1024/768?random=6',
    title: 'collection 6',
  },
  {
    id: 7,
    image: 'https://picsum.photos/1024/768?random=7',
    title: 'collection 7',
  },
  {
    id: 8,
    image: 'https://picsum.photos/1024/768?random=8',
    title: 'collection 8',
  },
  {
    id: 9,
    image: 'https://picsum.photos/1024/768?random=8',
    title: 'collection 9',
  },
  {
    id: 10,
    image: 'https://picsum.photos/1024/768?random=10',
    title: 'collection 10',
  },
  {
    id: 11,
    image: 'https://picsum.photos/1024/768?random=11',
    title: 'collection 11',
  },
  {
    id: 12,
    image: 'https://picsum.photos/1024/768?random=12',
    title: 'collection 12',
  },
  {
    id: 13,
    image: 'https://picsum.photos/1024/768?random=13',
    title: 'collection 13',
  },
  {
    id: 14,
    image: 'https://picsum.photos/1024/768?random=14',
    title: 'collection 14',
  },
  {
    id: 15,
    image: 'https://picsum.photos/1024/768?random=15',
    title: 'collection 15',
  },
];
export const searchCategory = {
  ALL: {
    text: 'All',
    slug: 'all',
  },
  ART: {
    text: 'Art',
    slug: 'arts',
  },
  ARTIST: {
    text: 'Artist',
    slug: 'artists',
  },
  VIBE: {
    text: 'Vibes',
    slug: 'vibes',
  },
  COLLECTION: {
    text: 'Collection',
    slug: 'art_collections',
  },
};

export const recenTransactions = [
  {
    id: 1,
    title: 'Digital Art',
    date: moment().utcOffset('+05:30').format('MMMM DD hh:mm a'),
    amount: '$26.65',
    image: Images.recentTransactionIcon,
  },
  {
    id: 2,
    title: 'Digital Art',
    date: moment().utcOffset('+05:30').format('MMMM DD hh:mm a'),
    amount: '$26.65',
    image: Images.recentTransactionIcon,
  },
  {
    id: 3,
    title: 'Digital Art',
    date: moment().utcOffset('+05:30').format('MMMM DD hh:mm a'),
    amount: '$26.65',
    image: Images.recentTransactionIcon,
  },
  {
    id: 4,
    title: 'Digital Art',
    date: moment().utcOffset('+05:30').format('MMMM DD hh:mm a'),
    amount: '$26.65',
    image: Images.recentTransactionIcon,
  },
  {
    id: 5,
    title: 'Digital Art',
    date: moment().utcOffset('+05:30').format('MMMM DD hh:mm a'),
    amount: '$26.65',
    image: Images.recentTransactionIcon,
  },
  {
    id: 6,
    title: 'Digital Art',
    date: moment().utcOffset('+05:30').format('MMMM DD hh:mm a'),
    amount: '$26.65',
    image: Images.recentTransactionIcon,
  },
  {
    id: 7,
    title: 'Digital Art',
    date: moment().utcOffset('+05:30').format('MMMM DD hh:mm a'),
    amount: '$26.65',
    image: Images.recentTransactionIcon,
  },
  {
    id: 8,
    title: 'Digital Art',
    date: moment().utcOffset('+05:30').format('MMMM DD hh:mm a'),
    amount: '$26.65',
    image: Images.recentTransactionIcon,
  },
];

export const fedex = [
  {
    id: 1,
    title: 'Fedex New York',
    description: '130 Leroy St · +1 800-463-3339 Open ⋅ Closes 5PM',
    icon: Images.locationIcon,
  },
  {
    id: 2,
    title: 'Fedex New York',
    description: '130 Leroy St · +1 800-463-3339 Open ⋅ Closes 5PM',
    icon: Images.locationIcon,
  },
  {
    id: 3,
    title: 'Fedex New York',
    description: '130 Leroy St · +1 800-463-3339 Open ⋅ Closes 5PM',
    icon: Images.locationIcon,
  },
  {
    id: 4,
    title: 'Fedex New York',
    description: '130 Leroy St · +1 800-463-3339 Open ⋅ Closes 5PM',
    icon: Images.locationIcon,
  },
  {
    id: 5,
    title: 'Fedex New York',
    description: '130 Leroy St · +1 800-463-3339 Open ⋅ Closes 5PM',
    icon: Images.locationIcon,
  },
  {
    id: 6,
    title: 'Fedex New York',
    description: '130 Leroy St · +1 800-463-3339 Open ⋅ Closes 5PM',
    icon: Images.locationIcon,
  },
  {
    id: 7,
    title: 'Fedex New York',
    description: '130 Leroy St · +1 800-463-3339 Open ⋅ Closes 5PM',
    icon: Images.locationIcon,
  },
  {
    id: 8,
    title: 'Fedex New York',
    description: '130 Leroy St · +1 800-463-3339 Open ⋅ Closes 5PM',
    icon: Images.locationIcon,
  },
  {
    id: 9,
    title: 'Fedex New York',
    description: '130 Leroy St · +1 800-463-3339 Open ⋅ Closes 5PM',
    icon: Images.locationIcon,
  },
  {
    id: 10,
    title: 'Fedex New York',
    description: '130 Leroy St · +1 800-463-3339 Open ⋅ Closes 5PM',
    icon: Images.locationIcon,
  },
];

export const ArtistOrdersStatus = [
  {
    id: 1,
    orderImage: 'https://source.unsplash.com/1024x768/?girl',
    orderPrice: 50,
    isMultipleProduct: true,
    numberOfProduct: 10,
    status: 'In Queue',
  },
  {
    id: 2,
    orderImage: 'https://source.unsplash.com/1024x768/?girl',
    orderPrice: 50,
    isMultipleProduct: false,
    numberOfProduct: 3,
    status: 'In Queue',
  },
  {
    id: 3,
    orderImage: 'https://source.unsplash.com/1024x768/?girl',
    orderPrice: 50,
    isMultipleProduct: false,
    numberOfProduct: 8,
    status: 'In Queue',
  },
  {
    id: 4,
    orderImage: 'https://source.unsplash.com/1024x768/?girl',
    orderPrice: 50,
    isMultipleProduct: false,
    numberOfProduct: 12,
    status: 'In Queue',
  },
  {
    id: 5,
    orderImage: 'https://source.unsplash.com/1024x768/?girl',
    orderPrice: 50,
    isMultipleProduct: false,
    numberOfProduct: 22,
    status: 'Dispatched',
  },
  {
    id: 6,
    orderImage: 'https://source.unsplash.com/1024x768/?girl',
    orderPrice: 50,
    isMultipleProduct: false,
    numberOfProduct: 44,
    status: 'Dispatched',
  },
  {
    id: 7,
    orderImage: 'https://source.unsplash.com/1024x768/?girl',
    orderPrice: 50,
    isMultipleProduct: false,
    numberOfProduct: 23,
    status: 'Dispatched',
  },
  {
    id: 8,
    orderImage: 'https://source.unsplash.com/1024x768/?girl',
    orderPrice: 50,
    isMultipleProduct: false,
    numberOfProduct: 2,
    status: 'Dispatched',
  },
  {
    id: 9,
    orderImage: 'https://source.unsplash.com/1024x768/?girl',
    orderPrice: 50,
    isMultipleProduct: false,
    numberOfProduct: 6,
    status: 'Dispatched',
  },
  {
    id: 10,
    orderImage: 'https://source.unsplash.com/1024x768/?girl',
    orderPrice: 50,
    isMultipleProduct: false,
    numberOfProduct: 9,
    status: 'Dispatched',
  },
  {
    id: 11,
    orderImage: 'https://source.unsplash.com/1024x768/?girl',
    orderPrice: 50,
    isMultipleProduct: false,
    numberOfProduct: 8,
    status: 'Processing',
  },
  {
    id: 12,
    orderImage: 'https://source.unsplash.com/1024x768/?girl',
    orderPrice: 50,
    isMultipleProduct: false,
    numberOfProduct: 1,
    status: 'Processing',
  },
  {
    id: 13,
    orderImage: 'https://source.unsplash.com/1024x768/?girl',
    orderPrice: 50,
    isMultipleProduct: false,
    numberOfProduct: 1,
    status: 'Processing',
  },
  {
    id: 14,
    orderImage: 'https://source.unsplash.com/1024x768/?girl',
    orderPrice: 50,
    isMultipleProduct: false,
    numberOfProduct: 1,
    status: 'Processing',
  },
  {
    id: 15,
    orderImage: 'https://source.unsplash.com/1024x768/?girl',
    orderPrice: 50,
    isMultipleProduct: false,
    numberOfProduct: 1,
    status: 'Processing',
  },
  {
    id: 16,
    orderImage: 'https://source.unsplash.com/1024x768/?girl',
    orderPrice: 50,
    isMultipleProduct: false,
    numberOfProduct: 1,
    status: 'Processing',
  },
  {
    id: 17,
    orderImage: 'https://source.unsplash.com/1024x768/?girl',
    orderPrice: 50,
    isMultipleProduct: false,
    numberOfProduct: 1,
    status: 'Processing',
  },
  {
    id: 18,
    orderImage: 'https://source.unsplash.com/1024x768/?girl',
    orderPrice: 50,
    isMultipleProduct: false,
    numberOfProduct: 1,
    status: 'Processing',
  },
  {
    id: 19,
    orderImage: 'https://source.unsplash.com/1024x768/?girl',
    orderPrice: 50,
    isMultipleProduct: false,
    numberOfProduct: 1,
    status: 'Cancelled',
  },
  {
    id: 20,
    orderImage: 'https://source.unsplash.com/1024x768/?girl',
    orderPrice: 50,
    isMultipleProduct: false,
    numberOfProduct: 1,
    status: 'Cancelled',
  },
];

export const NOTIFICATION_CHANNEL = {
  id: 'com.ahaart.app',
  name: 'Aha Notifications',
};
export const NOTIFICATION_PERMISSION_DENIED_ERROR =
  'Please allow notifications and get notified timely';

export const NOTIFICATIONS = {
  USER_FOLLOWED_YOU: 'user_followed_you',
  ORDER_PLACED: 'order_placed',
  ORDER_STATUS_CHANGED: 'order_status_changed',
  COMMENT_ON_ART: 'comment_on_art',
  LIKE_ON_COMMENT: 'like_on_comment',
  ART_WAS_PINNED: 'art_was_pinned',
  ART_SOLDOUT: 'art_soldout',
  PAYMENT_EXPIRED: 'payment_expired',
};
export const NOTIFICATIONS_TYPE = {
  USER_FOLLOWED_YOU: 'user_followed_you',
  ORDER_PLACED: 'order_placed',
  ORDER_STATUS_CHANGED: 'order_status_changed',
  COMMENT_ON_ART: 'comment_on_art',
  LIKE_ON_COMMENT: 'like_on_comment',
  ART_WAS_PINNED: 'art_was_pinned',
  ART_SOLDOUT: 'art_soldout',
  PAYMENT_EXPIRED: 'payment_expired',
};

export const DEEP_LINK_SCREEN_CONSTS = {
  ART: 'art',
  PROFILE: 'profile',
};

export const SOCIAL_LOGIN_TYPES = {
  google: 'google',
  twitter: 'twitter',
  facebook: 'facebook',
};

export const parcelTempleData = [
  {
    token: 'USPS_FlatRateCardboardEnvelope',
    name: 'Flat Rate Cardboard Envelope',
  },
  {token: 'USPS_FlatRateEnvelope', name: 'Flat Rate Envelope'},
  {
    token: 'USPS_FlatRateGiftCardEnvelope',
    name: 'Flat Rate Gift Card Envelope',
  },
  {token: 'USPS_FlatRateLegalEnvelope', name: 'Flat Rate Legal Envelope'},
  {token: 'USPS_FlatRatePaddedEnvelope', name: 'Flat Rate Padded Envelope'},
  {token: 'USPS_FlatRateWindowEnvelope', name: 'Flat Rate Window Envelope'},
  {token: 'USPS_IrregularParcel', name: 'Irregular Parcel'},
  {
    token: 'USPS_LargeFlatRateBoardGameBox',
    name: 'Large Flat Rate Board Game Box',
  },
  {token: 'USPS_LargeFlatRateBox', name: 'Large Flat Rate Box'},
  {token: 'USPS_MediumFlatRateBox1', name: 'Medium Flat Rate Box 1'},
  {token: 'USPS_MediumFlatRateBox2', name: 'Medium Flat Rate Box 2'},
  {token: 'USPS_RegionalRateBoxA1', name: 'Regional Rate Box A1'},
  {token: 'USPS_RegionalRateBoxA2', name: 'Regional Rate Box A2'},
  {token: 'USPS_RegionalRateBoxB1', name: 'Regional Rate Box B1'},
  {token: 'USPS_RegionalRateBoxB2', name: 'Regional Rate Box B2'},
  {token: 'USPS_SmallFlatRateBox', name: 'Small Flat Rate Box'},
  {token: 'USPS_SmallFlatRateEnvelope', name: 'Small Flat Rate Envelope'},
  {token: 'USPS_SoftPack', name: 'Soft Pack Padded Envelope'},

  // {token: 'UPS_Express_Box', name: 'Express Box'},
  // {token: 'UPS_Express_Box_Large', name: 'Express Box Large'},
  // {token: 'UPS_Express_Box_Medium', name: 'Express Box Medium'},
  // {token: 'UPS_Express_Box_Small', name: 'Express Box Small'},

  // {token: 'UPS_Express_Envelope', name: 'Express Envelope'},
  // {token: 'UPS_Express_Hard_Pak', name: 'Express Hard Pak'},
  // {token: 'UPS_Express_Legal_Envelope', name: 'Express Legal Envelope'},

  // {token: 'UPS_Express_Pak', name: 'Express Pak'},
  // {token: 'UPS_Express_Tube', name: 'Express Tube'},
  // {token: 'UPS_Laboratory_Pak', name: 'Laboratory Pak'},
  // {
  //   token: 'UPS_MI_BPM',
  //   name: 'BPM (Mail Innovations - Domestic & International)',
  // },
  // {
  //   token: 'UPS_MI_BPM_Flat',
  //   name: 'BPM Flat (Mail Innovations - Domestic & International)',
  // },
  // {
  //   token: 'UPS_MI_BPM_Parcel',
  //   name: 'BPM Parcel (Mail Innovations - Domestic & International)',
  // },
  // {
  //   token: 'UPS_MI_First_Class',
  //   name: 'First Class (Mail Innovations - Domestic only)',
  // },
  // {token: 'UPS_MI_Flat', name: 'Flat (Mail Innovations - Domestic only)'},
  // {
  //   token: 'UPS_MI_Irregular',
  //   name: 'Irregular (Mail Innovations - Domestic only)',
  // },
  // {
  //   token: 'UPS_MI_Machinable',
  //   name: 'Machinable (Mail Innovations - Domestic only)',
  // },
  // {
  //   token: 'UPS_MI_MEDIA_MAIL',
  //   name: 'Media Mail (Mail Innovations - Domestic only)',
  // },
  // {
  //   token: 'UPS_MI_Parcel_Post	',
  //   name: 'Parcel Post (Mail Innovations - Domestic only)',
  // },
  // {
  //   token: 'UPS_MI_Priority',
  //   name: 'Priority (Mail Innovations - Domestic only)',
  // },
  // {
  //   token: 'UPS_MI_Standard_Flat',
  //   name: 'Standard Flat (Mail Innovations - Domestic only)',
  // },
  // {token: 'UPS_Pad_Pak', name: 'Pad Pak'},
  // {token: 'UPS_Pallet', name: 'Pallet'},
];
