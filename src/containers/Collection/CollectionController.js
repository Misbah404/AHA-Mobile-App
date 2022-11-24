import React, {useState} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import CollectionView from './CollectionView';

function CollectionController(props) {
  CollectionController.propTypes = {fromCommunity: PropTypes.bool};
  CollectionController.defaultProps = {fromCommunity: false};

  return <CollectionView {...props} />;
}
const mapStateToProps = ({general}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(CollectionController);
