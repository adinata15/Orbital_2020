//left shipping and billing address
//need to do pasword confirmation
//gender cant update
//editting file upload

import React from 'react';
import omit from 'lodash.omit';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editAddress } from '../../actions/profileActions';

class EditAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.user,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let userData = { ...this.state };

    if (this.state.password) {
      userData = omit(userData, 'oldPassword', 'newPassword', 'newPassword2');
    }

    this.props.editProfile(userData);
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} class='w-full max-w-lg mx-auto my-6'>
        <h1 class='text-center text-3xl mb-3'>Edit Profile</h1>

        <div class='flex flex-wrap -mx-3 mb-6'>
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
                value={this.state.shippingaddress}
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
              <label
                class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                for='grid-user-id'>
                Billing address
              </label>
              <input
                name='mailAddress'
                class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
                id='mailAddress'
                value={this.state.billingaddress}
                type='text'
                password
                placeholder='25 Lower Kent Ridge Rd, Singapore 119081'
                onChange={this.handleChange}
              />
            </div>
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

EditAddress.propTypes = {
  editProfile: PropTypes.func,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { editProfile })(EditAddress);
