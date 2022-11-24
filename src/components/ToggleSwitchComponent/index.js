// @flow
import React from 'react';
import PropTypes from 'prop-types';
import ToggleSwitch from 'toggle-switch-react-native';
import {Colors} from '../../theme';

const ToggleSwitchComponent = props => {
  const {isOn, onTogglePressHandler} = props;
  return (
    <ToggleSwitch
      isOn={isOn}
      onColor={Colors.appColorPurple}
      offColor={Colors.text.white}
      thumbOffStyle={{backgroundColor: Colors.black}}
      thumbOnStyle={{backgroundColor: Colors.black}}
      size="small"
      onToggle={onTogglePressHandler}
    />
  );
};

ToggleSwitchComponent.propTypes = {
  isOn: PropTypes.bool.isRequired,
  onTogglePressHandler: PropTypes.func.isRequired,
};
ToggleSwitchComponent.defaultProps = {};
export default ToggleSwitchComponent;
