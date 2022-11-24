// @flow
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Images} from '../../theme';
import styles from './styles';

class Welcome extends Component {
  static propTypes = {
    userData: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const {userData} = this.props;
    if (!_.isEmpty(userData) && !_.isEmpty(userData.access_token)) {
      Actions.reset('dashboard');
    } else {
      Actions.reset('login');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={Images.logo} style={styles.image} />
        {/* <DoubleBounce size={15} color={Colors.blue2} /> */}
      </View>
    );
  }
}

const mapStateToProps = ({user}) => ({
  userData: user.data,
});

const actions = {};

export default connect(mapStateToProps, actions)(Welcome);
