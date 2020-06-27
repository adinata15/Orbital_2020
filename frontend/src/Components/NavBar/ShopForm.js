import React from 'react';
import Image from '../../images/green.jpg';
import CartItem from './CartItem.js';
import axios from 'axios';

class ShopForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
  }

  getitem = token => {
    let self = this;

    let config = {
      headers: {
        'x-auth-token': token,
      },
    };
    console.log(token);
    axios
      .get(`http://localhost:5000/api/users/buyer/cart`, config)
      .then(res => {
        self.setState({
          cart: res.data,
        });
        alert('Loaded cart items');
        console.log('Here', self.state.cart);
      })
      .catch(err => {
        console.error(err);
        alert('Load fail');
      });
  };

  componentWillMount() {
    this.getitem(this.props.token);
  }

  render() {
    let cartItems = this.state.cart;
    return (
      <div>
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
        <div class="pt-12 pb-8">
          <button class="bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full">
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
