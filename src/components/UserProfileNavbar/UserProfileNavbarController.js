import React from 'react';
import { connect } from 'react-redux';
import UserProfileNavbarView from './UserProfileNavbarView';

function UserProfileNavbarController(props) {
  return <UserProfileNavbarView {...this.props} />;
}

UserProfileNavbarController.propTypes = {};
UserProfileNavbarController.defaultProps = {};

const mapStateToProps = ({general}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(UserProfileNavbarController);
