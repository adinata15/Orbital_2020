//not redirect to homw page after sign up

import React from 'react';
import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../../actions/loginActions';
import { setAlert } from '../../actions/alertActions';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conPass: '',
      pass: '',
      name: '', //this is user-id
      email: '',
      gender: 'male',
      weight: '',
      height: '',
      accounttype: '',
    };
    //this.handleClose = this.handleClose.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.pass !== this.state.conPass) {
      alert('Passwords need to match');
      return;
    } else {
      let user = {};
      if (this.state.accounttype === 'buyer') {
        user = {
          name: this.state.name, //this is user-id
          email: this.state.email,
          password: this.state.pass,
          gender: this.state.gender,
          weight: this.state.weight,
          height: this.state.height,
        };
      } else {
        user = {
          name: this.state.name, //this is user-id
          email: this.state.email,
          password: this.state.pass,
        };
      }
      this.props.register(user, this.state.accounttype);
    }
  };

  handleClick = (e) => {
    this.setState({
      accounttype: e.target.id,
    });
  };

  handleChange = (e) => {
    switch (e.target.id) {
      case 'password':
        this.setState({
          pass: e.target.value,
        });
        break;
      case 'confirmPassword':
        this.setState({
          conPass: e.target.value,
        });
        break;
      case 'user-id':
        this.setState({
          name: e.target.value,
        });
        break;
      case 'email':
        this.setState({
          email: e.target.value,
        });
        break;
      case 'gender':
        this.setState({
          gender: e.target.value,
        });
        break;
      case 'weight':
        this.setState({
          weight: e.target.value,
        });
        break;
      case 'height':
        this.setState({
          height: e.target.value,
        });
        break;
      default:
        console.error();
    }
  };

  showError = () => {
    if (this.state.pass !== this.state.conPass)
      return (
        <p class='text-sm text-red-600 italic'> Password does not match </p>
      );
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/' />;
    }

    return (
      <form onSubmit={this.handleSubmit} class='w-full max-w-lg mx-auto my-6'>
        <h1 class='text-center text-3xl mb-3'>Create Account</h1>
        <div class='flex flex-wrap -mx-3 mb-2'>
          <div class='w-full px-3'>
            <label
              class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              for='email'>
              Account type*
            </label>

            <div class='pl-5 pb-3'>
              <input
                onClick={this.handleClick}
                type='radio'
                id='buyer'
                name='accounttype'
                class='justify-center mr-2'
                required
              />
              <label
                for='accounttype'
                class=' items-center cursor-pointer mr-8 text-gray-700'>
                Buyer
              </label>

              <input
                onClick={this.handleClick}
                id='seller'
                name='accounttype'
                class='justify-center items-center mr-2'
                type='radio'
                required
              />
              <label
                for='radio2'
                class=' items-center cursor-pointer text-gray-700'>
                Seller
              </label>
            </div>
          </div>
        </div>

        <div class='flex flex-wrap -mx-3 mb-6'>
          <div class='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              for='grid-user-id'>
              User ID*
            </label>
            <input
              name='name'
              class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
              id='user-id'
              type='text'
              placeholder='Jane'
              required
              onChange={this.handleChange}
            />
          </div>

          <div class='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              for='grid-email'>
              Email*
            </label>
            <input
              name='email'
              class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
              id='email'
              type='email'
              placeholder='jane@gmail.com'
              required
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div class='flex flex-wrap -mx-3 mb-6'>
          <div class='w-full px-3'>
            <label
              class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              for='grid-password'>
              Password (8 characters minimum)*
            </label>
            <input
              name='password'
              class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='password'
              type='password'
              placeholder='******************'
              minlength='8'
              required
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div class='flex flex-wrap -mx-3 mb-4'>
          <div class='w-full px-3'>
            <label
              class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              for='grid-password'>
              Confirm password*
            </label>
            <input
              name='passwordConfirm'
              class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='confirmPassword'
              type='password'
              placeholder='******************'
              x-model='password_confirm'
              required
              onChange={this.handleChange}
            />
          </div>
          {this.showError()}
        </div>

        <div
          class='flex flex-wrap -mx-3 mb-6'
          hidden={this.state.accounttype === 'seller'}>
          <div class='w-full px-3' hidden={this.state.accounttype === 'seller'}>
            <label
              class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              for='grid-gender'>
              Gender
            </label>
            <div class='relative' hidden={this.state.accounttype === 'seller'}>
              <select
                class='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='gender'
                onChange={this.handleChange}>
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
              </select>
              <div
                class='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'
                hidden={this.state.accounttype === 'seller'}>
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

        <div
          class='flex flex-wrap -mx-3 mb-6'
          hidden={this.state.accounttype === 'seller'}>
          <div
            class='w-full md:w-1/2 px-3 mb-6 md:mb-0'
            hidden={this.state.accounttype === 'seller'}>
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
              placeholder='in kg'
              onChange={this.handleChange}
            />
          </div>

          <div
            class='w-full md:w-1/2 px-3 mb-6 md:mb-0'
            hidden={this.state.accounttype === 'seller'}>
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
              placeholder='in cm'
              onChange={this.handleChange}
            />
          </div>
        </div>

        <button
          class='bg-gray-800 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded'
          type='submit'
          id='button'>
          Create Account
        </button>
      </form>
    );
  }
}

SignUpForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(SignUpForm);
