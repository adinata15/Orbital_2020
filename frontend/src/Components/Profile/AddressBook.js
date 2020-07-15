import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';

import EditAddress from './EditAddress';
import AddAddress from './AddAddress';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getAddress,
  updateBillingAddress,
  updateShippingAddress,
  deleteAddress,
} from '../../actions/profileActions';

class AddressBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editId: '',
      openAdd: false,
    };
  }

  componentWillMount() {
    this.props.getAddress();
  }

  handleOpen = (e) => {
    if (e.target.name === 'openAdd') {
      this.setState({
        openAdd: true,
      });
    } else {
      this.setState({
        editId: e.target.name,
      });
    }
  };

  handleClose = () => {
    this.setState({
      editId: '',
      openAdd: false,
    });
  };

  render() {
    let addresses = this.props.addresses;
    return (
      <div>
        <h1 className={'py-2 px-5 text-4xl'}>My Address</h1>
        <table id='tableaddresses' className={'p-3 mx-5 table-fixed'}>
          <thead>
            <tr className='bg-gray-300 border-0 border-b-3'>
              <th className={'px-2 py-2'}>Name</th>
              <th className={'px-2 py-2'}>Address</th>
              <th className={'px-2 py-2'}>Postcode</th>
              <th className={'px-2 py-2'}>Phone</th>
              <th className={'px-2 py-2'}>Status</th>
              <th className={'px-2 py-2'}></th>
              <th className={'px-2 py-2'}></th>
              <th className={'px-2 py-2'}></th>
              <th className={'px-2 py-2'}></th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((address) => (
              <tr className={'bg-white border-0 border-b-2'}>
                <td className={' px-4 py-2'}>
                  {address.firstname} {address.lastname}
                </td>
                <td className={' px-4 py-2'}>{address.address}</td>
                <td className={' px-4 py-2'}>{address.postcode}</td>
                <td className={' px-4 py-2'}>{address.telephone}</td>
                <td className={' px-4 py-2'}>
                  <label hidden={!address.shippingaddress}>
                    Default shipping address
                  </label>
                  <label hidden={!address.billingaddress}>
                    Default billing address
                  </label>
                </td>
                <td className={' px-4 py-2'}>
                  <button
                    type='button'
                    name={address._id}
                    onClick={this.handleOpen}>
                    Edit
                  </button>
                </td>
                <td className={' px-4 py-2'}>
                  <button
                    type='button'
                    name={address._id}
                    onClick={() => {
                      this.props.updateBillingAddress(address._id);
                    }}>
                    Set as billing address
                  </button>
                </td>
                <td className={' px-4 py-2'}>
                  <button
                    type='button'
                    name={address._id}
                    onClick={() => {
                      this.props.updateShippingAddress(address._id);
                    }}>
                    Set as shipping address
                  </button>
                </td>
                <td className={' px-4 py-2'}>
                  <button
                    type='button'
                    name={address._id}
                    onClick={() => {
                      this.props.deleteAddress(address._id);
                    }}>
                    Delete
                  </button>
                </td>
                <Dialog
                  open={address._id === this.state.editId}
                  onClose={this.handleClose}
                  fullWidth={true}
                  maxWidth={'md'}
                  scroll={'body'}>
                  <EditAddress
                    address={address}
                    handleClose={this.handleClose}
                  />
                </Dialog>
              </tr>
            ))}
          </tbody>
          <div className={'flex justify-end'}>
            <button
              type='button'
              name='openAdd'
              onClick={this.handleOpen}
              className={
                'bg-gray-800 w-auto my-2 mx-5 w-32 h-10 hover:bg-gray-600 text-white font-bold px-4 rounded'
              }>
              Add new address
            </button>
          </div>
        </table>

        <Dialog
          open={this.state.openAdd}
          onClose={this.handleClose}
          fullWidth={true}
          maxWidth={'md'}
          scroll={'body'}>
          <AddAddress handleClose={this.handleClose} />
        </Dialog>
      </div>
    );
  }
}

AddressBook.propTypes = {
  getAddress: PropTypes.func.isRequired,
  addresses: PropTypes.object.isRequired,
  updateBillingAddress: PropTypes.func,
  updateShippingAddress: PropTypes.func,
  deleteAddress: PropTypes.func,
};

const mapStateToProps = (state) => ({
  addresses: state.auth.addresses,
});

export default connect(mapStateToProps, {
  getAddress,
  updateBillingAddress,
  updateShippingAddress,
  deleteAddress,
})(AddressBook);
