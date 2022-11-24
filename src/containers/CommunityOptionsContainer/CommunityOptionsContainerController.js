import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import CommunityOptionsContainerView from './CommunityOptionsContainerView';

function CommunityOptionsContainerController(props) {
  CommunityOptionsContainerController.propTypes = {
    index: PropTypes.number.isRequired,
    communityName: PropTypes.bool,
  };
  CommunityOptionsContainerController.defaultProps = {
    communityName: 'Get inspired with Community',
  };

  return <CommunityOptionsContainerView {...props} />;
}
const mapStateToProps = ({general}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(CommunityOptionsContainerController);
