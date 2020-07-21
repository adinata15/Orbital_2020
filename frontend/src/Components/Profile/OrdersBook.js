import React, { Component, Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';

import OrderDetail from './OrderDetail';

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

  handleOpen = (e) => {
    this.setState({
      [e.target.id]: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

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
              {this.props.orders.map((order) => (
                <Fragment>
                  {order.items.map((item) => (
                    <tr className={'bg-gray-400 border-0 pt-3'}>
                      <td className={'flex justify-center px-4 py-2'}>
                        <img
                          className={'w-1/3 h-1/3 object-cover'}
                          src={item.image}
                          alt={item.item}
                        />
                      </td>
                      <td className={'px-4 py-2'}>{item.size}</td>
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
                        maxWidth={'sm'}
                        scroll={'body'}>
                        <OrderDetail
                          item={item}
                          handleClose={this.handleClose}
                        />
                      </Dialog>
                    </tr>
                  ))}
                  <div className={'p-10'}></div>
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
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  accounttype: state.auth.user.accounttype,
  orders: state.auth.orders,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, {
  getOrder,
  loadUser,
})(OrdersBook);
