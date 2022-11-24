import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect, useDispatch } from 'react-redux';
import {
  followUnFollowCommunityRequest,
  getCommunitiesListAfterClickOnButtonSuccess,
  getCommunitiesListRequest
} from '../../actions/communityActions';
import { ArtistAndCommunityItem, CustomNavbar, Loader } from '../../components';
import OnBoardingBottomButtons from '../../components/OnBoardingBottomButtons';
import { strings } from '../../constants';
import styles from './Styles';

function FollowCommunity(props) {
  const [isFetchingDataFromApi, setIsFetchingDataFromApi] = useState(
    () => true,
  );
  const dispatch = useDispatch();
  
  const {communityList} = props;

  useEffect(() => {
    dispatch(
      getCommunitiesListRequest({}, res => {
        setIsFetchingDataFromApi(false);
      }),
    );
  }, []);

  const followButtonPressHandler = item => {
    const {id, is_following} = item || {};
    const payload = {
      community_id: id,
      follow: !is_following,
    };
    dispatch(getCommunitiesListAfterClickOnButtonSuccess(id));
    dispatch(followUnFollowCommunityRequest(payload, res => {}));
  };

  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBack={true}
        title={strings.FOLLOW_COMMUNITY}
        titleStyle={styles.title}
        subTitle={strings.FIND_YOUR_COMMUNITY}
        shouldShowHorizontalBar={true}
        style={{backgroundColor: 'transparent'}}
      />
      {isFetchingDataFromApi ? (
        <Loader loading={isFetchingDataFromApi} />
      ) : (
        <>
          <View style={styles.flatListCont}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={communityList}
              keyExtractor={(_, index) => index}
              renderItem={({item, index}) => (
                <ArtistAndCommunityItem
                  _item={item}
                  followButtonPressHandler={followButtonPressHandler}
                  _onItemPress={() =>
                    Actions.communityOptionsContainer({
                      index: 0,
                      communityName: item?.profile_name ?? '',
                    })
                  }
                />
              )}
            />
          </View>
          <OnBoardingBottomButtons
            onNextBtnPress={() => {
              setTimeout(() => {
                Actions.reset('dashboard');
              }, 100);
            }}
          />
        </>
      )}
    </View>
  );
}
const mapStateToProps = ({community}) => ({
  communityList: community.communitiesList,
});
FollowCommunity.propTypes = {};
FollowCommunity.defaultProps = {};

const actions = {};

export default connect(mapStateToProps, actions)(FollowCommunity);
