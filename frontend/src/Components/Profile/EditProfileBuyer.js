//left shipping and billing address
//need to do pasword confirmation
//gender cant update
//editting file upload

import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editProfile } from '../../actions/profileActions';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.user, password: '' };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let userData = {
      ...this.state,
    };

    this.props.editProfile(userData);
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} class='w-full max-w-lg mx-auto my-6'>
        <h1 class='text-center text-3xl mb-3'>Edit Profile</h1>

        <div class='flex flex-wrap -mx-3 mb-6'>
          <div class='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              for='grid-user-id'>
              User ID
            </label>
            <input
              name='name'
              class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
              id='name'
              value={this.state.name}
              type='text'
              placeholder='Jane'
              onChange={this.handleChange}
            />
          </div>

          <div class='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              for='grid-email'>
              Email
            </label>
            <input
              name='email'
              class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
              id='email'
              type='email'
              value={this.state.email}
              placeholder='jane@gmail.com'
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div class='flex flex-wrap -mx-3 mb-6'>
          <div class='w-full px-3'>
            <label
              class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              for='grid-user-id'>
              Shipping address
            </label>
            <input
              name='shipAddress'
              class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
              id='mailAdd'
              // value={this.state.shippingaddress}
              type='text'
              placeholder='25 Lower Kent Ridge Rd, Singapore 119081'
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div class='flex flex-wrap -mx-3 mb-6'>
          <div class='w-full px-3'>
            <label
              class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              for='grid-user-id'>
              Billing address
            </label>
            <input
              name='mailAddress'
              class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
              id='mailAddress'
              // value={this.state.billingaddress}
              type='text'
              password
              placeholder='25 Lower Kent Ridge Rd, Singapore 119081'
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div class='flex flex-wrap -mx-3 mb-6'>
          <div class='w-full px-3'>
            <label
              class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              for='grid-gender'>
              Gender
            </label>
            <div class='relative'>
              <select
                value={this.state.gender}
                class='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='gender'
                defaultValue={this.state.gender}
                onChange={this.handleChange}>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='others'>Others</option>
              </select>
              <div class='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                <svg
                  class='fill-current h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'>
                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class='flex flex-wrap -mx-3 mb-6'>
          <div class='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              for='grid-weight'>
              Weight
            </label>
            <input
              name='weight'
              class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='weight'
              type='number'
              value={this.state.weight}
              placeholder='in kg'
              onChange={this.handleChange}
            />
          </div>

          <div class='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              for='grid-height'>
              Height
            </label>
            <input
              name='height'
              class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='height'
              type='number'
              value={this.state.height}
              placeholder='in cm'
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div class='flex flex-wrap -mx-3 mb-6'>
          <div class='w-full px-3'>
            <label
              class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              for='grid-password'>
              Edit password here
            </label>
            <input
              name='password'
              class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='password'
              type='password'
              placeholder='******************'
              minlength='8'
              onChange={this.handleChange}
            />
          </div>
        </div>
        <button
          class='bg-gray-800 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded'
          type='submit'
          id='button'>
          Save Changes
        </button>
      </form>
    );
  }
}

EditProfile.propTypes = {
  editProfile: PropTypes.func,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { editProfile })(EditProfile);
