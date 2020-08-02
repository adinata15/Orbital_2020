import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import LoginForm from './LoginForm.js';

class SigninBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = e => {
    this.setState({
      open: false,
    });
    return;
  };

  render() {
    return (
      <Fragment>
        <button
          className={
            'float-right mx-2 my-2 bg-red-800 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
          }
          onClick={this.handleClickOpen}
          hidden={this.props.isAuthenticated} //uncomment for real thing
        >
          Log In
        </button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <LoginForm handleClose={this.handleClose} />
        </Dialog>
      </Fragment>
    );
  }
}

SigninBtn.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(SigninBtn);
