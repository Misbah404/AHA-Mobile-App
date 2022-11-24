import React, {useEffect, useMemo, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {SwipeListView} from 'react-native-swipe-list-view';
import {connect, useDispatch} from 'react-redux';
import {
  cleanMyCartList,
  myCartListUpdate,
  removeOneCart,
} from '../../actions/CartActions';
import {CartItem, CustomNavbar} from '../../components';
import DeleteOrRemoveModal from '../../components/DeleteOrRemoveModal';
import {strings} from '../../constants';
import {sumOfCartList} from '../../helpers/cartHelper';
import {mixpanel} from '../../helpers/mixpanelHelper';
import {AppStyles, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

function Cart(props) {
  const {myCartList, isSinglePostItem} = props;

  let titleList = myCartList.map(a => a.title);
  let idList = myCartList.map(a => a.id);
  const [isCleanCart, setCleanCart] = useState(() => false);
  let sumOfArrayObject = sumOfCartList(myCartList);
  const [productPrice, setProductPrice] = useState(() => sumOfArrayObject);
  const [updateQuantity, setUpdateQuantity] = useState(() => 1);
  const dispatch = useDispatch();

  useEffect(() => {
    let sumOfArrayObject = sumOfCartList(myCartList);
    setProductPrice(sumOfArrayObject);
  }, [myCartList]);

  function updateQuantityFunction(item, quantity) {
    const data = {
      item: item,
      quantity,
    };
    setUpdateQuantity(quantity);
    dispatch(myCartListUpdate(data));
  }
  function cleanMyCart() {
    dispatch(cleanMyCartList());
    setCleanCart(false);
    Actions.pop();
  }

  const navbar = useMemo(() => {
    return (
      <CustomNavbar
        title={strings.MY_CART_LIST}
        titleStyle={AppStyles.titleStyleForLeft}
        rightBtnImage={Images.orderHistoryIcon}
        leftBtnImage={Images.backButton}
        rightBtnPress={() => {
          Actions.orderHistory();
        }}
        leftRightButtonWrapperStyle={{justifyContent: 'center'}}
      />
    );
  }, []);

  function removeOneCartFunction(item) {
    dispatch(removeOneCart(item));
  }

  function renderMycartList() {
    return (
      <SwipeListView
        data={myCartList}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <CartItem item={item} updateQuantity={updateQuantityFunction} />
          );
        }}
        renderHiddenItem={(data, _) => (
          <View style={[AppStyles.alignItemsFlexEnd]}>
            <View style={styles.hiddenItemMainView}>
              <TouchableOpacity
                style={styles.hiddenItemView}
                onPress={() => removeOneCartFunction(data?.item)}>
                <Image source={Images.crossIcon} />
                <Text style={styles.hiddenItem}>{strings.REMOVE}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        rightOpenValue={-150}
        leftOpenValue={0}
        stopRightSwipe={-150}
        disableRightSwipe={true}
      />
    );
  }
  function renderCalculationView() {
    return (
      <View style={styles.amountView}>
        <TouchableOpacity
          onPress={() => setCleanCart(true)}
          style={styles.clearCartTextView}>
          <Text style={styles.clearCartText}>{strings.CLEAN_CART}</Text>
        </TouchableOpacity>

        <View style={styles.underline}>
          <Image source={Images.dashUnderline} style={{width: '80%'}} />
        </View>

        <View style={AppStyles.mTop20}>
          <View style={styles.totalAmountView}>
            <Text style={styles.product}>{strings.PRODUCT}</Text>
            <Text style={styles.amount}>{`$${productPrice?.toFixed(2)}`}</Text>
          </View>

          <View style={styles.totalAmountView}>
            <Text style={styles.total}>{strings.SUB_TOTAL}</Text>
            <Text style={styles.amount}>{`$${productPrice?.toFixed(2)}`}</Text>
          </View>
        </View>
      </View>
    );
  }
  function renderCheckOutButton() {
    return (
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (!util.isArrayEmpty(myCartList)) {
              Actions.cartCheckout({
                totalPrice: productPrice,
                isSinglePostItem: isSinglePostItem,
                cartList: myCartList,
              });

              mixpanel.track('Checkout', {
                TotalPrice: productPrice,
                CartValue: productPrice,
                CartItemName: titleList,
                ItemID: idList,
                CartSize: myCartList?.length,
              });
            }
          }}>
          <Text style={styles.buttonText}>{strings.CHECKOUT}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const rendercleanCartModal = useMemo(
    () => (
      <DeleteOrRemoveModal
        heading={strings.CLEAN_MYCART}
        description={strings.ARE_YOU_SURE_YOU_WANT_CLEAN_CART}
        positiveBtnText={strings.YES}
        negativeBtnText={strings.NO}
        positiveBtnPressHandler={() => cleanMyCart()}
        setModalVisibility={() => setCleanCart(!isCleanCart)}
        isModalVisible={isCleanCart}
      />
    ),
    [isCleanCart],
  );

  const renderCartListEmpty = () => {
    return (
      <View style={styles.cartListEmptyView}>
        <Text style={styles.cartListEmptyTxt}>{strings.CART_IS_EMPTY}</Text>
      </View>
    );
  };
  return (
    <>
      {navbar}
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cartItemListView}>
            {renderMycartList()}
            {!util.isArrayEmpty(myCartList) && renderCalculationView()}
            {util.isArrayEmpty(myCartList) && renderCartListEmpty()}
            {!util.isArrayEmpty(myCartList) && renderCheckOutButton()}
          </View>
        </ScrollView>

        {rendercleanCartModal}
      </View>
    </>
  );
}

Cart.propTypes = {};
Cart.defaultProps = {};
const mapStateToProps = ({cart}) => ({
  myCartList: cart.myCartList,
});

export default connect(mapStateToProps, {})(Cart);
