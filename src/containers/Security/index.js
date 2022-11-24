import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {
  deleteCreditCardRequest,
  getCreditCardsListRequest,
  setDefaultCardRequest,
} from '../../actions/CreditCardActions';
import {
  changeEmailRequest,
  changePasswordRequest,
} from '../../actions/UserActions';
import {
  AddNewPaymentComponent,
  CustomNavbar,
  KeyboardAwareScrollViewComponent,
  Loader,
  PaymentComponent,
  TextInput,
} from '../../components';
import DeleteOrRemoveModal from '../../components/DeleteOrRemoveModal';
import {strings} from '../../constants';
import {mixpanel} from '../../helpers/mixpanelHelper';
import {AppStyles, Colors, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

function SecurityController(props) {
  const {userData, creditCardsList} = props;

  const [selectedPaymentId, setSelectedPaymentId] = useState(() => -1);
  const [isOldPasswordVisibile, setOldPassVisibilty] = useState(() => false);
  const [isNewPasswordVisibile, setNewPassVisibilty] = useState(() => false);
  const [isFetchingCardsFromServer, setIsFetchingCardsFromServer] = useState(
    () => false,
  );
  const [isConfirmPasswordVisibile, setConfirmPassVisibilty] = useState(
    () => false,
  );
  const emailRef = useRef(() => null);
  const oldPasswordRef = useRef(() => null);
  const newPasswordRef = useRef(() => null);
  const confirmPasswordRef = useRef(() => null);
  const [email, setEmail] = useState(() => userData?.email ?? '');
  const [password, setPassword] = useState(() => '');
  const [newPassword, setNewPassword] = useState(() => '');
  const [confirmPassword, setConfirmPassword] = useState(() => '');
  const [isSendingEmailToServer, setIsSendingEmailToServer] = useState(
    () => false,
  );
  const [isSendingPasswordsToServer, setIsSendingPasswordsToServer] = useState(
    () => false,
  );
  const [emailError, setEmailError] = useState(() => '');
  const [passwordError, setPasswordError] = useState(() => '');
  const [newPasswordError, setNewPasswordError] = useState(() => '');
  const [confirmPasswordError, setConfirmPasswordError] = useState(() => '');
  const [isEmail, setIsEmail] = useState(() => false);
  const [isPassword, setIsPassword] = useState(() => false);
  const [creditCardIdToDelete, setCreditCardIdToDelete] = useState(() => -1);
  const [deleteCreditCardModalVisibility, setDeleteCreditCardModalVisility] =
    useState(() => false);
  const dispatch = useDispatch();

  useEffect(() => {
    mixpanel.track('Visit', {PageName: 'Security'});
    setIsFetchingCardsFromServer(true);
    dispatch(
      getCreditCardsListRequest({}, res => {
        setIsFetchingCardsFromServer(false);
      }),
    );
  }, []);

  useEffect(() => {
    setSelectedPaymentId(creditCardsList[0]?.id);
  }, [creditCardsList]);

  function onDeleteCreditCardPressHandler() {
    setDeleteCreditCardModalVisility(false);
    dispatch(deleteCreditCardRequest(String(creditCardIdToDelete), () => {}));
  }

  function emailValidation() {
    if (util.isEmptyValueWithoutTrim(email)) {
      setEmailError(strings.REQUIRED_FIELD);
      return false;
    }
    if (!util.isEmailValid(email)) {
      setEmailError(strings.INVALID_EMAIL);
      return false;
    }
    return true;
  }

  function emailSubmit() {
    Keyboard.dismiss();
    if (emailValidation()) {
      setIsSendingEmailToServer(true);
      const payload = {
        email: email,
      };
      dispatch(
        changeEmailRequest(payload, res => {
          if (res) setIsEmail(false);
          setIsSendingEmailToServer(false);
        }),
      );
    }
  }

  function passwordValidation() {
    let isValid = true;
    if (util.isEmptyValueWithoutTrim(password)) {
      setPasswordError(strings.REQUIRED_FIELD);
      oldPasswordRef?.current?.focus?.();
      isValid = false;
    }

    if (util.isEmptyValueWithoutTrim(newPassword)) {
      setNewPasswordError(strings.REQUIRED_FIELD);
      newPasswordRef?.current?.focus?.();
      isValid = false;
    } else if (util.isEmptyValue(newPassword)) {
      setNewPasswordError(strings.PASSWORD_SHOULD_NOT_CONTAIN_ONLY_SPACES);
      newPasswordRef?.current?.focus?.();
      isValid = false;
    } else if (!util.isPasswordValid(newPassword)) {
      setNewPasswordError(strings.PASSWORD_MUST);
      newPasswordRef?.current?.focus?.();
      isValid = false;
    } else if (!util.areValuesEqual(newPassword, confirmPassword)) {
      setConfirmPasswordError(strings.PASSWORD_AND_CONFIRM_PASS_SHOULD_BE_SAME);
      confirmPasswordRef?.current?.focus?.();
      isValid = false;
    }

    if (util.isEmptyValueWithoutTrim(confirmPassword)) {
      setConfirmPasswordError(strings.REQUIRED_FIELD);
      confirmPasswordRef?.current?.focus?.();
      return false;
    }

    return isValid;
  }

  function passwordSubmit() {
    Keyboard.dismiss();
    if (passwordValidation()) {
      const payload = {
        password: newPassword,
        current_password: password,
      };
      setIsSendingPasswordsToServer(true);
      dispatch(
        changePasswordRequest(payload, res => {
          if (res) setIsPassword(false);
          setIsSendingPasswordsToServer(false);
        }),
      );
    }
  }

  function onCardItemPressHandler(id) {
    const payload = {
      id,
    };
    dispatch(
      setDefaultCardRequest(payload, res => {
        if (!!res) {
          setSelectedPaymentId(id);
        }
      }),
    );
  }

  const navBar = useMemo(
    () => (
      <CustomNavbar
        title={strings.SECURITY}
        hasBack
        titleStyle={AppStyles.titleStyleForLeft}
        leftRightButtonWrapperStyle={{justifyContent: 'center'}}
      />
    ),
    [],
  );

  const paymentWork = () => (
    <>
      <Text style={styles.payment}>{strings.PAYMENTS}</Text>
      {!!isFetchingCardsFromServer ? (
        <View style={[AppStyles.pTop20, AppStyles.pBottom30]}>
          <Loader loading={true} />
        </View>
      ) : (
        <FlatList
          data={creditCardsList}
          keyExtractor={(_, index) => index}
          renderItem={({item}) => {
            return (
              <PaymentComponent
                item={item}
                isDefault={true}
                selectedPaymentId={selectedPaymentId}
                setSelectedPaymentId={onCardItemPressHandler}
                isConfirmationScreen={true}
                isSecurityScreen={true}
                onDeleteIconPress={id => {
                  setCreditCardIdToDelete(id);
                  setDeleteCreditCardModalVisility(true);
                }}
              />
            );
          }}
        />
      )}

      <AddNewPaymentComponent />
    </>
  );

  const renderSubmitButton = (_onPress, isLoading) => (
    <View style={AppStyles.alignItemsFlexEnd}>
      <TouchableOpacity style={styles.circle} onPress={() => _onPress()}>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.white} />
        ) : (
          <Image
            source={Images.submitArrowIcon}
            style={styles.arrowIconStyle}
            resizeMode={'contain'}
          />
        )}
      </TouchableOpacity>
    </View>
  );

  const changeEmail = () => (
    <View style={AppStyles.mTop30}>
      <View style={AppStyles.flexRow}>
        <Text style={styles.changeEmailText}>
          {userData?.email ? strings.CHANGE_EMAIL : strings.ADD_EMAIL}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setIsEmail(!isEmail);
            setIsPassword(false);
            setEmailError('');

            setEmail(userData?.email ?? '');
          }}>
          <Image
            style={{width: 18, height: 18}}
            source={isEmail ? Images.crossIcon : Images.paymentCardEdit}
          />
        </TouchableOpacity>
      </View>

      {!!isEmail && (
        <View style={[styles.textInputView, AppStyles.mTop20]}>
          <TextInput
            label={strings.EMAIL}
            placeholder={strings.EMAIL}
            leftIcon={Images.userIcon}
            labelStyle={styles.textInputLabel}
            ref={emailRef}
            autoFocus
            onSubmitEditing={() => emailSubmit()}
            returnKeyType="done"
            textInputValue={email}
            onChangeText={email => {
              setEmail(email);
              setEmailError('');
            }}
            error={emailError}
          />

          {renderSubmitButton(() => emailSubmit(), isSendingEmailToServer)}
        </View>
      )}
    </View>
  );

  const changePassword = () => (
    <View style={AppStyles.mTop30}>
      <View style={AppStyles.flexRow}>
        <Text style={styles.changeEmailText}>{strings.CHANGE_PASSWORD}</Text>
        <TouchableOpacity
          onPress={() => {
            setIsPassword(!isPassword);

            setIsEmail(false);
            setPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setNewPasswordError('');
            setPasswordError('');
            setConfirmPasswordError('');
          }}>
          <Image
            style={{width: 18, height: 18}}
            source={isPassword ? Images.crossIcon : Images.paymentCardEdit}
          />
        </TouchableOpacity>
      </View>
      {isPassword && (
        <View style={{marginBottom: 40}}>
          <View style={[styles.textInputView, AppStyles.mTop20]}>
            <TextInput
              label={strings.OLD_PASSWORD}
              placeholder={strings.OLD_PASSWORD}
              leftIcon={Images.lockIcon}
              rightIcon={
                isOldPasswordVisibile
                  ? Images.passwordVisibilityIcon
                  : Images.hidePasswordIcon
              }
              labelStyle={styles.textInputLabel}
              onFocus={() => {}}
              autoFocus
              secureTextEntry={isOldPasswordVisibile ? false : true}
              onPress={() => setOldPassVisibilty(!isOldPasswordVisibile)}
              ref={oldPasswordRef}
              onSubmitEditing={() => newPasswordRef?.current?.focus?.()}
              returnKeyType="next"
              textInputValue={password}
              onChangeText={val => {
                setPassword(val);
                setPasswordError('');
              }}
              error={passwordError}
            />
          </View>
          <View style={[styles.textInputView, AppStyles.mTop20]}>
            <TextInput
              label={strings.NEW_PASSWORD}
              placeholder={strings.NEW_PASSWORD}
              leftIcon={Images.lockIcon}
              rightIcon={
                isNewPasswordVisibile
                  ? Images.passwordVisibilityIcon
                  : Images.hidePasswordIcon
              }
              labelStyle={styles.textInputLabel}
              secureTextEntry={isNewPasswordVisibile ? false : true}
              onPress={() => setNewPassVisibilty(!isNewPasswordVisibile)}
              ref={newPasswordRef}
              onSubmitEditing={() => confirmPasswordRef?.current?.focus?.()}
              returnKeyType="next"
              textInputValue={newPassword}
              onChangeText={val => {
                setNewPassword(val);
                setNewPasswordError('');
              }}
              error={newPasswordError}
            />
          </View>
          <View style={[styles.textInputView, AppStyles.mTop20]}>
            <TextInput
              label={strings.CONFIRM_PASSWORD}
              placeholder={strings.CONFIRM_PASSWORD}
              leftIcon={Images.lockIcon}
              rightIcon={
                isConfirmPasswordVisibile
                  ? Images.passwordVisibilityIcon
                  : Images.hidePasswordIcon
              }
              labelStyle={styles.textInputLabel}
              secureTextEntry={isConfirmPasswordVisibile ? false : true}
              onPress={() =>
                setConfirmPassVisibilty(!isConfirmPasswordVisibile)
              }
              ref={confirmPasswordRef}
              onSubmitEditing={() => passwordSubmit()}
              returnKeyType="done"
              textInputValue={confirmPassword}
              onChangeText={val => {
                setConfirmPassword(val);
                setConfirmPasswordError('');
              }}
              error={confirmPasswordError}
            />
          </View>
          {renderSubmitButton(
            () => passwordSubmit(),
            isSendingPasswordsToServer,
          )}
        </View>
      )}
    </View>
  );

  const ChangePhone = () => (
    <View style={AppStyles.mTop40}>
      <TouchableOpacity
        onPress={() => Actions.changeNumber()}
        style={AppStyles.flexRow}>
        <Text style={styles.changeEmailText}>{strings.CHANGE_PHONE}</Text>

        <Image
          style={{width: 18, height: 18}}
          source={Images.paymentCardEdit}
        />
      </TouchableOpacity>
    </View>
  );

  const renderDeleteCreditCardModal = useMemo(
    () => (
      <DeleteOrRemoveModal
        heading={''}
        description={strings.ARE_YOU_SURE_TO_DELETE_THIS_CARD}
        positiveBtnText={strings.DELETE}
        negativeBtnText={strings.DONT_DELETE}
        positiveBtnPressHandler={onDeleteCreditCardPressHandler}
        setModalVisibility={() =>
          setDeleteCreditCardModalVisility(!deleteCreditCardModalVisibility)
        }
        isModalVisible={deleteCreditCardModalVisibility}
      />
    ),
    [deleteCreditCardModalVisibility],
  );

  return (
    <>
      {navBar}
      <KeyboardAwareScrollViewComponent
        scrollEnabled={true}
        style={AppStyles.pBottom30}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always">
          {paymentWork()}
          {util.areValuesEqual(userData.loginType, 'simple') && ChangePhone()}
          {util.areValuesEqual(userData.loginType, 'simple') && changeEmail()}
          {util.areValuesEqual(userData.loginType, 'simple') &&
            changePassword()}
        </ScrollView>
      </KeyboardAwareScrollViewComponent>
      {renderDeleteCreditCardModal}
    </>
  );
}
SecurityController.propTypes = {};
SecurityController.defaultProps = {};

const mapStateToProps = ({user, creditCard}) => ({
  userData: user.data,
  creditCardsList: creditCard.creditCardsList,
});

export default connect(mapStateToProps, null)(SecurityController);
