// @flow
import _ from 'lodash';
import React from 'react';
import {Actions, Router, Scene, Stack, Tabs} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Tabbar, Text} from '../components';
import {
  MAIN_TABS_DATA,
  mixpanelKey,
  navigateToDashboard,
  setSelectedActionName,
  setSelectedTabId,
} from '../constants';
import {Mixpanel} from 'mixpanel-react-native';

import util from '../util';
import {
  Address,
  ArtistFollowers,
  ArtistFollowing,
  ArtistOrderStatus,
  ArtistPreferences,
  ArtistProfile,
  Arts,
  BecomeAnArtistForm,
  Cart,
  CartCheckout,
  CartConfirmation,
  ChangeNumber,
  ChangeNumberVerification,
  ChooseYourInterest,
  ChooseYourVibe,
  Collection,
  Comment,
  CommunityOptionsContainer,
  CreateCollection,
  EditProfile,
  EmailVerification,
  Events,
  Filter,
  FindFedex,
  FollowArtist,
  FollowCommunity,
  ForgotPassword,
  Gallery,
  Home,
  Login,
  OrderDetail,
  OrderHistory,
  PersonalInfo,
  PostAnArt,
  PostsListingOfCollection,
  PrivacyPolicy,
  ResetPassword,
  Sales,
  Search,
  SearchCollection,
  SearchCommunity,
  SearchInterest,
  SearchTabbar,
  SearchVibe,
  Security,
  Setting,
  SignUp,
  Splash,
  TermsAndConditions,
  UserFollowing,
  UserProfile,
  UserPublicProfile,
  Wallet,
  Welcome,
  YourInterest,
  YourVibe,
  SinglePostContainer,
  CommunityListingTab,
  ArtistCommunitiesListing,
  CommunityDetails,
  Stripe,
  BeAnArtistOnboarding,
  PersonalInfoArtist,
  EditComment,
  PinCollectionListing,
  PostsListing,
  Notification,
  MyBank,
  AddBank,
  SellableArtsListing,
  EventDetails,
  SeeMoreEventDetails,
  EventsWebView,
  SeeMoreDrops,
  ProfileTab,
  VisitedProfile,
  OrderTracking,
  SelectPercelTemple,
  CommunitiesMasonryListTab,
  WebViewContainer,
  CropImagePicker,
  CommunityEdit,
} from '../containers';
import {Colors} from '../theme';
import styles from './styles';
import {BASE_URL} from '../config/WebService';

