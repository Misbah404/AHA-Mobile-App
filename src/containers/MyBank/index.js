// @flow
import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {connect, useDispatch} from 'react-redux';
import {deleteBankAccountRequest} from '../../actions/walletActions';
import {CustomNavbar} from '../../components';
import AddNewBank from '../../components/AddNewBank';
import DeleteOrRemoveModal from '../../components/DeleteOrRemoveModal';
import {strings} from '../../constants';
import {AppStyles, Colors, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

const MyBank = props => {
  const {_bankAccounts} = props;
  const [isModalVisible, setModalVisibility] = useState(() => false);
  const [isSendingDataToServer, setIsSendingDataToServer] = useState(
    () => false,
  );
  const dispatch = useDispatch();

  const removeListItem = () => {
    setModalVisibility(false);
    setIsSendingDataToServer(true);
    dispatch(
      deleteBankAccountRequest({}, () => {
        setIsSendingDataToServer(false);
      }),
    );
  };

  const renderCustomNavBar = () => (
    <CustomNavbar
      title={strings.MY_BANK}
      titleStyle={AppStyles.titleStyleForLeft}
      hasBack
    />
  );

  const renderMyBankAccountList = () => (
    <SwipeListView
      data={_bankAccounts}
      showsVerticalScrollIndicator={false}
      renderItem={renderListItem}
      renderHiddenItem={renderDeleteItemView}
      rightOpenValue={-85}
      stopRightSwipe={-85}
      leftOpenValue={0}
      disableRightSwipe={true}
      style={AppStyles.marginVerticalBase}
    />
  );

  const renderListItem = ({item}) => (
    <View style={styles.rowItemCont}>
      <Image
        source={Images.bankAccountIcon}
        style={{resizeMode: 'contain', height: 50, width: 50}}
      />
      <View style={styles.accountDetailsTextCont}>
        <Text style={styles.bankName}>{item?.bank_name ?? 'N/A'}</Text>
      </View>
      <Image source={Images.rightArrowIcon} style={styles.rightIcon} />
    </View>
  );

  const renderDeleteItemView = () => (
    <View style={AppStyles.alignItemsFlexEnd}>
      <View style={styles.hiddenItemMainView}>
        <TouchableOpacity
          style={styles.hiddenItemView}
          onPress={() => {
            setModalVisibility(!isModalVisible);
          }}>
          <Image
            source={Images.deleteBankAccountIcon}
            style={{
              resizeMode: 'contain',
              height: 80,
              justifyContent: 'center',
              right: 8,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAddNewBankComp = useMemo(
    () => (util.isArrayEmpty(_bankAccounts) ? <AddNewBank /> : <></>),
    [_bankAccounts],
  );

  const renderDeleteBankAccountModal = useMemo(
    () => (
      <DeleteOrRemoveModal
        heading={strings.DELETE_BANK_ACCOUNT}
        description={strings.ARE_YOU_SURE_TO_DELETE_BANK_ACCOUNT}
        positiveBtnText={strings.DELETE}
        negativeBtnText={strings.DONT_DELETE}
        positiveBtnPressHandler={removeListItem}
        setModalVisibility={() => setModalVisibility(!isModalVisible)}
        isModalVisible={isModalVisible}
      />
    ),
    [isModalVisible],
  );

  const renderLoaderSec = useMemo(() => {
    return (
      <View style={[AppStyles.flex, {top: '30%'}]}>
        <ActivityIndicator size="small" color={Colors.white} />
      </View>
    );
  }, [isSendingDataToServer]);

  return (
    <View style={styles.container}>
      {renderCustomNavBar()}
      {isSendingDataToServer ? (
        renderLoaderSec
      ) : (
        <View style={styles.childCont}>
          {!util.isArrayEmpty(_bankAccounts) ? (
            <>
              <Text style={styles.yourBankAccountText}>
                {strings.YOUR_BANK_ACCOUNT}
              </Text>
              {renderMyBankAccountList()}
            </>
          ) : (
            renderAddNewBankComp
          )}
          {renderDeleteBankAccountModal}
        </View>
      )}
    </View>
  );
};

MyBank.propTypes = {};
MyBank.defaultProps = {};

const mapStateToProps = ({wallet}) => ({
  _bankAccounts: wallet.bankAccounts,
});
export default connect(mapStateToProps, null)(MyBank);
