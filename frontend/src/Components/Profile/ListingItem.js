//why setstate for listingItem not working?

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';

import ListingDetail from './ListingDetail';
import { withProps } from '../../utils/setAuthToken';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteListing } from '../../actions/profileActions';
import { setAlert } from '../../actions/alertActions';

class ListingItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listingInfo: null,
      open: false,
    };
    this.getListingData(this.props.itemId);
  }

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  getListingData = async (item_id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/items/${item_id}`);

      this.setState({
        listingInfo: res.data,
      });
    } catch (err) {
      setAlert('Fail to obtain listings', 'error');
    }
  };

  render() {
    if (!this.state.listingInfo) {
      return (
        <div>
          <CircularProgress />
          Loading
        </div>
      );
    } else {
      return (
        <Link
          to={{
            pathname: '/edit-listing',
            listingInfo: this.state.listingInfo,
          }}>
          <div
            className={
              'w-56 bg-white justify-center border rounded-lg overflow-hidden mt-2 ml-2'
            }>
            <img
              className={'block h-48 w-full justify-center'}
              src={this.state.listingInfo.images[0]}
              alt='nothing to be shown'
            />
            <div className={'p-2'}>
              <div className={'flex items-baseline'}>
                <div
                  className={
                    'text-gray-600 text-xs uppercase font-semibold tracking-wide'
                  }>
                  {this.state.listingInfo.brand}
                </div>
              </div>
              <h4
                className={'mt-1 font-semibold text-lg leading-tight truncate'}>
                {this.state.listingInfo.title}
              </h4>
              <div>${this.state.listingInfo.price}</div>
            </div>
          </div>
        </Link>
      );
    }
  }
}

ListingItem.propTypes = {
  setAlert: PropTypes.func,
  deleteListing: PropTypes.func,
};

export default connect(null, {
  deleteListing,
  setAlert,
})(ListingItem);

{
  /* <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby='form-dialog-title'
            fullWidth={true}
            maxWidth={'md'}
            scroll={'body'}>
            <ListingDetail
              itemInfo={this.state.listingInfo}
              onClose={this.handleClose}
            />
          </Dialog> */
}
