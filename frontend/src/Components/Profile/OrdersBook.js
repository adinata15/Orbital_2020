import React, { Component, Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrder } from '../../actions/profileActions';
import { loadUser } from '../../actions/loginActions';

class OrdersBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  async componentWillMount() {
    await this.props.loadUser();
    this.props.getOrder(this.props.accounttype);
  }

  render() {
    if (!this.props.orders)
      return (
        <div>
          <CircularProgress /> Loading...
        </div>
      );
    else {
      return (
        <Fragment>
          <h1 className={'py-2 px-5 text-4xl'}>My Orders</h1>
          <table id='tableaddresses' className={'p-3 mx-5 w-full table-auto'}>
            <thead>
              <tr className='bg-gray-300 border-0 border-b-3'>
                <th className={'px-2 py-2'}>Order ID</th>
                <th className={'w-40 px-2 py-2'}>Items</th>
                <th className={'px-2 py-2'}>Title</th>
                <th className={'px-2 py-2'}>Brand</th>
                <th className={'px-2 py-2'}>Size</th>
                <th className={'px-2 py-2'}>Quantity</th>
                <th className={'px-2 py-2'}>Total</th>
              </tr>
            </thead>
            <tbody>
              {this.props.orders.map((order) => (
                <Fragment>
                  <div>Order date: {order.date.split('T')[0]}</div>
                  {order.items.map((item) => (
                    <tr className={'bg-gray-400 border-0 pt-3'}>
                      <td
                        className={
                          'px-4 py-2 border-r-2 border-b-2 text-center'
                        }>
                        #{item.item}
                      </td>
                      <td
                        className={
                          'flex justify-center px-4 py-2 border-r-2 border-b-2'
                        }>
                        <img
                          className={'w-32 h-32 object-cover'}
                          src={item.image}
                          alt={item.item}
                        />
                      </td>

                      <td
                        className={
                          'px-4 py-2 border-r-2 border-b-2 text-center'
                        }>
                        {item.title}
                      </td>
                      <td
                        className={
                          'px-4 py-2 border-r-2 border-b-2 text-center'
                        }>
                        {item.brand}
                      </td>
                      <td
                        className={
                          'px-4 py-2 border-r-2 border-b-2 text-center'
                        }>
                        {item.size}
                      </td>
                      <td
                        className={
                          'px-4 py-2 border-r-2 border-b-2 text-center'
                        }>
                        {item.quantity}
                      </td>
                      <td
                        className={
                          'px-4 py-2 border-r-2 border-b-2 text-center'
                        }>
                        ${item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                  <div className={'p-5'} />
                </Fragment>
              ))}
            </tbody>
          </table>
        </Fragment>
      );
    }
  }
}

OrdersBook.propTypes = {
  getOrder: PropTypes.func,
  loadUser: PropTypes.func,
  accounttype: PropTypes.string.isRequired,
  orders: PropTypes.array,
};

const mapStateToProps = (state) => ({
  accounttype: state.auth.user.accounttype,
  orders: state.auth.orders,
});

export default connect(mapStateToProps, {
  getOrder,
  loadUser,
})(OrdersBook);