import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAddress } from '../../actions/profileActions';

class AddAddress extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
      lastname: '',
      cellphone: null,
      telephone: null,
      address: '',
      postcode: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let addressData = { ...this.state };
    this.props.setAddress(addressData);
    this.props.handleClose();
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className={'w-full max-w-lg mx-auto my-6'}>
        <h1 className={'text-center text-3xl mb-3'}>Edit Address</h1>
        <div className={'flex flex-row -mx-3 my-3'}>
          <div className={'w-full pr-3'}>
            <label
              className={
                'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              }
              for='grid-user-id'>
              First name
            </label>
            <input
              name='firstname'
              className={
                'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
              }
              id='firstname'
              value={this.state.firstname}
              type='text'
              placeholder='Jane'
              onChange={this.handleChange}
              required
            />
          </div>
          <div className={'w-full pl-3'}>
            <label
              className={
                'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              }
              for='grid-user-id'>
              Last name
            </label>
            <input
              name='lastname'
              className={
                'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
              }
              id='lastname'
              value={this.state.lastname}
              type='text'
              placeholder='Smith'
              required
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className={'flex flex-row -mx-3 my-3'}>
          <div className={'w-full pr-3'}>
            <label
              className={
                'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              }
              for='grid-user-id'>
              Cellphone
            </label>
            <input
              name='cellphone'
              className={
                'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
              }
              id='cellphone'
              value={this.state.cellphone}
              type='number'
              placeholder='(65)9531 1217'
              onChange={this.handleChange}
              required
            />
          </div>
          <div className={'w-full pl-3'}>
            <label
              className={
                'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              }
              for='grid-user-id'>
              Telephone
            </label>
            <input
              name='telephone'
              className={
                'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
              }
              id='telephone'
              value={this.state.telephone}
              type='number'
              placeholder='(65)9531 1217'
              onChange={this.handleChange}
              required
            />
          </div>
        </div>
        <div className={'flex flex-wrap -mx-3 mb-3'}>
          <div className={'w-full mb-3'}>
            <label
              className={
                'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              }
              for='grid-user-id'>
              Address
            </label>
            <input
              name='address'
              className={
                'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
              }
              id='address'
              value={this.state.address}
              type='text'
              required
              placeholder='25 Lower Kent Ridge Rd'
              onChange={this.handleChange}
            />
          </div>
          <div className={'w-full mb-3'}>
            <div>
              <label
                className={
                  'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                }
                for='grid-user-id'>
                Postcode
              </label>
              <input
                name='postcode'
                className={
                  'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
                }
                id='postcode'
                value={this.state.postcode}
                type='number'
                required
                placeholder='119081'
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
        <button
          className={
            'bg-gray-800 hover:bg-gray-600 text-white font-bold py-3 px-4 -mx-3 rounded'
          }
          type='submit'
          id='button'>
          Save Changes
        </button>
      </form>
    );
  }
}

AddAddress.propTypes = {
  setAddress: PropTypes.func,
};

export default connect(null, { setAddress })(AddAddress);
