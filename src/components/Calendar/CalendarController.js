import React from 'react';
import PropTypes from 'prop-types';
import CalendarView from './CalendarView';
import {connect} from 'react-redux';

class CalendarController extends React.Component {
  constructor() {
    super();
    this.state = {
      isDatePickerVisible: true,
    };
  }

  static propTypes = {
    setValue: PropTypes.func,
    setSelectedDropDownValue: PropTypes.func,
    mode: PropTypes.string,
  };
  static defaultProps = {setValue: () => {}, mode: 'datetime'};

  showDatePicker = () => {
    this.setState({
      isDatePickerVisible: true,
    });
  };

  hideDatePicker = () => {
    const {setValue} = this.props;
    this.setState({
      isDatePickerVisible: false,
    });
    setValue({openCalender: false});
  };

  handleConfirm = date => {
    this.props.setSelectedDropDownValue(date);
    this.hideDatePicker();
  };

  render() {
    return (
      <CalendarView
        handleConfirm={this.handleConfirm}
        hideDatePicker={this.hideDatePicker}
        isDatePickerVisible={this.state.isDatePickerVisible}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(CalendarController);
