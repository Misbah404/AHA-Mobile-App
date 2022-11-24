import React, {useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import _ from 'lodash';
import UserPublicProfileView from './UserPublicProfileView';
import {setSelectedTab} from '../../actions/GeneralActions';
import {
  MAIN_TABS_DATA,
  UserProfileImageCollection,
  UserProfileImagePin,
} from '../../constants';

function UserPublicProfileController(props) {
  const [artViewSelected, setArtViewSelected] = useState(true);
  const [collectionViewSelected, setCollectionViewSelected] = useState(false);
  const [pinViewSelected, setPinViewSelected] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const dispatch = useDispatch();

  UserPublicProfileController.propTypes = {};
  UserPublicProfileController.defaultProps = {};

  handleTabbar = tabbarName => {
    if (tabbarName == 'collection') {
      setCollectionViewSelected(true);
      setPinViewSelected(false);
      setArtViewSelected(false);
    } else if (tabbarName == 'pin') {
      setCollectionViewSelected(false);
      setPinViewSelected(true);
      setArtViewSelected(false);
    } else if (tabbarName == 'art') {
      setCollectionViewSelected(false);
      setPinViewSelected(false);
      setArtViewSelected(true);
    }
  };

  useEffect(() => {
    dispatch(setSelectedTab(MAIN_TABS_DATA.PROFILE_TAB.id));
  }, [showContent]);

  return (
    <UserPublicProfileView
      {...props}
      artViewSelected={artViewSelected}
      setArtViewSelected={setArtViewSelected}
      collectionViewSelected={collectionViewSelected}
      setCollectionViewSelected={setCollectionViewSelected}
      pinViewSelected={pinViewSelected}
      setPinViewSelected={setPinViewSelected}
      handleTabbar={handleTabbar}
      setShowContent={setShowContent}
      showContent={showContent}
    />
  );
}
const mapStateToProps = ({general}) => ({});

const actions = {setSelectedTab};

export default connect(mapStateToProps, actions)(UserPublicProfileController);
