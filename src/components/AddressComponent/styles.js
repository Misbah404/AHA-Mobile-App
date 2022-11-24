// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.darkBlue,
    flexDirection: 'row',
    paddingVertical: 25,
  },

  editForm: {
    backgroundColor: Colors.background.darkBlue,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 10,
  },

  view: {
    flex: 2,
  },

  heading: {
    fontWeight: '500',
    fontSize: Fonts.size.normal,
  },

  textInputView: {
    paddingHorizontal: 5,
  },

  textInputLabel: {
    fontSize: 14,
    color: '#A2A5B8',
  },

  updateBtn: {
    alignSelf: 'flex-end',
    ...AppStyles.mRight5,
    ...AppStyles.marginVerticalBase,
  },
  description: {
    fontWeight: '400',
    fontSize: Fonts.size.xxSmall,
    lineHeight: 18,
  },

  radioBoxMainView: {
    flexDirection: 'row',

    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  radioBoxView: {
    borderColor: Colors.white,
    borderRadius: 50,
    borderWidth: 1,
    height: 20,
    width: 20,
    marginRight: 10,
    ...AppStyles.centerInner,
  },

  radioBox: {
    height: 13,
    width: 13,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: Colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: Colors.black,
  },
  updateText: {
    fontFamily: Fonts.type.bold_italic,
    fontSize: Fonts.size.normal,
  },
  markPickingPointView: {
    paddingVertical: 10,
    // backgroundColor: 'red',
  },
  markPickingPoint: {
    fontFamily: Fonts.type.bold_italic,
    fontSize: Fonts.size.xxxSmall,
    fontWeight: '700',
    marginBottom: 0,
  },
});
