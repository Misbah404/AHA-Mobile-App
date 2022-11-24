// @flow
import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
  },

  searchMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  searchView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2B2A2F',
    borderRadius: 12,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 20,
  },

  textInput: {
    flex: 1,
    height: 41,
    paddingLeft: 20,
    color: 'white',
  },

  crossIcon: {
    tintColor: '#8F8E93',
  },

  categoryView: {
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2B2A2F',
    paddingHorizontal: 20,
  },

  categoryTextView: {
    marginRight: 20,
  },

  categoryTextViewSelected: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    paddingBottom: 15,
    marginRight: 20,
  },

  categoryText: {
    fontSize: 14,
    color: '#8F8E93',
  },

  categoryTextSelected: {
    color: Colors.text.white,
    fontSize: 14,
  },
});
