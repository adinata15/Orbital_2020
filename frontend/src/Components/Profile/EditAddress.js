import React, { Fragment } from 'react';

import Alert from '../Alert';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  editAddress,
  updateBillingAddress,
  updateShippingAddress,
} from '../../actions/profileActions';

class EditAddress extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.address,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    let address_id = this.state._id;
    let addressData = { ...this.state };
    this.props.editAddress(addressData, address_id);
    this.props.handleClose();
  };

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <Fragment>
        <Alert />
        <form
          onSubmit={this.handleSubmit}
          className={'w-full max-w-lg mx-auto my-6'}
        >
          <h1 className={'text-center text-3xl mb-3'}>Edit Address</h1>

          <div className={'flex flex-row -mx-3 mb-6'}>
            <div className={'w-full pr-3'}>
              <label
                className={
                  'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                }
                for="grid-user-id"
              >
                First name
              </label>
              <input
                name="firstname"
                className={
                  'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
                }
                id="firstname"
                value={this.state.firstname}
                type="text"
                placeholder="Jane"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className={'w-full pl-3'}>
              <label
                className={
                  'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                }
                for="grid-user-id"
              >
                Last name
              </label>
              <input
                name="lastname"
                className={
                  'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
                }
                id="lastname"
                value={this.state.lastname}
                type="text"
                placeholder="Smith"
                required
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className={'flex flex-row -mx-3 mb-6'}>
            <div className={'w-full pr-3'}>
              <label
                className={
                  'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                }
                for="grid-user-id"
              >
                Cellphone
              </label>
              <input
                name="cellphone"
                className={
                  'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
                }
                id="cellphone"
                value={this.state.cellphone}
                type="number"
                placeholder="(65)9531 1217"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className={'w-full pl-3'}>
              <label
                className={
                  'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                }
                for="grid-user-id"
              >
                Telephone
              </label>
              <input
                name="telephone"
                className={
                  'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
                }
                id="telephone"
                value={this.state.telephone}
                type="number"
                placeholder="(65)9531 1217"
                onChange={this.handleChange}
                required
              />
            </div>
          </div>
          <div className={'flex flex-wrap -mx-3 mb-6'}>
            <div className={'w-full mb-6'}>
              <label
                className={
                  'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                }
                for="grid-user-id"
              >
                Address
              </label>
              <input
                name="address"
                className={
                  'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
                }
                id="address"
                value={this.state.address}
                type="text"
                required
                placeholder="25 Lower Kent Ridge Rd"
                onChange={this.handleChange}
              />
            </div>
            <div className={'w-full mb-6'}>
              <div>
                <label
                  className={
                    'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  }
                  for="grid-user-id"
                >
                  Postcode
                </label>
                <input
                  name="postcode"
                  className={
                    'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
                  }
                  id="postcode"
                  value={this.state.postcode}
                  type="number"
                  required
                  placeholder="119081"
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className={'w-full flex-col justify-center'}></div>
            <button
              type="button"
              name={this.props.address._id}
              className={
                'bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-2 rounded'
              }
              onClick={() => {
                this.props.updateBillingAddress(this.props.address._id);
              }}
            >
              Make default billing address
            </button>

            <button
              type="button"
              name={this.props.address._id}
              className={
                'bg-gray-800 hover:bg-gray-600 mx-3 mr-10 text-white font-bold py-2 px-2 rounded'
              }
              onClick={() => {
                this.props.updateShippingAddress(this.props.address._id);
              }}
            >
              Make default shipping address
            </button>

            <button
              className={
                'bg-gray-800 hover:bg-gray-600 text-white float-right font-bold py-2 px-2 rounded'
              }
              type="submit"
              id="button"
            >
              Save changes
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

EditAddress.propTypes = {
  editAddress: PropTypes.func,
  updateShippingAddress: PropTypes.func,
  updateBillingAddress: PropTypes.func,
};

export default connect(null, {
  editAddress,
  updateBillingAddress,
  updateShippingAddress,
})(EditAddress);

// <td className={' px-4 py-2'}>
//                   <button
//                     type='button'
//                     name={address._id}
//                     onClick={() => {
//                       this.props.updateBillingAddress(address._id);
//                     }}>
//                     Set as billing address
//                   </button>
//                 </td>
//                 <td className={' px-4 py-2'}>
//                   <button
//                     type='button'
//                     name={address._id}
//                     onClick={() => {
//                       this.props.updateShippingAddress(address._id);
//                     }}>
//                     Set as shipping address
//                   </button>
//                 </td>
