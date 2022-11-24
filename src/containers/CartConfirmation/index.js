import {useStripe} from '@stripe/stripe-react-native';
import PropTypes from 'prop-types';
import React, {useEffect, useMemo, useState} from 'react';
import {BackHandler, FlatList, ScrollView, Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {cleanMyCartList} from '../../actions/CartActions';
import {postOrderRequest} from '../../actions/orderHistoryActions';
import {
  CartItem,
  CartTotalPrice,
  CustomNavbar,
  ModalView,
  PaymentComponent,
  SpinnerLoader,
} from '../../components';
import {strings, MAIN_TABS_DATA} from '../../constants';
import {mixpanel} from '../../helpers/mixpanelHelper';
import {AppStyles, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

function CartConfirmation(props) {
  const stripe = useStripe();
  const {
    totalPrice,
    myCartList,
    selectedAddress,
    selectedCreditCardObject,
    isSinglePostItem,
    selectedTabId,
    shipment,
  } = props;

  const afterShipmentTotal = totalPrice + Number(shipment);
  const {title, state, address, country} = selectedAddress || {};
  const [isLoading, setIsLoading] = useState(() => false);
  const [isModalVisible, showModalVisibility] = useState(false);
  const dispatch = useDispatch();
  const handleButtonOfModal = () => {
    showModalVisibility(false);
    Actions.orderHistory({
      isNavbarButtonReset: true,
      isSinglePostItem: isSinglePostItem,
    });
  };
  const handleCrossButtonOfModal = () => {
    showModalVisibility(false);
    Actions.pop();
    Actions.pop();
    Actions.pop();
    // switch (selectedTabId) {
    //   case 1: {
    //     Actions.popTo('_dashboard_tab');
    //     break;
    //   }
    //   case 4:
    //   case 5: {
    //     Actions.pop();
    //     Actions.pop();
    //     Actions.pop();
    //     break;
    //   }
    // }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        Actions.pop();
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

  const navBar = useMemo(() => {
    return (
      <CustomNavbar
        title={strings.CHECKOUT}
        titleStyle={AppStyles.titleStyleForLeft}
        hasBack
        leftRightButtonWrapperStyle={{justifyContent: 'center'}}
      />
    );
  }, []);

  function renderCartList() {
    return (
      <FlatList
        data={myCartList}
        keyExtractor={(_, index) => index}
        renderItem={({item}) => {
          return <CartItem item={item} isConfirmationScreen={true} />;
        }}
      />
    );
  }
  function renderSelectedAddress() {
    return (
      <View style={styles.addressView}>
        <Text style={styles.address}>Address</Text>
        <View style={styles.containerAddress}>
          <View style={styles.radioBoxMainView}>
            <View style={styles.radioBoxView}>
              <View style={styles.radioBox} />
            </View>
          </View>
          <View style={styles.view}>
            <Text style={styles.heading}>{title}</Text>
            <Text style={styles.description}>
              {address}, {state}, {country}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  function renderPayment() {
    return (
      <View style={styles.paymentView}>
        <Text style={styles.payment}>{strings.PAYMENTS}</Text>
        <FlatList
          data={selectedCreditCardObject}
          renderItem={({item}) => {
            return (
              <PaymentComponent
                isConfirmationScreen={true}
                item={item}
                isCartConfimationScreen={true}
                selectedPaymentId={selectedCreditCardObject[0]?.id}
              />
            );
          }}
          keyExtractor={(_, index) => index}
        />
      </View>
    );
  }
  async function submitOrder() {
    setIsLoading(true);
    const afterDeleteMaxQuantity = util.cloneDeep(myCartList);
    afterDeleteMaxQuantity.forEach(function (v) {
      delete v.maxQuantity;
    });
    const payload = {
      cart: afterDeleteMaxQuantity,
      subtotal: totalPrice,
      total: afterShipmentTotal,
      shipment_charges: !util.isNullValue(shipment) ? shipment : 0,
      address: selectedAddress,
      card_id: selectedCreditCardObject[0]?.id,
    };

    let titleList = afterDeleteMaxQuantity.map(a => a.title);
    let idList = afterDeleteMaxQuantity.map(a => a.id);
    dispatch(
      postOrderRequest(payload, res => {
        if (res) {
          setIsLoading(false);
          showModalVisibility(true);
          dispatch(cleanMyCartList());

          mixpanel.track('Complete Purchase', {
            CartValue: totalPrice,
            TotalAmount: totalPrice,
            DeliveryAmount: 0,
            CartItemName: titleList,
            ItemID: idList,
            CartSize: afterDeleteMaxQuantity?.length,
            PaymentType: 'Credit Card',
            CreditCartType: selectedCreditCardObject[0]?.brand,
          });
        } else {
          setIsLoading(false);
        }
      }),
    );
  }
  function checkoutButton() {
    return (
      <View style={styles.totalPriceView}>
        <CartTotalPrice
          shipment={shipment}
          buttonText={strings.CHECKOUT}
          totalPrice={afterShipmentTotal}
          ButtonPress={() => submitOrder()}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {navBar}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderCartList()}
        {renderSelectedAddress()}
        {renderPayment()}
        {checkoutButton()}
      </ScrollView>
      <View>
        <SpinnerLoader _loading={isLoading} />
      </View>

      {isModalVisible && (
        <ModalView
          isModalVisible={isModalVisible}
          showModalVisibility={showModalVisibility}
          handleButtonOfModal={handleButtonOfModal}
          handleCrossButtonOfModal={handleCrossButtonOfModal}
          heading={strings.THANKYOU_FOR_ORDERING}
          description1={`${strings.CHECK_YOUR_ORDER_IN} ${strings.ORDER_HISTORY}`}
          image={Images.modalIcon}
          buttonText={strings.ORDER_HISTORY}
          isCrossIconVisible
        />
      )}
    </View>
  );
}
CartConfirmation.propTypes = {
  selectedCreditCardObject: PropTypes.object,
};
CartConfirmation.defaultProps = {
  selectedCreditCardObject: {},
};

const mapStateToProps = ({cart, general}) => ({
  myCartList: cart.myCartList,
  selectedTabId: general.selectedTabId,
});

export default connect(mapStateToProps, {})(CartConfirmation);
