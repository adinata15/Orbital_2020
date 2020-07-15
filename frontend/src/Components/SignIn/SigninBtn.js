import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import LoginForm from './LoginForm.js';

class SigninBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    //this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = (e) => {
    this.setState({
      open: false,
    });
    return;
  };

  render() {
    return (
      <span>
        <Button
          className={' float-right mx-2 my-2 bg-red-800 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'}
          onClick={this.handleClickOpen}
          hidden={this.props.isAuthenticated} //uncomment for real thing
        >
          {this.props.isLogged ? <span>Testing</span> : <span>Login</span>}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'>
          <LoginForm handleClose={this.handleClose} />
        </Dialog>
      </span>
    );
  }
}

SigninBtn.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(SigninBtn);
