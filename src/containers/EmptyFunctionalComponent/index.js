// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Text } from '../';

const EmptyFunctionalComponent = props => {
  return <Text>Funtional</Text>;
};

EmptyFunctionalComponent.propTypes = {};
EmptyFunctionalComponent.defaultProps = {};

const mapStateToProps = ({general}) => ({});
export default connect(mapStateToProps, null)(EmptyFunctionalComponent);
