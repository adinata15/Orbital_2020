import React from 'react';

import Cart from '../../images/cart.png';
import Heart from '../../images/broken-heart.svg';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { unlikeItem, like2cart } from '../../actions/shopActions';

class WishlistItem extends React.Component {
  render() {
    return (
      <div
        className={
          'p-2 font-sans antialiased text-gray-900 leading-normal tracking-wider'
        }>
        <div
          className={
            'max-w-md flex items-center h-auto flex-wrap mx-auto shadow-md my-3'
          }>
          <div
            className={
              'w-3/5 rounded-lg rounded-l-sm rounded-r-none mx-3 mx-0'
            }>
            <p
              className={
                'pt-4 pl-4 text-base opacity-50 font-bold items-center lg:justify-start'
              }>
              {this.props.item.brand}
            </p>
            <h1 className={'text-xl pl-4 font-bold pt-15 lg:pt-0 '}>
              {this.props.item.title}
            </h1>
            <div>
              <p className={'pt-1 pl-4 text-base justify-start'}>
                Price/item: $${this.props.item.price}
              </p>
              <p className={'pt-1 pl-4 text-base justify-start'}>
                Size: {this.props.item.size}
              </p>
              <div className='flex'>
                <img
                  name='cart'
                  className={'h-8 w-8 ml-3 my-3 right-0 bottom-0'}
                  onClick={() => {
                    this.props.like2cart(
                      this.props.item.item,
                      this.props.item.size
                    );
                  }}
                  style={{ transform: 'scaleX(-1)' }}
                  src={Cart}
                  alt=''
                />
                <img
                  name='heart'
                  className={'h-8 w-8 ml-3 my-3 right-0 bottom-0'}
                  onClick={() => {
                    this.props.unlikeItem(
                      this.props.item.item,
                      this.props.item.size
                    );
                  }}
                  src={Heart}
                  alt=''
                />
              </div>
            </div>
          </div>
          <div className={'lg:w-32 lg:h-32 float-right'}>
            <img
              src={this.props.item.image}
              alt=''
              className={
                'rounded-none w-32 object-cover h-32 lg:rounded-lg shadow-2xl lg:block'
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

WishlistItem.propTypes = {
  unlikeItem: PropTypes.func,
  like2cart: PropTypes.func,
};

export default connect(null, { unlikeItem, like2cart })(WishlistItem);
