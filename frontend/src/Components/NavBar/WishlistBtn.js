import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import WishlistForm from './WishlistForm.js';
import Image from '../../images/heart.jpg';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WishlistBtn extends Component {
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

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <span>
        <img
          className={'h-8 w-8 my-3 float-right'}
          onClick={this.handleClickOpen}
          src={Image}
          hidden={this.props.accounttype !== 'buyer'}
        />

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth={true}
          maxWidth={'sm'}
          scroll={'body'}>
          <WishlistForm handleClose={this.handleClose} />
        </Dialog>
      </span>
    );
  }
}

WishlistBtn.propTypes = {
  accounttype: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  accounttype: state.auth.user.accounttype,
});

export default connect(mapStateToProps, null)(WishlistBtn);
