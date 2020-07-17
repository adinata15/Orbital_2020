import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCheckout } from '../actions/profileActions';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let order = {
      shippingaddress: this.props.user.shippingaddress.address,
      billingaddress: this.props.user.billingaddress.address,
      cart: this.props.user.cart,
    };

    // this.props.getCheckout(order);
  }
  render() {
    return <p>Checkout success</p>;
  }
}

Checkout.propTypes = {
  getCheckout: PropTypes.func,
};

const mapStateToProps = state => ({
  orderCurr: state.auth.orderCurr,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getCheckout })(Checkout);
