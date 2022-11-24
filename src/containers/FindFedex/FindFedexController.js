import React, {useState} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import FindFedexView from './FindFedexView';

function FindFedexController(props) {
  FindFedexController.propTypes = {};
  FindFedexController.defaultProps = {};

  return <FindFedexView {...this.props} />;
}
const mapStateToProps = ({general}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(FindFedexController);
