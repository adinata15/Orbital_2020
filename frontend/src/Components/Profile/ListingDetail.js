import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cartItem, likeItem } from '../../actions/shopActions';

class ListingDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 'S',
      quantity: '',
      alert: '',
    };
    //can bind function here! (we didnt bind here because we use arrow function below)
  }

  likeItem = () => {
    let data = { size: this.state.size };
    this.props.likeItem(data, this.props.item._id);
  };

  cartItem = () => {
    if (!this.state.quantity) {
      this.setState({ alert: 'Please add desired quantity to add cart' });
    } else {
      let data = {
        size: this.state.size,
        quantity: this.state.quantity,
      };
      this.props.cartItem(data, this.props.item._id);
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    return (
      <div
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
              <div
                className={
                  'block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center'
                }>
                <img
                  className={'block h-full w-full lg:hidden rounded-lg'}
                  src={this.props.item.images[0]}
                />
              </div>

              <h1 className={'text-3xl font-bold pt-24 lg:pt-0'}>
                {this.props.item.title}
              </h1>
              <p
                className={
                  'pt-4 text-base font-bold flex items-center justify-center lg:justify-start'
                }>
                ${this.props.item.price}
              </p>
              <p
                className={
                  'pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start'
                }>
                Your size recommendation : S
              </p>
              <div className={'flex flex-wrap -mx-3 '}>
                <div className={'w-full  md:w-1/2 px-3 md:mb-0'}>
                  <label
                    className={
                      'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    }
                    for='size'>
                    Size
                  </label>
                  <div>
                    <select
                      value={this.state.size}
                      className={
                        'block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                      }
                      id='size'
                      onChange={this.handleChange}>
                      <option value='S'>S</option>
                      <option value='M'>M</option>
                      <option value='L'>L</option>
                    </select>
                  </div>
                </div>

                <div className={'w-full md:w-1/2 px-3 mb-6 md:mb-0'}>
                  <label
                    className={
                      'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    }
                    for='quantity'>
                    Quantity
                  </label>
                  <input
                    name='quantity'
                    className={
                      'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    }
                    id='quantity'
                    type='number'
                    placeholder='in pieces'
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <p className={'pt-8 text-sm'}>
                Description: {this.props.item.desc}{' '}
              </p>

              <div className={'flex pt-8 pb-8'}>
                <button
                  onClick={this.cartItem}
                  className={
                    'flex-1 bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full'
                  }>
                  Add to cart
                </button>
                <button
                  onClick={this.likeItem}
                  className={
                    'flex-1 bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full'
                  }>
                  Like
                </button>
                <button
                  onClick={this.props.onClose}
                  className={
                    'flex-1 bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full'
                  }>
                  Back to shop
                </button>
              </div>
              <p className={'text-sm text-red-600'}>{this.state.alert}</p>
            </div>
          </div>
          <div className={'lg:w-1/5 lg:h-auto inset-y-0 right-0'}>
            <img
              src={this.props.item.images[0]}
              className={
                'rounded-none w-auto h-auto lg:rounded-lg shadow-2xl hidden lg:block'
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

ListingDetail.propTypes = {
  likeItem: PropTypes.func,
  cartItem: PropTypes.func,
};

export default connect(null, { cartItem, likeItem })(ListingDetail);
