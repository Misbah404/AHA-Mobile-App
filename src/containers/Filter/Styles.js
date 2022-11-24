import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    flex: 1,
  },
  view: {
    paddingHorizontal: 25,
    marginTop: 20,
  },
  addressTextInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#2d3945',
    fontSize: 16,
    color: Colors.text.white,
  },
  addressText: {
    color: Colors.text.becomeAnArtist,
    fontSize: 14,
  },
  buttonMainView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonView: {
    alignItems: 'center',
  },
  buttonText: {
    backgroundColor: Colors.background.purple,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 4,
    color: Colors.text.white,
    fontFamily: Fonts.type.bold_italic,
    fontSize: 17,
  },
  bottomBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    position: 'absolute',
    alignSelf: 'center',
  },
  resetBtnText: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.background.purple,
    borderWidth: 1.5,
    marginRight: 5,
  },
  searchBtnText: {
    borderColor: Colors.transparent,
    borderWidth: 1.5,
    borderRadius: 4,
    overflow: 'hidden',
  },
});
