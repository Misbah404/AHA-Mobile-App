// @flow
import {
  CardField,
  StripeProvider,
  useStripe,
  CardForm,
} from '@stripe/stripe-react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {addCreditCardRequest} from '../../../actions/CreditCardActions';
import {Button, CustomNavbar} from '../../../components';
import {strings, stripeKeys} from '../../../constants';
import {mixpanel} from '../../../helpers/mixpanelHelper';
import {AppStyles, Colors} from '../../../theme';
import util from '../../../util';
import styles from './styles';

const Stripe = props => {
  const {setIsNewPayment, isFromCart} = props || {};
  const [isValidInfoEntered, setIsValidInfoEntered] = useState(() => false);
  const [isSendingDataToServer, setIsSendingDataToServer] = useState(
    () => false,
  );

  useEffect(() => {
    mixpanel.track('Visit', {
      PageName: 'Add Card',
    });
  }, []);
  const dispatch = useDispatch();
  const stripe = useStripe();

  async function onAddCardPressHandler() {
    setIsSendingDataToServer(true);
    await stripe
      .createToken({type: 'Card'})
      .then(tokenObj => {
        if (util.hasObjectWithKey(tokenObj, 'error')) {
          util.topAlertError(
            tokenObj?.error?.message ?? strings.SOMETHING_WENT_WRONG,
          );
          setIsSendingDataToServer(false);
          return;
        }

        const payload = {
          token: tokenObj?.token?.id,
        };

        dispatch(
          addCreditCardRequest(payload, res => {
            if (!!res) {
              isFromCart && setIsNewPayment(true);
              Actions.pop();
            }

            setIsSendingDataToServer(false);
          }),
        );
      })
      .catch(error => {
        console.log({error});
        setIsSendingDataToServer(false);
        util.topAlertError(error);
      });
  }

  const navBar = useMemo(() => {
    return (
      <CustomNavbar
        title={strings.ADD_CARD_DETAILS}
        hasBack
        leftRightButtonWrapperStyle={{justifyContent: 'center'}}
        titleStyle={AppStyles.titleStyleForLeft}
      />
    );
  }, []);

  return (
    <>
      {navBar}
      <View style={styles.stripeInputCont}>
        <StripeProvider
          publishableKey={stripeKeys.publishableKey}
          urlScheme="your-url-scheme"
          threeDSecureParams={{
            backgroundColor: Colors.background.primary, // iOS only
            timeout: 5,
            label: {
              headingTextColor: Colors.text.primary,
              headingFontSize: 13,
            },
            navigationBar: {
              headerText: '3d secure',
            },
            footer: {
              // iOS only
              backgroundColor: Colors.background.primary,
            },
            submitButton: {
              backgroundColor: Colors.background.purple,
              cornerRadius: 12,
              textColor: Colors.text.primary,
              textFontSize: 14,
            },
          }}>
          <CardField
            postalCodeEnabled={true}
            placeholder={{
              numberPlaceholder: 'Card Number',
            }}
            cardStyle={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
            }}
            style={{
              width: '100%',
              height: 50,
              marginVertical: 30,
            }}
            onCardChange={cardDetails => {
              setIsValidInfoEntered(cardDetails?.complete ?? false);
            }}
            onFocus={focusedField => {}}
          />

          <Button
            color={Colors.text.white}
            onPress={onAddCardPressHandler}
            isLoading={isSendingDataToServer}
            disabled={!!!isValidInfoEntered || !!isSendingDataToServer}
            style={[styles.addToCardButton]}
            textStyle={styles.addCardText}>
            {strings.ADD_CARD}
          </Button>
        </StripeProvider>
      </View>
    </>
  );
};

Stripe.propTypes = {};
Stripe.defaultProps = {};

const mapStateToProps = ({}) => ({});
export default connect(mapStateToProps, null)(Stripe);
