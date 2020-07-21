//items edit need size and item picture

import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.item,
    };
  }

  render() {
    return (
      <div
        className={
          'flex flex-col items-center max-w-sm rounded overflow-hidden shadow-lg'
        }>
        <img
          className={'w-1/2 h-1/2'}
          src={this.props.item.image}
          alt='Sunset in the mountains'
        />
        <div className={'px-6 py-4'}>
          <div className={'font-bold text-xl mb-2'}>The Coldest Sunset</div>
          <p className={'text-gray-700 text-base'}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div className={'px-6 py-4'}>
          <span
            className={
              'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'
            }>
            #photography
          </span>
          <span
            className={
              'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'
            }>
            #travel
          </span>
          <span
            className={
              'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700'
            }>
            #winter
          </span>
        </div>
      </div>
    );
  }
}

// OrderDetail.propTypes = {
//   editListing: PropTypes.func,
//   deleteListing: PropTypes.func,
// };

// export default connect(null, { editListing, deleteListing })(OrderDetail);
export default OrderDetail;
{
  /* <div
        className={
          'font-sans antialiased text-gray-900 leading-normal tracking-wider'
        }>
        <div
          className={
            'max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0'
          }>
          <div
            className={
              'w-full lg:w-4/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0'
            }>
            <div className={'p-4 md:p-12 text-center lg:text-left'}>
              <div className={'w-full md:w-1/2 px-3 mb-6 md:mb-0'}>
                Title: {this.props.item.title}
                Price: {this.props.item.price}
                Category: {this.props.item.category}
                Brand: {this.props.item.brand}
                 <p
                name='sizes'
                className={
                  'pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start'
                }>
                Available sizes
              </p> 
                <button
                  onClick={this.props.onClose}
                  className={
                    'flex-1 bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full'
                  }>
                  Back
                </button>
              </div>
            </div>
            <div className={'lg:w-1/5 lg:h-auto inset-y-0 right-0'}>
              <img
                src={this.props.item.image}
                className={
                  'rounded-none w-auto h-auto lg:rounded-lg shadow-2xl hidden lg:block'
                }
              />
            </div>
          </div>
        </div>
      </div> */
}
