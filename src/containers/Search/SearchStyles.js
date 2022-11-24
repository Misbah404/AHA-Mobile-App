import {Platform, StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    paddingHorizontal: 25,
  },

  textInputView: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 5,
  },

  icon: {
    marginBottom: Platform.OS === 'ios' ? 20 : 11,
  },

  textInput: {
    paddingHorizontal: 15,
    flex: 1,
    color: Colors.text.white,
    paddingBottom: Platform.OS === 'ios' ? 20 : 11,
  },

  navbarText: {
    textAlign: 'center',
    flex: 1,
  },

  buttonView: {
    ...AppStyles.centerInner,
    marginVertical: 20,
  },

  button: {
    backgroundColor: Colors.background.purple,
    paddingHorizontal: 40,
    paddingVertical: 12,
    color: Colors.text.white,
    fontFamily: Fonts.type.bold_italic,
    fontSize: 16,
    borderRadius: 4,
  },

  defualtDataText: {
    color: Colors.text.white,
    fontSize: 16,
    marginVertical: 10,
    paddingHorizontal: 10,
  },

  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
});
