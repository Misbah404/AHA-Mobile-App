// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    borderColor: '#AFA3A3',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 27,
    width: 300,
    height: 200,
    resizeMode: 'stretch',
  },
  headingTextStyle: {
    fontFamily: Fonts.type.Asap,
    fontSize: Fonts.size.large,
    color: Colors.text.primary,
    fontWeight: 'bold',
    paddingTop: 10,
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
  checkIcon: {
    height: 12,
    width: 15,
    position: 'absolute',
    right: 15,
  },
  saveBtn: {
    color: Colors.white,
    fontSize: Fonts.size.large,
    fontFamily: Fonts.type.Asap,
    fontWeight: 'bold',
    marginTop: 15,
  },
  loaderStyle: {
    width: 30,
    marginTop: 15,
  },
});
