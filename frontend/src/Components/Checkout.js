import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { getCheckout } from '../actions/profileActions';
import { loadUser } from '../actions/loginActions';
class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    await this.props.loadUser();
  }
  render() {
    return <p>Checkout success</p>;
  }
}

Checkout.propTypes = {
  // getCheckout: PropTypes.func,
  loadUser: PropTypes.func,
};

const mapStateToProps = (state) => ({
  orderCurr: state.auth.orderCurr,
  user: state.auth.user,
});

export default connect(mapStateToProps, { loadUser })(Checkout);
