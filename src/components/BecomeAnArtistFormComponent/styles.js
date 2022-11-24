// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    paddingVertical: 10,
  },

  title: {
    fontSize: 14,
    color: Colors.text.becomeAnArtist,
  },

  searchView: {
    marginTop: 18,
  },

  searchText: {
    fontSize: 16,
    paddingHorizontal: 5,
  },

  borderLine: {
    borderBottomColor: Colors.border.secondary,
    borderBottomWidth: 1,
    paddingTop: 10,
    opacity: 0.2,
    marginRight: 10,
  },

  selectedItemMainView: {
    marginTop: 5,
  },

  communityView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },

  communityImage: {
    height: 47,
    width: 47,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.white,
    marginRight: 10,
  },

  communityText: {
    marginRight: 20,
    fontSize: 13,
    fontFamily: Fonts.type.bold,
  },

  selectedItemView: {
    backgroundColor: Colors.background.purple,
    width: '45%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 7,
    marginVertical: 10,
  },

  selectedItemText: {
    marginLeft: 12,
    fontSize: 16,
  },

  crossIcon: {
    position: 'absolute',
    right: -5,
    top: -5,
    width: 14,
  },

  crossIconCommunity: {
    position: 'absolute',
    right: 20,
    top: -5,
    width: 14,
  },
});
