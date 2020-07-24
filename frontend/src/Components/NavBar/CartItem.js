import React from 'react';
import Minus from '../../images/minus.svg';
import Add from '../../images/add.svg';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  uncartItem,
  cartIncreaseOne,
  cartDecreaseOne,
} from '../../actions/shopActions';

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false,
    };
  }
  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleClick = (e) => {
    this.setState({
      anchorEl: e.currentTarget,
    });
  };

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
                'pt-4 pl-4 text-base opacity-50 font-bold items-center justify-start'
              }>
              {this.props.item.brand}
            </p>
            <h1 className={'text-xl pl-4 font-bold pt-0 '}>
              {this.props.item.title}
            </h1>
            <div>
              <p className={'pt-1 pl-4 text-base justify-start'}>
                Price/item: ${this.props.item.price}
              </p>
              <p className={'pt-1 pl-4 text-base justify-start'}>
                Size: {this.props.item.size}
              </p>
              <p
                className={
                  'flex flex-row items-center pt-1 pl-4 text-base justify-start'
                }>
                Quantity:
                <img
                  onClick={() => {
                    this.props.cartDecreaseOne(
                      this.props.item.item,
                      this.props.item.size
                    );
                  }}
                  className={'mx-2 w-4 h-4'}
                  src={Minus}
                  alt='minus'
                />
                {this.props.item.quantity}
                <img
                  onClick={() => {
                    this.props.cartIncreaseOne(
                      this.props.item.item,
                      this.props.item.size
                    );
                  }}
                  className={'mx-2 w-4 h-4'}
                  src={Add}
                  alt='plus'
                />
              </p>
            </div>

            <button
              onClick={() => {
                this.props.uncartItem(
                  this.props.item.item,
                  this.props.item.size
                );
              }}
              className={
                'border-1 bg-red-600 mx-2 my-2 hover:bg-red-900 text-white font-bold py-2 px-8 rounded'
              }>
              Remove item
            </button>
          </div>
          <div className={'w-32 h-32 float-right'}>
            <img
              src={this.props.item.image}
              alt=''
              className={' w-32 object-cover h-32 rounded-lg shadow-2xl block'}
            />
          </div>
        </div>
      </div>
    );
  }
}

CartItem.propTypes = {
  uncartItem: PropTypes.func,
  cartIncreaseOne: PropTypes.func,
  cartDecreaseOne: PropTypes.func,
};

export default connect(null, { uncartItem, cartIncreaseOne, cartDecreaseOne })(
  CartItem
);
