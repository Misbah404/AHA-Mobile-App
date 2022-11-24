import React, {useState} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ArtsView from './ArtsView';

function ArtsController(props) {
  return <ArtsView {...props} />;
}
ArtsController.propTypes = {fromCommunity: PropTypes.bool};
ArtsController.defaultProps = {fromCommunity: false};

const mapStateToProps = ({general}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ArtsController);
