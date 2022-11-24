import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import BottomSheet from 'react-native-bottomsheet';
import {connect} from 'react-redux';

const ActionBottomSheet = props => {
  const {textOptions, valuesCallback, cancelBtnAction} = props;
  return (
    <View>
      {BottomSheet.showBottomSheetWithOptions(
        {
          options: textOptions,
          dark: false,
          cancelButtonIndex: textOptions.length - 1,
          failureCallback: cancelBtnAction(),
        },
        valuesCallback,
      )}
    </View>
  );
};

ActionBottomSheet.propTypes = {
  textOptions: PropTypes.array,
  valuesCallback: PropTypes.func,
  cancelBtnAction: PropTypes.func,
};

ActionBottomSheet.defaultProps = {
  textOptions: [],
  valuesCallback: Function(),
  cancelBtnAction: Function(),
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ActionBottomSheet);
