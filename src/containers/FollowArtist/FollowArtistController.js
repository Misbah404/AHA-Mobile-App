import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import _ from 'lodash';
import FollowArtistView from './FollowArtistView';
import {getArtistsListRequest} from '../../actions/artistActions';

function FollowArtistController(props) {
  const {artistsList} = props;
  const [] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getArtistsListRequest(res => {
        if (res) {
        }
      }),
    );
  }, []);

  const followButtonPressHandler = item => {
    const {id} = item;
    const payload = {
      artist_id: id,
      follow: !item.isFollowing,
    };
  };

  return (
    <FollowArtistView
      {...props}
      artistsList={artistsList}
      followButtonPressHandler={followButtonPressHandler}
    />
  );
}
FollowArtistController.propTypes = {};
FollowArtistController.defaultProps = {};

const mapStateToProps = ({artist}) => ({
  artistsList: artist.artistsList,
});

const actions = {};

export default connect(mapStateToProps, actions)(FollowArtistController);
