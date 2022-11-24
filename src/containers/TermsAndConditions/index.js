import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {termConditionRequest} from '../../actions/contentPageAction';
import {CustomNavbar, HtmlRender, Loader} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Colors} from '../../theme';
import styles from './Styles';

function TermsAndConditions(props) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(
      termConditionRequest(res => {
        if (res) {
          setLoading(false);
        }
      }),
    );
  }, []);

  const nav = useMemo(
    () => (
      <CustomNavbar
        title={strings.TERMS_AND_CONDITIONS}
        hasBack
        titleStyle={AppStyles.titleStyleForLeft}
        leftRightButtonWrapperStyle={{justifyContent: 'center'}}
      />
    ),
    [],
  );

  const {term_condition} = props;
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
            html={term_condition}
            pStyle={styles.pStyle}
            hStyle={styles.hStyle}
          />
        )}
      </ScrollView>
    </View>
  );
}

TermsAndConditions.propTypes = {};
TermsAndConditions.defaultProps = {};

const mapStateToProps = ({contentPage}) => ({
  term_condition: contentPage.term_condition,
});

const actions = {};

export default connect(mapStateToProps, actions)(TermsAndConditions);
