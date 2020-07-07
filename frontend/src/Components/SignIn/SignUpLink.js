import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import SignUpForm from './SignupForm.js';
import { Link, Router } from 'react-router-dom';

export default class SignUpLink extends Component {
  render() {
    return (
      <Link
        class='underline text-green-600 mx-1 cursor-pointer'
        to='/signup'
        onClick={this.props.handleClose}>
        Sign Up
      </Link>
    );
  }
}
