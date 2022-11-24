import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import QuantityInputView from './QuantityInputView';
import util from '../../util';

class QuantityInputController extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: props.incomingQuantity,
    };
  }
  static propTypes = {
    incomingQuantity: PropTypes.number,
    handleChangeQuantity: PropTypes.func,
    fromMyCart: PropTypes.bool,
    itemId: PropTypes.number,
    fromStore: PropTypes.bool,
    isBottomSheet: PropTypes.bool,
    maxQuantity: PropTypes.number,
    postAnArt: PropTypes.bool,
    ref: PropTypes.string,
    sellAnArt: PropTypes.bool,
    onSubmitEditing: PropTypes.func,
    setAddSizeQuantityItem: PropTypes.func,
    setAddSizeQuantityIndex: PropTypes.func,
    addSizeQuantityItem: PropTypes.object,
    setIsMaxQuantity: PropTypes.func,
    isMaxQuantity: PropTypes.bool,
  };

  static defaultProps = {
    incomingQuantity: 1,
    handleChangeQuantity: () => {},
    fromMyCart: false,
    itemId: 0,
    setAddSizeQuantityItem: () => {},
    setAddSizeQuantityIndex: () => {},
    fromStore: false,
    isBottomSheet: false,
    maxQuantity: null,
    postAnArt: false,
    sellAnArt: false,
    ref: '',
    onSubmitEditing: () => {},
    addSizeQuantityItem: {},
    addSizeQuantityIndex: '',
    setIsMaxQuantity: () => {},
    isMaxQuantity: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.quantity !== this.props.incomingQuantity) {
      this.setState({quantity: this.props.incomingQuantity});
    }
  }

  handleIncrement = () => {
    if (this.props.maxQuantity) {
      {
        util.areValuesEqual(this.state.quantity, this.props.maxQuantity) &&
          this.props.setIsMaxQuantity(true);
      }
      if (this.state.quantity < this.props.maxQuantity) {
        this.props.setIsMaxQuantity(false);
        const {quantity} = this.state;
        this.setState(
          {
            quantity: Number(quantity) + 1,
          },

          this.props.handleChangeQuantity(quantity + 1),
          this.props?.setAddSizeQuantityItem(this.props?.addSizeQuantityItem),
          this.props?.setAddSizeQuantityIndex(this.props?.addSizeQuantityIndex),
        );
      }
    } else {
      const {quantity} = this.state;

      this.setState(
        {
          quantity: Number(quantity) + 1,
        },

        this.props.handleChangeQuantity(quantity + 1),
        this.props?.setAddSizeQuantityItem(this.props?.addSizeQuantityItem),
        this.props?.setAddSizeQuantityIndex(this.props?.addSizeQuantityIndex),
      );
    }
  };

  onTextChange = value => {
    this.setState({quantity: value});
  };

  handleDecrement = () => {
    const {quantity} = this.state;
    const {fromMyCart} = this.props;

    if (fromMyCart && quantity === 1) {
      return true;
    }
    this.props.setIsMaxQuantity(false);

    if (quantity !== 1 && quantity !== 0) {
      this.setState(
        {
          quantity: this.state.quantity - 1,
        },

        this.props.handleChangeQuantity(quantity - 1),
        this.props?.setAddSizeQuantityItem(this.props?.addSizeQuantityItem),
        this.props?.setAddSizeQuantityIndex(this.props?.addSizeQuantityIndex),
      );
    }
  };

  render() {
    return (
      <QuantityInputView
        {...this.props}
        quantity={this.state.quantity}
        sellAnArt={this.props.sellAnArt}
        handleIncrement={this.handleIncrement}
        handleDecrement={this.handleDecrement}
        onTextChange={this.onTextChange}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});
export default connect(mapStateToProps, null)(QuantityInputController);
