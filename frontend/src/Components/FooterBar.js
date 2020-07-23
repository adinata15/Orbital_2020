//solved: why no css styling? styling name is in old format
import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { menuSelect } from '../actions/menuSelect';

class FooterBar extends React.Component {
  render() {
    return (
      <footer className={'flex justify-around bg-gray-800 p-3'}>
        <div className={'h-auto'}>
          <div className={'text-xl text-orange-500'}>
            <Link
              onClick={(e) => this.props.menuSelect(e.target.name)}
              name='men'
              to='/shop'>
              Men
            </Link>
          </div>
          <ul className={'text-center leading-normal '}>
            <li className={'hover:text-orange-500 hover:underline text-white'}>
              <Link
                onClick={(e) => this.props.menuSelect(e.target.name)}
                name='men-pants'
                to='/shop'>
                Pants
              </Link>
            </li>
            <li className={'hover:text-orange-500 hover:underline text-white'}>
              <Link
                onClick={(e) => this.props.menuSelect(e.target.name)}
                name='men-shirt'
                to='/shop'>
                Shirts
              </Link>
            </li>
            <li className={'hover:text-orange-500 hover:underline text-white'}>
              <Link
                onClick={(e) => this.props.menuSelect(e.target.name)}
                name='men-shorts'
                to='/shop'>
                Shorts
              </Link>
            </li>
          </ul>
        </div>

        <div className={'h-auto'}>
          <div className={'text-xl text-blue-300'}>
            <Link
              onClick={(e) => this.props.menuSelect(e.target.name)}
              name='women'
              to='/shop'>
              Women
            </Link>
          </div>
          <ul className={'text-center leading-normal'}>
            <li className={'hover:text-blue-300 hover:underline  text-white'}>
              <Link
                onClick={(e) => this.props.menuSelect(e.target.name)}
                name='women-dress'
                to='/shop'>
                Dress
              </Link>
            </li>
            <li className={'hover:text-blue-300 hover:underline  text-white'}>
              <Link
                onClick={(e) => this.props.menuSelect(e.target.name)}
                name='women-shirt'
                to='/shop'>
                Shirt
              </Link>
            </li>
            <li className={'hover:text-blue-300 hover:underline  text-white'}>
              <Link
                onClick={(e) => this.props.menuSelect(e.target.name)}
                name='women-skirt'
                to='/shop'>
                Skirt
              </Link>
            </li>
            <li className={'hover:text-blue-300 hover:underline  text-white'}>
              <Link
                onClick={(e) => this.props.menuSelect(e.target.name)}
                name='women-pants'
                to='/shop'>
                Pants
              </Link>
            </li>
          </ul>
        </div>
        <div className={'h-auto'}>
          <div className={'text-xl text-green-500'}>Fit Assistant</div>
          <ul className={'text-center leading-normal'}>
            <li className={'hover:text-green-500 hover:underline text-white'}>
              <Link to='/fit-assist'> Know your size!</Link>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}

FooterBar.propTypes = {
  menuSelect: PropTypes.func,
};

export default connect(null, { menuSelect })(FooterBar);