function onBackPress() {
  // screen from which back press should be navigated to dashboard
  if (_.includes(navigateToDashboard, Actions.currentScene)) {
    Actions.reset('dashboard');
    return true;
  }
  if (Actions.state.index === 0) {
    return false;
  }
  Actions.pop();
  return true;
}
const mixpanel = new Mixpanel(mixpanelKey);
mixpanel.init().then(() => {});
mixpanel.setLoggingEnabled(true);
const navigator = Actions.create(
  <Stack
    key="root"
    titleStyle={styles.title}
    headerStyle={styles.header}
    navigationBarStyle={{backgroundColor: Colors.background.primary}}>
    <Scene key="splash" component={Splash} initial hideNavBar />
    <Scene key="login" component={Login} hideNavBar />
    <Scene key="welcome" component={Welcome} hideNavBar />
    <Scene key="signUp" component={SignUp} hideNavBar />
    <Scene key="setting" component={Setting} hideNavBar />
    <Scene key="forgotPassword" component={ForgotPassword} hideNavBar />
    <Scene key="resetPassword" component={ResetPassword} hideNavBar />
    <Scene key="personalInfo" component={PersonalInfo} hideNavBar />
    <Scene key="emailVerification" component={EmailVerification} hideNavBar />

    <Scene
      key="selectPercelTemple"
      component={SelectPercelTemple}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('selectPercelTemple');
      }}
    />
    <Scene
      key="communityDetailsWithoutTabbar"
      component={CommunityDetails}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('communityDetailsWithoutTabbar');
      }}
    />
    <Scene
      key="notification"
      onEnter={() => {
        mixpanel.track('Visit', {PageName: 'Notification'});
      }}
      component={Notification}
      hideNavBar
    />
    <Scene
      key="editProfileLogin"
      component={EditProfile}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('editProfile');
      }}
    />

    <Scene
      key="beAnArtistOnboarding"
      component={BeAnArtistOnboarding}
      hideNavBar
    />
    <Scene key="personalInfoArtist" component={PersonalInfoArtist} hideNavBar />
    <Scene
      key="gallery"
      component={Gallery}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('gallery');
      }}
    />
    <Scene
      key="cropImagePicker"
      component={CropImagePicker}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('cropImagePicker');
      }}
    />
    <Scene
      key="pinCollectionListingwithoutTabs"
      component={PinCollectionListing}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('pinCollectionListing');
      }}
    />
    <Scene key="chooseYourInterest" component={ChooseYourInterest} hideNavBar />
    <Scene
      key="chooseYourVibe"
      component={ChooseYourVibe}
      hideNavBar
      panHandlers={null}
    />
    <Scene
      key="followArtist"
      component={FollowArtist}
      hideNavBar
      onEnter={() => setSelectedActionName('followArtist')}
    />
    <Scene
      key="followCommunity"
      component={FollowCommunity}
      hideNavBar
      onEnter={() => setSelectedActionName('followCommunity')}
    />
    <Scene
      key="collection"
      component={Collection}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('collection');
      }}
    />
    <Scene
      key="events"
      component={Events}
      hideNavBar
      onEnter={() => setSelectedActionName('events')}
    />
    <Scene
      key="arts"
      component={Arts}
      hideNavBar
      onEnter={() => setSelectedActionName('arts')}
    />
    <Scene
      key="communityOptionsContainer"
      component={CommunityOptionsContainer}
      hideNavBar
      onEnter={() => setSelectedActionName('communityOptionsContainer')}
    />
    <Scene
      key="termsAndConditions"
      component={TermsAndConditions}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('termsAndConditions');
        mixpanel.track('Visit', {PageName: 'Terms And Conditions'});
      }}
    />
    <Scene
      key="privacyPolicy"
      component={PrivacyPolicy}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('privacyPolicy');
        mixpanel.track('Visit', {PageName: 'Privacy Policy'});
      }}
    />
    <Scene
      key="security"
      component={Security}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('security');
      }}
    />
    <Scene
      key="address"
      component={Address}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('address');
        mixpanel.track('Visit', {PageName: 'Address'});
      }}
    />
    <Scene
      key="yourVibe"
      component={YourVibe}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('yourVibe');
        mixpanel.track('Visit', {PageName: 'Your Vibes'});
      }}
    />
    <Scene
      key="yourInterest"
      component={YourInterest}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('yourInterest');
        mixpanel.track('Visit', {PageName: 'Your Interests'});
      }}
    />
    <Scene
      key="userPublicProfile"
      component={UserPublicProfile}
      hideNavBar
      onEnter={() => setSelectedActionName('userPublicProfile')}
    />
    <Scene
      key="wallet"
      component={Wallet}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('wallet');
      }}
    />
    <Scene
      key="findFedex"
      component={FindFedex}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('findFedex');
        mixpanel.track('Visit', {PageName: 'Find fedex'});
      }}
    />
    <Scene
      key="sales"
      component={Sales}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('sales');
      }}
    />
    <Scene
      key="artistOrderStatus"
      component={ArtistOrderStatus}
      hideNavBar
      onEnter={() => setSelectedActionName('artistOrderStatus')}
    />
    <Scene
      key="artistFollowing"
      component={ArtistFollowing}
      hideNavBar
      onEnter={() => setSelectedActionName('artistFollowing')}
    />
    <Scene
      key="artistFollowers"
      component={ArtistFollowers}
      hideNavBar
      onEnter={() => setSelectedActionName('artistFollowers')}
    />
    <Scene
      key="createCollection"
      component={CreateCollection}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('createCollection');
      }}
    />
    <Scene
      key="postAnArt"
      component={PostAnArt}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('postAnArt');
      }}
    />
    <Scene
      key="search"
      component={Search}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('search');
      }}
    />
    <Scene
      key="orderDetail"
      component={OrderDetail}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('orderDetail');
      }}
    />

    <Scene
      key="userProfile"
      component={UserProfile}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('userProfile');
      }}
    />
    <Scene
      key="becomeAnArtistForm"
      component={BecomeAnArtistForm}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('becomeAnArtistForm');
      }}
    />
    <Scene
      key="searchVibe"
      component={SearchVibe}
      hideNavBar
      onEnter={() => setSelectedActionName('searchVibe')}
    />
    <Scene
      key="searchCollection"
      component={SearchCollection}
      hideNavBar
      onEnter={() => setSelectedActionName('searchCollection')}
    />
    <Scene
      key="artistProfileWithoutTabs"
      component={VisitedProfile}
      hideNavBar
      onEnter={() => setSelectedActionName('visitedProfile')}
    />
    <Scene
      key="visitedProfileWithoutTabs"
      component={VisitedProfile}
      hideNavBar
      onEnter={() => setSelectedActionName('visitedProfile')}
    />
    <Scene
      key="editComment"
      component={EditComment}
      hideNavBar
      onEnter={() => setSelectedActionName('editComment')}
    />
    <Scene
      key="filter"
      component={Filter}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('filter');
      }}
    />
    <Scene
      key="singlePostContainerWithoutTabs"
      component={SinglePostContainer}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('singlePostContainer');
      }}
    />
    <Scene
      key="singlePostContainer"
      component={SinglePostContainer}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('singlePostContainer');
      }}
    />
    <Scene
      key="postsListingOfCollection"
      component={PostsListingOfCollection}
      hideNavBar
      onEnter={() => {
        setSelectedActionName('postsListingOfCollection');
      }}
    />

    <Tabs
      key="dashboard"
      swipeEnabled={false}
      tabBarPosition="bottom"
      hideNavBar
      tabBarComponent={() => <Tabbar />}>
      <Stack key={MAIN_TABS_DATA.DASHBOARD_TAB.key}>
        <Scene
          key="_dashboard_tab"
          component={Home}
          hideNavBar
          onEnter={() => {
            setSelectedTabId(MAIN_TABS_DATA.DASHBOARD_TAB.id);
            setSelectedActionName('_dashboard_tab');
            mixpanel.track('Visit', {PageName: 'Home'});
          }}
          initial
        />
        <Scene
          key="postAnArtEdit"
          component={PostAnArt}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('postAnArt');
          }}
        />
        <Scene
          key="selectPercelTemple"
          component={SelectPercelTemple}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('selectPercelTemple');
          }}
        />
        <Scene
          key="searchVibe"
          component={SearchVibe}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('searchVibe');
          }}
        />
        <Scene
          key="searchCollection"
          component={SearchCollection}
          hideNavBar
          onEnter={() => setSelectedActionName('searchCollection')}
        />
        <Scene
          key="stripe"
          component={Stripe}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('stripe');
          }}
        />
        <Scene
          key="artistProfile"
          component={ArtistProfile}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('artistProfile');
          }}
        />
        <Scene
          key="visitedProfile"
          component={VisitedProfile}
          hideNavBar
          onEnter={() => setSelectedActionName('visitedProfile')}
        />
        <Scene
          key="artistFollowing"
          component={ArtistFollowing}
          hideNavBar
          onEnter={() => setSelectedActionName('artistFollowing')}
        />
        <Scene
          key="artistFollowers"
          component={ArtistFollowers}
          hideNavBar
          onEnter={() => setSelectedActionName('artistFollowers')}
        />
        <Scene
          key="singlePostContainer"
          component={SinglePostContainer}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('singlePostContainer');
          }}
        />
        <Scene
          key="singlePostContainerDeepLinking"
          component={SinglePostContainer}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('singlePostContainer');
          }}
        />
        <Scene
          key="sellableArtsListing"
          component={SellableArtsListing}
          hideNavBar
          onEnter={() => setSelectedActionName('sellableArtsListing')}
        />

        <Scene
          key="comment"
          component={Comment}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('comment');
          }}
        />
        <Scene
          key="postsListingOfCollection"
          component={PostsListingOfCollection}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('postsListingOfCollection');
          }}
        />
        <Scene
          key="pinCollectionListing"
          component={PinCollectionListing}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('pinCollectionListing');
          }}
        />
        <Scene
          key="cart"
          component={Cart}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('cart');
            mixpanel.track('Visit', {PageName: 'Cart'});
          }}
        />
        <Scene
          key="cartCheckout"
          component={CartCheckout}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('cartCheckout');
            mixpanel.track('Visit', {PageName: 'Cart Check out'});
          }}
        />
        <Scene
          key="cartConfirmation"
          component={CartConfirmation}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('cartConfirmation');
            mixpanel.track('Visit', {PageName: 'Cart Confirmation'});
          }}
        />
        <Scene
          key="orderHistory"
          component={OrderHistory}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('orderHistory');
          }}
        />
        <Scene
          key="orderDetail"
          component={OrderDetail}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('orderDetail');
          }}
        />
        <Scene
          key="address"
          component={Address}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('address');
            mixpanel.track('Visit', {PageName: 'Address'});
          }}
        />
      </Stack>
      <Stack key={MAIN_TABS_DATA.SEARCH_TAB.key}>
        <Scene
          key="_search_tab"
          component={SearchTabbar}
          hideNavBar
          onEnter={() => {
            setSelectedTabId(MAIN_TABS_DATA.SEARCH_TAB.id);
            setSelectedActionName('_search_tab');
          }}
        />
        <Scene
          key="artistProfile"
          component={ArtistProfile}
          hideNavBar
          onEnter={() => setSelectedActionName('artistProfile')}
        />
        <Scene
          key="visitedProfile"
          component={VisitedProfile}
          hideNavBar
          onEnter={() => setSelectedActionName('visitedProfile')}
        />
        <Scene
          key="postsListingAsPerVibes"
          component={PostsListing}
          hideNavBar
          onEnter={() => setSelectedActionName('postsListingAsPerVibes')}
        />
        <Scene
          key="userProfile"
          component={UserProfile}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('userProfile');
          }}
        />
        <Scene
          key="artistFollowing"
          component={ArtistFollowing}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('artistFollowing');
          }}
        />
        <Scene
          key="artistFollowers"
          component={ArtistFollowers}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('artistFollowers');
          }}
        />
        <Scene
          key="singlePostContainer"
          component={SinglePostContainer}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('singlePostContainer');
          }}
        />
        <Scene
          key="sellableArtsListing"
          component={SellableArtsListing}
          hideNavBar
          onEnter={() => setSelectedActionName('sellableArtsListing')}
        />
        <Scene
          key="comment"
          component={Comment}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('comment');
          }}
        />
        <Scene
          key="postsListingOfCollection"
          component={PostsListingOfCollection}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('postsListingOfCollection');
          }}
        />
        <Scene
          key="pinCollectionListing"
          component={PinCollectionListing}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('pinCollectionListing');
          }}
        />
        <Scene
          key="cart"
          component={Cart}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('cart');
            mixpanel.track('Visit', {PageName: 'Cart'});
          }}
        />
        <Scene
          key="cartCheckout"
          component={CartCheckout}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('cartCheckout');
            mixpanel.track('Visit', {PageName: 'cart check out'});
          }}
        />
        <Scene
          key="cartConfirmation"
          component={CartConfirmation}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('cartConfirmation');
            mixpanel.track('Visit', {PageName: 'cart confirmation'});
          }}
        />
        <Scene
          key="orderHistory"
          component={OrderHistory}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('orderHistory');
          }}
        />
        <Scene
          key="orderDetail"
          component={OrderDetail}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('orderDetail');
            mixpanel.track('Visit', {PageName: 'Order Details'});
          }}
        />
        <Scene
          key="address"
          component={Address}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('address');
            mixpanel.track('Visit', {PageName: 'Address'});
          }}
        />
        <Scene
          key="stripe"
          component={Stripe}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('stripe');
          }}
        />
      </Stack>
      <Stack key={MAIN_TABS_DATA.GALLERY_TAB.key}>
        <Scene
          key="_gallery"
          component={Gallery}
          hideNavBar
          initial
          onEnter={() => {
            setSelectedActionName('_gallery');
          }}
        />

        <Scene
          key="postAnArt"
          component={PostAnArt}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('postAnArt');
          }}
        />

        <Scene
          key="selectPercelTemple"
          component={SelectPercelTemple}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('selectPercelTemple');
          }}
        />
        <Scene
          key="searchVibe"
          component={SearchVibe}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('searchVibe');
          }}
        />
        <Scene
          key="searchCollection"
          component={SearchCollection}
          hideNavBar
          onEnter={() => setSelectedActionName('searchCollection')}
        />
      </Stack>
      <Stack key={MAIN_TABS_DATA.COMMUNITY_TAB.key}>
        <Scene
          key="_communityListingTab"
          //component={CommunityListingTab}
          component={CommunitiesMasonryListTab}
          hideNavBar
          onEnter={() => {
            setSelectedTabId(MAIN_TABS_DATA.COMMUNITY_TAB.id);
            setSelectedActionName('communityListingTab');
          }}
          initial
        />
        <Scene
          key="cart"
          component={Cart}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('cart');
            mixpanel.track('Visit', {PageName: 'Cart'});
          }}
        />
        <Scene
          key="seeMoreEventDetails"
          component={SeeMoreEventDetails}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('seeMoreEventDetails');
            mixpanel.track('Visit', {PageName: 'Event Screen'});
          }}
        />
        <Scene
          key="seeMoreDrops"
          component={SeeMoreDrops}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('SeeMoreDrops');
            mixpanel.track('Visit', {PageName: 'Drops Screen'});
          }}
        />
        <Scene
          key="cartCheckout"
          component={CartCheckout}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('cartCheckout');
            mixpanel.track('Visit', {PageName: 'Cart Check Out'});
          }}
        />
        <Scene
          key="cartConfirmation"
          component={CartConfirmation}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('cartConfirmation');
            mixpanel.track('Visit', {PageName: 'cart confirmation'});
          }}
        />
        <Scene
          key="eventDetails"
          component={EventDetails}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('eventDetails');
          }}
        />
        <Scene
          key="eventsWebView"
          component={EventsWebView}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('eventsWebView');
          }}
        />

        <Scene
          key="orderHistory"
          component={OrderHistory}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('orderHistory');
          }}
        />
        <Scene
          key="orderDetail"
          component={OrderDetail}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('orderDetail');
            mixpanel.track('Visit', {PageName: 'Order Histroy'});
          }}
        />
        <Scene
          key="address"
          component={Address}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('address');
            mixpanel.track('Visit', {PageName: 'Address'});
          }}
        />
        <Scene
          key="communityDetails"
          component={CommunityDetails}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('CommunityDetails');
          }}
        />
        <Scene
          key="singlePostContainer"
          component={SinglePostContainer}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('singlePostContainer');
          }}
        />
        <Scene
          key="artistProfile"
          component={ArtistProfile}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('artistProfile');
            mixpanel.track('Visit', {PageName: 'Visit user profile'});
          }}
        />
        <Scene
          key="visitedProfile"
          component={VisitedProfile}
          hideNavBar
          onEnter={() => setSelectedActionName('visitedProfile')}
        />
        <Scene
          key="artistFollowing"
          component={ArtistFollowing}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('artistFollowing');
          }}
        />
        <Scene
          key="artistFollowers"
          component={ArtistFollowers}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('artistFollowers');
          }}
        />
        <Scene
          key="pinCollectionListing"
          component={PinCollectionListing}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('pinCollectionListing');
          }}
        />
        <Scene
          key="sellableArtsListing"
          component={SellableArtsListing}
          hideNavBar
          onEnter={() => setSelectedActionName('sellableArtsListing')}
        />
        <Scene
          key="comment"
          component={Comment}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('comment');
          }}
        />
        <Scene
          key="stripe"
          component={Stripe}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('stripe');
          }}
        />
        <Scene
          key="searchCommunity"
          component={SearchCommunity}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('searchCommunity');
            mixpanel.track('Visit', {PageName: 'Search Community'});
          }}
        />
      </Stack>
      <Stack key={MAIN_TABS_DATA.PROFILE_TAB.key}>
        <Scene
          key="_profile_tab"
          component={ProfileTab}
          hideNavBar
          onEnter={() => {
            setSelectedTabId(MAIN_TABS_DATA.PROFILE_TAB.id);
            setSelectedActionName('profile_tab');
          }}
          initial
        />

        <Scene
          key="userProfile"
          component={UserProfile}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('userProfile');
          }}
        />
        <Scene
          key="selectPercelTemple"
          component={SelectPercelTemple}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('selectPercelTemple');
          }}
        />
        <Scene
          key="setting"
          component={Setting}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('setting');
          }}
        />
        <Scene
          key="notification"
          component={Notification}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('notification');
            mixpanel.track('Visit', {PageName: 'Notification'});
          }}
        />
        <Scene
          key="comment"
          component={Comment}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('comment');
          }}
        />
        <Scene
          key="artistProfile"
          component={ArtistProfile}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('artistProfile');
          }}
        />
        <Scene
          key="visitedProfile"
          component={VisitedProfile}
          hideNavBar
          onEnter={() => setSelectedActionName('visitedProfile')}
        />
        <Scene
          key="becomeAnArtistForm"
          component={BecomeAnArtistForm}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('becomeAnArtistForm');
            mixpanel.track('Visit', {PageName: 'Become An Artist'});
          }}
        />
        <Scene
          key="gallery"
          component={Gallery}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('gallery');
          }}
        />
        <Scene
          key="cropImagePicker"
          component={CropImagePicker}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('cropImagePicker');
          }}
        />

        <Scene
          key="searchCollection"
          component={SearchCollection}
          hideNavBar
          onEnter={() => setSelectedActionName('searchCollection')}
        />
        <Scene
          key="search"
          component={Search}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('search');
          }}
        />
        <Scene
          key="editProfile"
          component={EditProfile}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('editProfile');
          }}
        />
        <Scene
          key="termsAndConditions"
          component={TermsAndConditions}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('termsAndConditions');
            mixpanel.track('Visit', {PageName: 'Terms And Conditon'});
          }}
        />
        <Scene
          key="privacyPolicy"
          component={PrivacyPolicy}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('privacyPolicy');
            mixpanel.track('Visit', {PageName: 'Privacy Policy'});
          }}
        />
        <Scene
          key="security"
          component={Security}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('security');
          }}
        />
        <Scene
          key="changeNumberVerification"
          component={ChangeNumberVerification}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('changeNumberVerification');
          }}
        />
        <Scene
          key="changeNumber"
          component={ChangeNumber}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('changeNumber');
            mixpanel.track('Visit', {PageName: 'Change number'});
          }}
        />
        <Scene
          key="address"
          component={Address}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('address');
            mixpanel.track('Visit', {PageName: 'Address'});
          }}
        />
        <Scene
          key="yourVibe"
          component={YourVibe}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('yourVibe');
            mixpanel.track('Visit', {PageName: 'Your Vibes'});
          }}
        />
        <Scene
          key="yourInterest"
          component={YourInterest}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('yourInterest');
            mixpanel.track('Visit', {PageName: 'Your Interests'});
          }}
        />
        <Scene
          key="wallet"
          component={Wallet}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('wallet');
          }}
        />
        <Scene
          key="artistFollowing"
          component={ArtistFollowing}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('artistFollowing');
          }}
        />
        <Scene
          key="artistFollowers"
          component={ArtistFollowers}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('artistFollowers');
          }}
        />
        <Scene
          key="createCollection"
          component={CreateCollection}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('createCollection');
          }}
        />
        <Scene
          key="orderDetail"
          component={OrderDetail}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('orderDetail');
          }}
        />
        <Scene
          key="webViewContainer"
          component={WebViewContainer}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('webViewContainer');
          }}
        />
        <Scene
          key="search"
          component={Search}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('search');
          }}
        />
        <Scene
          key="searchVibe"
          component={SearchVibe}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('searchVibe');
          }}
        />
        <Scene
          key="searchInterest"
          component={SearchInterest}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('searchInterest');
          }}
        />
        <Scene
          key="searchCommunity"
          component={SearchCommunity}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('searchCommunity');
          }}
        />
        <Scene
          key="sales"
          component={Sales}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('sales');
          }}
        />
        <Scene
          key="postsListingOfCollection"
          component={PostsListingOfCollection}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('postsListingOfCollection');
          }}
        />
        <Scene
          key="pinCollectionListing"
          component={PinCollectionListing}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('pinCollectionListing');
          }}
        />
        <Scene
          key="singlePostContainer"
          component={SinglePostContainer}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('singlePostContainer');
          }}
        />
        <Scene
          key="sellableArtsListing"
          component={SellableArtsListing}
          hideNavBar
          onEnter={() => setSelectedActionName('sellableArtsListing')}
        />
        <Scene
          key="postAnArtEdit"
          component={PostAnArt}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('postAnArt');
          }}
        />
        <Scene
          key="artistPreferences"
          component={ArtistPreferences}
          hideNavBar
          onEnter={() => setSelectedActionName('artistPreferences')}
        />
        <Scene
          key="artistCommunitiesListing"
          component={ArtistCommunitiesListing}
          hideNavBar
          onEnter={() => setSelectedActionName('artistCommunitiesListing')}
        />
        <Scene
          key="communityDetails"
          component={CommunityDetails}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('CommunityDetails');
          }}
        />
        <Scene
          key="communityDetails"
          component={CommunityDetails}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('CommunityDetails');
          }}
        />
        <Scene
          key="orderHistory"
          component={OrderHistory}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('orderHistory');
          }}
        />
        <Scene
          key="stripe"
          component={Stripe}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('stripe');
          }}
        />
        <Scene
          key="cart"
          component={Cart}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('cart');
            mixpanel.track('Visit', {PageName: 'Cart'});
          }}
        />
        <Scene
          key="cartCheckout"
          component={CartCheckout}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('cartCheckout');
            mixpanel.track('Visit', {PageName: 'cart check out'});
          }}
        />
        <Scene
          key="cartConfirmation"
          component={CartConfirmation}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('cartConfirmation');
            mixpanel.track('Visit', {PageName: 'Cart Confirmation'});
          }}
        />
        <Scene
          key="orderHistory"
          component={OrderHistory}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('orderHistory');
          }}
        />
        <Scene
          key="artistOrderStatus"
          component={ArtistOrderStatus}
          hideNavBar
          onEnter={() => setSelectedActionName('artistOrderStatus')}
        />
        <Scene
          key="orderDetail"
          component={OrderDetail}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('orderDetail');
          }}
        />
        <Scene
          key="postAnArtEdit"
          component={PostAnArt}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('postAnArt');
          }}
        />
        <Scene
          key="myBank"
          component={MyBank}
          hideNavBar
          onEnter={() => setSelectedActionName('myBank')}
        />
        <Scene
          key="addBank"
          component={AddBank}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('addBank');
            mixpanel.track('Visit', {PageName: 'Add Bank'});
          }}
        />
        <Scene
          key="communityEdit"
          component={CommunityEdit}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('communityEdit');
          }}
        />
        <Scene
          key="orderTracking"
          component={OrderTracking}
          hideNavBar
          onEnter={() => {
            setSelectedActionName('orderTracking');
          }}
        />
      </Stack>
    </Tabs>
  </Stack>,
);

export default () => {
  const linking = {
    prefixes: [BASE_URL, 'ahaapp://'],
  };
  return (
    <AppNavigator
      linking={linking}
      fallback={() => <Text>Loading...</Text>}
      uriPrefix={'ahaapp'}
      navigator={navigator}
      backAndroidHandler={onBackPress}
      sceneStyle={{backgroundColor: Colors.background.primary}}
    />
  );
};

const AppNavigator = connect()(Router);
