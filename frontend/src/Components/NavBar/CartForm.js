import React from 'react';
import Image from '../../images/green.jpg';
import CartItem from './CartItem.js';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getcartItems, payItems } from '../../actions/shopActions';

class CartForm extends React.Component {
  constructor(props) {
    super(props);
  }

  payItems = (e) => {
    e.preventDefault();

    let cartItems = {
      items: this.props.itemCart,
    };

    this.props.payItems(cartItems);
  };

  componentWillMount() {
    this.props.getcartItems();
  }

  cartItems = () => {
    let cartItems = this.props.itemCart;
    if (cartItems[0]) {
      return cartItems.map((item) => <CartItem key={item.id} item={item} />);
    } else {
      return <p className={'text-3xl px-8 font-bold my-3'}>Cart is empty</p>;
    }
  };

  render() {
    return (
      <div>
        <h1 className={'py-3 px-12 text-center text-3xl mb-3'}>Cart items</h1>
        {this.cartItems()}
        <div className='pt-3 px-12'>
          <button
            onClick={this.payItems}
            role='link'
            className={
              'bg-teal-700 hover:bg-teal-900 text-white font-bold m-5 py-2 px-8 rounded-full'
            }>
            Checkout
          </button>
          <button
            onClick={this.props.handleClose}
            className={
              'bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full'
            }>
            Continue shopping
          </button>
        </div>
      </div>
    );
  }
}

CartForm.propTypes = {
  getcartItems: PropTypes.func.isRequired,
  itemCart: PropTypes.array.isRequired,
  sessionId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  itemCart: state.shop.itemCart,
  sessionId: state.shop.sessionId,
});

export default connect(mapStateToProps, { getcartItems, payItems })(CartForm);
