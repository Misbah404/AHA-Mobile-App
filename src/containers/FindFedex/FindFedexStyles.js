import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    paddingHorizontal: 25,
  },

  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(143, 146, 161,0.2)',
    paddingBottom: 20,
  },

  title: {
    color: Colors.text.white,
    fontSize: 17,
    fontFamily: Fonts.type.bold,
  },

  description: {
    color: Colors.text.white,
    fontSize: 15,
    marginTop: 2,
    flex: 1,
  },

  icon: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
