// use Link instead of a+href to prevent website from reloading

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { menuSelect } from '../../actions/menuSelect';

import SigninBtn from '../SignIn/SigninBtn.js';
import FitAssistBtn from './FitAssistBtn';
import CartBtn from './CartBtn';
import WishlistBtn from './WishlistBtn';
import ProfileBtn from '../Profile/ProfileBtn.js';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  sellItems = () => {
    if (this.props.accounttype == 'seller')
      return <Link to='/sell'>Sell items</Link>;
  };

  render() {
    return (
      <div className='navbar'>
        <Link to='/'>Home</Link>
        <div className='subnav'>
          <button className='subnavbtn'>Men </button>
          <div className='subnav-content'>
            <Link
              onClick={(e) => this.props.menuSelect(e.target.name)}
              name='men-shirt'
              to='/shop'>
              Shirts
            </Link>
            <Link
              onClick={(e) => this.props.menuSelect(e.target.name)}
              name='men-pants'
              to='/shop'>
              Pants
            </Link>
            <Link
              onClick={(e) => this.props.menuSelect(e.target.name)}
              name='men-shorts'
              to='/shop'>
              Shorts
            </Link>
          </div>
        </div>
        <div className='subnav'>
          <button className='subnavbtn'>Women</button>
          <div className='subnav-content '>
            <Link
              onClick={(e) => this.props.menuSelect(e.target.name)}
              name='women-dress'
              to='/shop'>
              Dress
            </Link>
            <Link
              onClick={(e) => this.props.menuSelect(e.target.name)}
              name='women-shirt'
              to='/shop'>
              Shirt
            </Link>
            <Link
              onClick={(e) => this.props.menuSelect(e.target.name)}
              name='women-skirt'
              to='/shop'>
              Skirt
            </Link>
            <Link
              onClick={(e) => this.props.menuSelect(e.target.name)}
              name='women-pants'
              to='/shop'>
              Pants
            </Link>
          </div>
        </div>

        <div className='subnav'>
          <FitAssistBtn />
        </div>

        {this.sellItems()}
        {/* everything down should be restricted to private */}

        <SigninBtn className='float-right' />

        <ProfileBtn />
        <CartBtn />
        <WishlistBtn />
      </div>
    );
  }
}

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  menuSelect: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  accounttype: state.auth.user.accounttype,
});

export default connect(mapStateToProps, { menuSelect })(NavBar);
