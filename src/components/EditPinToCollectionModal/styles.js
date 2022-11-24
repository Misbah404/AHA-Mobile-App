// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    borderColor: '#AFA3A3',
    borderRadius: 27,
    alignSelf: 'center',
    justifyContent: 'center',
    width: 340,
    height: 310,
  },
  headingTextStyle: {
    fontFamily: Fonts.type.Asap,
    fontSize: Fonts.size.large,
    color: Colors.text.primary,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  inputTextStyleAndroid: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,

    color: Colors.white,
  },
  inputTextStyleIos: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    color: Colors.white,
    height: 30,
    marginTop: 10,
  },
  btnRowView: {
    flexDirection: 'row',
    flexGrow: 1,
    marginTop: 20,
  },
  btn: {
    flex: 0.5,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 5,
    flexDirection: 'row',
    backgroundColor: Colors.text.darkMode,
  },
  btnTxt: {
    fontFamily: Fonts.type.Asap,
    fontSize: Fonts.size.small,
    alignSelf: 'center',
    color: Colors.text.disable,
  },
  checkIcon: {height: 12, width: 15, position: 'absolute', right: 15},
  saveBtn: {
    color: Colors.white,
    fontSize: Fonts.size.large,
    fontFamily: Fonts.type.Asap,
    fontWeight: 'bold',
  },
});
