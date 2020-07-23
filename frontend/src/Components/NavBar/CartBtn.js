import React, { Component, Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Image from '../../images/cart.png';
import CartForm from './CartForm';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CartBtn extends Component {
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

  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  render() {
    return (
      <Fragment>
        <img
          className={'h-8 w-8 my-3 mx-3 float-right'}
          onClick={this.handleClickOpen}
          style={{ transform: 'scaleX(-1)' }}
          src={Image}
          hidden={this.props.accounttype !== 'buyer'}
        />

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth={true}
          maxWidth={'sm'}
          scroll={'body'}>
          <CartForm handleClose={this.handleClose} />
        </Dialog>
      </Fragment>
    );
  }
}

CartBtn.propTypes = {
  accounttype: PropTypes.string,
};

const mapStateToProps = (state) => ({
  accounttype: state.auth.user.accounttype,
});

export default connect(mapStateToProps, null)(CartBtn);
