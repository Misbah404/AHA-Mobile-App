import {Mixpanel} from 'mixpanel-react-native';
const mixpanel1 = new Mixpanel('8f7936a83ac612241e9736b68212e266');
mixpanel1.init();
mixpanel1.setLoggingEnabled(true);
export const mixpanel = mixpanel1;
