import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import SignUpLink from './SignUpLink';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/loginActions';

import DialogActions from '@material-ui/core/DialogActions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      accounttype: '',
    };
  }

  handleChange = (e) => {
    switch (e.target.id) {
      case 'password':
        this.setState({
          password: e.target.value,
        });
        break;
      case 'email':
        this.setState({
          email: e.target.value,
        });
        break;
      default:
        console.error();
    }
  };

  handleClick = (e) => {
    this.setState({
      accounttype: e.target.id,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let user = {
      accounttype: this.state.accounttype,
      email: this.state.email,
      password: this.state.password,
    };

    this.props.login(user);
    this.props.handleClose();
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/' />;
    }

    return (
      <Fragment>
        <form
          action=''
          onSubmit={this.handleSubmit}
          class='w-9/12 max-w-lg mx-auto my-6'>
          <span class='float-right text-xl' id='close'>
            <Link id='closeBtn' onClick={this.props.handleClose} to=''>
              &times;
            </Link>
          </span>
          <h1 class='text-center text-3xl mb-3'>Sign in</h1>
          <div class='flex flex-wrap -mx-3 mb-6'>
            <div class='w-full px-3'>
              <label
                class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                for='email'>
                Account type
              </label>

              <div class='pl-5 pb-3'>
                <input
                  type='radio'
                  id='buyer'
                  name='accounttype'
                  class='justify-center mr-2'
                  onClick={this.handleClick}
                  required
                />
                <label
                  for='accountType'
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

            <div class='w-full px-3'>
              <label
                class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                for='email'>
                Email
              </label>
              <input
                name='email'
                onChange={this.handleChange}
                class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='email'
                type='email'
                placeholder='jane@gmail.com'
                required
              />
            </div>
            <div class='w-full px-3'>
              <label
                class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                for='grid-password'>
                Password
              </label>
              <input
                name='password'
                onChange={this.handleChange}
                class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='password'
                type='password'
                placeholder='******************'
                minlength='8'
                required
              />
            </div>
          </div>
          <DialogActions>
            <button
              class='w-full float-left bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 mb-3 rounded'
              id='button'
              type='submit'>
              Log In
            </button>
          </DialogActions>
          <p class='text-xs italic'>
            Do not have an account?
            <SignUpLink handleClose={this.props.handleClose} />
          </p>
        </form>
      </Fragment>
    );
  }
}
LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.menu.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LoginForm);
