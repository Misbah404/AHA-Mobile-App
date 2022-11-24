import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {Text} from '../../components';
import styles from './CalendarStyles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function CalendarView(props) {
  const {handleConfirm, hideDatePicker, isDatePickerVisible, mode} = props;

  return (
    <DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode={mode}
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
      maximumDate={new Date()}
    />
  );
}
