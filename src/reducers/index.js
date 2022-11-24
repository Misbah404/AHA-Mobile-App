import {combineReducers} from 'redux';

import navigator from './navigator';
import user from './user';
import general from './general';
import artist from './artist';
import community from './community';
import orderHistory from './orderHistory';
import dashboard from './dashboard';
import interests from './interests';
import vibes from './vibes';
import contentPage from './contentPage';
import collection from './collection';
import post from './post';
import cart from './cart.js';
import creditCard from './creditCard.js';
import wallet from './wallet.js';
import pin from './pin.js';
import comments from './comments.js';
import sales from './sales';
import search from './search';
import notifications from './notifications';
import events from './events';

export default combineReducers({
  route: navigator,
  user,
  events,
  general,
  general,
  pin,
  artist,
  cart,
  community,
  orderHistory,
  dashboard,
  interests,
  vibes,
  contentPage,
  collection,
  post,
  creditCard,
  wallet,
  comments,
  sales,
  search,
  notifications,
});
