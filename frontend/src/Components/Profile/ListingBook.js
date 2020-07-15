//move getdetails to here instead?

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ListingItem from './ListingItem';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ListingBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    let listings = this.props.listings;
    return (
      <div>
        <h1 className={'py-2 px-5 text-4xl'}>My Listings</h1>
        <div class='flex flex-wrap justify-center mb-3 border-solid border-2 rounded'>
          {listings.map((listing) => {
            <ListingItem listing={listing.item} />;
          })}
        </div>

        <div className={'flex justify-end'}>
          <Link
            to='/sell'
            className={
              'bg-gray-800 w-auto my-2 mx-5 w-32 h-10 hover:bg-gray-600 text-white font-bold px-4 rounded'
            }>
            Add new listing
          </Link>
        </div>
      </div>
    );
  }
}

ListingBook.propTypes = {
  listings: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  listings: state.auth.user.listings,
});

export default connect(mapStateToProps, null)(ListingBook);
