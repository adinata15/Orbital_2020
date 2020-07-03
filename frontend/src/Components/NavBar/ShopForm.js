import React from 'react';
import Image from '../../images/green.jpg';
import CartItem from './CartItem.js';
import axios from 'axios';
import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

class ShopForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      stripe: window.Stripe(
        'pk_test_51GxnjfGgFpE6He4tT6kxFKbZpYoNhNPFCQBWx6LeWBXRkhmQu5JFYq71V4XvpjHJV8nT3dEffaqVfkOHzNNLMFbU00KyFazIJN'
      ),
      sessionId: '',
    };
  }

  onPay = event => {
    let self = this;
    console.log(this.state.stripe);
    let transfers;
    let cart = {
      items: this.state.cart,
    };
    cart = JSON.stringify(cart);
    console.log(cart);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': this.props.token,
      },
    };
    const config2 = {
      headers: {
        'x-auth-token': this.props.token,
      },
    };
    let sessionId;
    axios
      .post(
        'http://localhost:5000/api/stripe/create-checkout-session',
        cart,
        config
      )
      .then(res => {
        console.log('Session ID: ' + res.data.sessionId);
        this.setState({ sessionId: res.data.sessionId });
      })
      .then(() => {
        this.state.stripe.redirectToCheckout({
          sessionId: self.state.sessionId,
        });
        console.log('Success');
      })
      .catch(err => console.log(err.message));
  };

  getitem = token => {
    let self = this;

    let config = {
      headers: {
        'x-auth-token': token,
      },
    };
    axios
      .get(`http://localhost:5000/api/users/buyer/cart`, config)
      .then(res => {
        self.setState({
          cart: res.data,
        });
        // alert("Loaded cart items");
        console.log(self.state.cart);
      })
      .catch(err => {
        console.error(err);
        alert('Load fail');
      });
  };

  componentWillMount() {
    this.getitem(this.props.token);
  }

  cartItems = () => {
    let cartItems = this.state.cart;
    if (!this.props.token) {
      return (
        <p class="text-3xl px-8 font-bold my-3">You need to sign in first</p>
      );
    } else if (cartItems[0]) {
      console.log('if case');
      return cartItems.map(item => <CartItem key={item.id} item={item} />);
    } else {
      console.log('else case');
      return <p class="text-3xl px-8 font-bold my-3">Cart is empty</p>;
    }
  };

  render() {
    return (
      <div>
        <h1 class="py-3 px-12 text-center text-3xl mb-3">Cart items</h1>
        {this.cartItems()}
        <div class="pt-3 px-12">
          <button
            onClick={this.onPay}
            role="link"
            class="bg-teal-700 hover:bg-teal-900 text-white font-bold m-5 py-2 px-8 rounded-full"
          >
            Checkout
          </button>
          <button
            onClick={this.props.handleClose}
            class="bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full"
          >
            Continue shopping
          </button>
        </div>
      </div>
    );
  }
}

export default ShopForm;
