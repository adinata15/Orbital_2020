import React from 'react';
import WishlistItem from './WishlistItem.js';
import Alert from '../Alert.js';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLikedItems } from '../../actions/shopActions';

class WishlistForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getLikedItems();
  }

  wishlistItems = () => {
    let wishlistItems = this.props.itemLiked;

    if (wishlistItems[0]) {
      return wishlistItems.map((item) => (
        <WishlistItem key={item.id} item={item} />
      ));
    } else {
      return <p className={'text-3xl px-8 font-bold my-3'}>No liked items</p>;
    }
  };

  render() {
    return (
      <div>
        <Alert />
        <h1 className={'py-3 px-12 text-center text-3xl mb-3'}>Liked items</h1>
        {this.wishlistItems()}
        <div className={'py-3 px-12'}>
          <button
            onClick={this.props.handleClose}
            className={
              'bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-3 px-8 rounded-full'
            }>
            Back to shopping
          </button>
        </div>
      </div>
    );
  }
}

WishlistForm.propTypes = {
  getLikedItems: PropTypes.func,
  itemLiked: PropTypes.array,
};

const mapStateToProps = (state) => ({
  itemLiked: state.shop.itemLiked,
});

export default connect(mapStateToProps, { getLikedItems })(WishlistForm);
