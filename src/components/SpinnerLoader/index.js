// @flow
import PropTypes from 'prop-types';
import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

const SpinnerLoader = props => {
  const {_loading} = props;
  return (
    <Spinner
      visible={_loading}
      color={'#5D3FD3'}
      size={'large'}
      cancelable={true}
      overlayColor="rgba(1, 1, 1, 0.85)"
      textStyle={{color: 'white', fontWeight: '600'}}
    />
  );
};

SpinnerLoader.propTypes = {
  _loading: PropTypes.bool.isRequired,
};
SpinnerLoader.defaultProps = {};

export default SpinnerLoader;
