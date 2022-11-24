import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {privacyPolicyRequest} from '../../actions/contentPageAction';
import {CustomNavbar, HtmlRender, Loader} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Colors} from '../../theme';
import styles from './Styles';

function PrivacyPolicy(props) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(
      privacyPolicyRequest(res => {
        if (res) {
          setLoading(false);
        }
      }),
    );
  }, []);

  const nav = useMemo(
    () => (
      <CustomNavbar
        title={strings.PRIVACY_POLICY}
        hasBack
        titleStyle={AppStyles.titleStyleForLeft}
        leftRightButtonWrapperStyle={{justifyContent: 'center'}}
      />
    ),
    [],
  );

  const {privacy_policy} = props;
  return (
    <View style={styles.mainCont}>
      {nav}
      {isLoading && (
        <View style={styles.loader}>
          <Loader loading={isLoading} />
        </View>
      )}
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {!isLoading && (
          <HtmlRender
            html={privacy_policy}
            pStyle={styles.pStyle}
            hStyle={styles.hStyle}
          />
        )}
      </ScrollView>
    </View>
  );
}

PrivacyPolicy.propTypes = {};
PrivacyPolicy.defaultProps = {};
const mapStateToProps = ({contentPage}) => ({
  privacy_policy: contentPage.privacy_policy,
});

const actions = {};

export default connect(mapStateToProps, actions)(PrivacyPolicy);
