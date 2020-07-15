//move getdetails to here instead?

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';

import ListingDetail from './ListingDetail';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteListing } from '../../actions/profileActions';
import { setAlert } from '../../actions/alertActions';

class ListingItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listingInfo: {},
      open: false,
    };
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

  componentDidMount() {
    this.getListingData(props._id);
  }

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
    return (
      <div
        className={
          'w-56 bg-white justify-center border rounded-lg overflow-hidden mt-2 ml-2'
        }>
        <img
          onClick={this.handleOpen}
          className={'h-48 w-full justify-center'}
          src={listingInfo.images[0]}
          alt=''
        />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
          fullWidth={true}
          maxWidth={'md'}
          scroll={'body'}>
          <ListingDetail itemInfo={listingInfo} onClose={this.handleClose} />
        </Dialog>

        <div className={'p-2'}>
          <div className={'flex items-baseline'}>
            <div
              className={
                'text-gray-600 text-xs uppercase font-semibold tracking-wide'
              }>
              {listingInfo.brand}
            </div>
          </div>
          <h4 className={'mt-1 font-semibold text-lg leading-tight truncate'}>
            {listingInfo.title}
          </h4>
          <div>${listingInfo.price}</div>
        </div>
      </div>
    );
  }
}

ListingItem.propTypes = {
  setAlert: PropTypes.func,
  listings: PropTypes.array.isRequired,
  deleteListing: PropTypes.func,
};

const mapStateToProps = (state) => ({
  listings: state.auth.user.listings,
});

export default connect(mapStateToProps, {
  deleteListing,
  setAlert,
})(ListingItem);
