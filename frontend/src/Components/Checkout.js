import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCheckout } from '../actions/profileActions';
import { loadUser } from '../actions/loginActions';
class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }
<<<<<<< HEAD
  componentDidMount() {
    let order = {
      shippingaddress: this.props.user.shippingaddress.address,
      billingaddress: this.props.user.billingaddress.address,
      cart: this.props.user.cart,
    };

    // this.props.getCheckout(order);
=======
  async componentDidMount() {
    await this.props.loadUser();
>>>>>>> 44cbc09... commit
  }
  render() {
    return <p>Checkout success</p>;
  }
}

Checkout.propTypes = {
  getCheckout: PropTypes.func,
  loadUser: PropTypes.func,
};

const mapStateToProps = state => ({
  orderCurr: state.auth.orderCurr,
  user: state.auth.user,
});

export default connect(mapStateToProps, { loadUser, getCheckout })(Checkout);
