import React, {useState} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import EventsView from './EventsView';

function EventsController(props) {
  EventsController.propTypes = {fromCommunity: PropTypes.bool};
  EventsController.defaultProps = {fromCommunity: false};

  return <EventsView {...props} />;
}
const mapStateToProps = ({general}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(EventsController);
