import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';

import OrderDetail from './OrderDetail';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrder } from '../../actions/profileActions';

class OrdersBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentWillMount() {
    this.props.getOrder(this.props.accounttype);
  }

  handleOpen = (e) => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    if (!this.props.orders[0].items)
      return (
        <div>
          <CircularProgress /> Loading...
        </div>
      );
    else {
      console.log(this.props.orders[0].items[0].image);
      return (
        <div>
          <h1 className={'py-2 px-5 text-4xl'}>My Orders</h1>
          <table id='tableaddresses' className={'p-3 mx-5 table-fixed'}>
            <thead>
              <tr className='bg-gray-300 border-0 border-b-3'>
                <th className={'w-1/2 px-2 py-2'}>Items</th>
                <th className={'px-2 py-2'}>Size</th>
                <th className={'px-2 py-2'}>Quantity</th>
                <th className={'px-2 py-2'}>Total</th>
                <th className={'px-2 py-2 '}></th>
              </tr>
            </thead>
            <tbody>
              {this.props.orders.map((order) =>
                order.items.map((item) => (
                  <tr className={'bg-white border-0 border-b-2'}>
                    <td className={'flex justify-center px-4 py-2'}>
                      <img
                        className={'w-1/3 h-1/3 object-cover'}
                        src={item.image}
                        alt={item.item}
                      />
                    </td>
                    <td className={'px-4 py-2'}>
                      <p>{item.size}</p>
                    </td>
                    <td className={'px-4 py-2'}>{item.quantity}</td>
                    <td className={'px-4 py-2'}>
                      ${item.quantity * item.price}
                    </td>
                    <td className={' px-4 py-2'}>
                      <button
                        type='button'
                        name={item.item}
                        onClick={this.handleOpen}>
                        Manage
                      </button>
                    </td>

                    <Dialog
                      open={this.state.open}
                      onClose={this.handleClose}
                      fullWidth={true}
                      maxWidth={'md'}
                      scroll={'body'}>
                      <OrderDetail item={item} handleClose={this.handleClose} />
                    </Dialog>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

OrdersBook.propTypes = {
  getOrder: PropTypes.func,
  accounttype: PropTypes.string.isRequired,
  orders: PropTypes.array,
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  accounttype: state.auth.user.accounttype,
  orders: state.auth.user.orders,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, {
  getOrder,
})(OrdersBook);
