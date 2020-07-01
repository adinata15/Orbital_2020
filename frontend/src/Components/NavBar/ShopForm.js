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

<<<<<<< HEAD
  onPay = (event) => {
=======
  onPay = event => {
>>>>>>> 01a0438... Test upload image
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
<<<<<<< HEAD
      .then((res) => {
=======
      .then(res => {
>>>>>>> 01a0438... Test upload image
        console.log('Session ID: ' + res.data.sessionId);
        this.setState({ sessionId: res.data.sessionId });
      })
      .then(() => {
        this.state.stripe.redirectToCheckout({
          sessionId: self.state.sessionId,
        });
        console.log('Success');
      })
<<<<<<< HEAD
      .then(() => {
        alert('Payment succeed');
        transfers = axios.get(
          `http://localhost:5000/api/stripe/checkout/success?session_id=${self.state.sessionId}`,
          config2
        );
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      })
      .then((transfers) => {
        console.log(transfers);
      })
      .catch((err) => console.log(err.message));
  };

  getitem = (token) => {
=======
      // .then(() => {
      // 	alert("Payment succeed");
      // 	transfers = axios.get(
      // 		`http://localhost:5000/api/stripe/checkout/success?session_id=${self.state.sessionId}`,
      // 		config2
      // 	);
      // 	// If `redirectToCheckout` fails due to a browser or network
      // 	// error, display the localized error message to your customer
      // 	// using `result.error.message`.
      // })
      // .then((transfers) => {
      // 	console.log(transfers);
      // })
      .catch(err => console.log(err.message));
  };

  getitem = token => {
>>>>>>> 01a0438... Test upload image
    let self = this;

    let config = {
      headers: {
        'x-auth-token': token,
      },
    };
    axios
      .get(`http://localhost:5000/api/users/buyer/cart`, config)
<<<<<<< HEAD
      .then((res) => {
=======
      .then(res => {
>>>>>>> 01a0438... Test upload image
        self.setState({
          cart: res.data,
        });
        // alert("Loaded cart items");
        console.log(self.state.cart);
      })
<<<<<<< HEAD
      .catch((err) => {
=======
      .catch(err => {
>>>>>>> 01a0438... Test upload image
        console.error(err);
        alert('Load fail');
      });
  };

  componentWillMount() {
    this.getitem(this.props.token);
  }

  cartItems = () => {
    let cartItems = this.state.cart;
<<<<<<< HEAD
    let token = this.props.token;
    if (!this.props.token) {
      return (
        <p class='text-3xl px-8 font-bold my-3'>You need to sign in first</p>
      );
    } else if (cartItems[0]) {
      console.log('if case');
      return cartItems.map((item) => (
        <CartItem token={token} key={item.id} item={item} />
      ));
    } else {
      console.log('else case');
      return <p class='text-3xl px-8 font-bold my-3'>Cart is empty</p>;
=======
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
>>>>>>> 01a0438... Test upload image
    }
  };

  render() {
    return (
      <div>
<<<<<<< HEAD
        <h1 class='py-3 px-12 text-center text-3xl mb-3'>Cart items</h1>
        {this.cartItems()}
        <div class='pt-3 px-12'>
          <button
            onClick={this.onPay}
            role='link'
            class='bg-teal-700 hover:bg-teal-900 text-white font-bold m-5 py-2 px-8 rounded-full'>
=======
        <h1 class="py-3 px-12 text-center text-3xl mb-3">Cart items</h1>
        {this.cartItems()}
        <div class="pt-3 px-12">
          <button
            onClick={this.onPay}
            role="link"
            class="bg-teal-700 hover:bg-teal-900 text-white font-bold m-5 py-2 px-8 rounded-full"
          >
>>>>>>> 01a0438... Test upload image
            Checkout
          </button>
          <button
            onClick={this.props.handleClose}
<<<<<<< HEAD
            class='bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full'>
=======
            class="bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full"
          >
>>>>>>> 01a0438... Test upload image
            Continue shopping
          </button>
        </div>
      </div>
    );
  }
}

export default ShopForm;
