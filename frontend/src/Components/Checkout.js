import React from 'react';
import axios from 'axios';

class Cehckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };

    //can bind function here! (we didnt bind here because we use arrow function below)
  }
  componentDidMount() {
    const config = {
      headers: {
        'Content-Type': ' application/json',
        'x-auth-token': this.props.token,
      },
    };
    let order = {
      shippingaddress: this.props.user.shippingaddress.address,
      billingaddress: this.props.user.billingaddress.address,
      cart: this.props.user.cart,
    };
    order = JSON.stringify(order);
    axios
      .post('http://localhost:5000/api/items/create-order', order, config)
      .then((res) => {
        console.log(res.data);
      });
  }
  render() {
    return <p>Checkout success</p>;
  }
}

export default Cehckout;
