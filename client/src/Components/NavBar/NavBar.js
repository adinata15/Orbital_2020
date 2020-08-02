// use Link instead of a+href to prevent website from reloading

import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { menuSelect } from '../../actions/menuSelect';

import SigninBtn from '../SignIn/SigninBtn.js';
import CartBtn from './CartBtn';
import WishlistBtn from './WishlistBtn';
import ProfileBtn from '../Profile/ProfileBtn.js';

import BestFitLogo from '../../images/BestFitLogo.png';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  sellItems = () => {
    if (this.props.accounttype === 'seller')
      return <Link to="/sell">Sell new item</Link>;
  };

  render() {
    return (
      <div className="navbar">
        <Link to="/">
          <img className={'w-32 h-8 object-cover'} src={BestFitLogo} alt="" />
        </Link>
        <div className="subnav">
          <button className="subnavbtn">Men </button>
          <div className="subnav-content">
            <Link
              onClick={e => this.props.menuSelect(e.target.name)}
              name="men-shirt"
              className={'ml-10'}
              to="/shop"
            >
              Shirt
            </Link>
            <Link
              onClick={e => this.props.menuSelect(e.target.name)}
              name="men-tshirt"
              to="/shop"
            >
              T-Shirt
            </Link>
            <Link
              onClick={e => this.props.menuSelect(e.target.name)}
              name="men-pants"
              to="/shop"
            >
              Pants
            </Link>
            <Link
              onClick={e => this.props.menuSelect(e.target.name)}
              name="men-shorts"
              to="/shop"
            >
              Shorts
            </Link>
            <Link
              onClick={e => this.props.menuSelect(e.target.name)}
              name="men-jeans"
              to="/shop"
            >
              Jeans
            </Link>
          </div>
        </div>
        <div className="subnav">
          <button className="subnavbtn">Women</button>
          <div className="subnav-content ">
            <Link
              onClick={e => this.props.menuSelect(e.target.name)}
              className={'ml-20'}
              name="women-dress"
              to="/shop"
            >
              Dress
            </Link>
            <Link
              onClick={e => this.props.menuSelect(e.target.name)}
              name="women-shirt"
              to="/shop"
            >
              Shirt
            </Link>
            <Link
              onClick={e => this.props.menuSelect(e.target.name)}
              name="women-tshirt"
              to="/shop"
            >
              T-Shirt
            </Link>
            <Link
              onClick={e => this.props.menuSelect(e.target.name)}
              name="women-skirt"
              to="/shop"
            >
              Skirt
            </Link>
            <Link
              onClick={e => this.props.menuSelect(e.target.name)}
              name="women-pants"
              to="/shop"
            >
              Pants
            </Link>
            <Link
              onClick={e => this.props.menuSelect(e.target.name)}
              name="women-jeans"
              to="/shop"
            >
              Jeans
            </Link>
          </div>
        </div>

        <div className="subnav">
          <Link to="/fit-assist">Fit Assistant</Link>
        </div>

        {this.sellItems()}

        <SigninBtn />
        <ProfileBtn />
        <CartBtn />
        <WishlistBtn />
      </div>
    );
  }
}

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool,
  menuSelect: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  accounttype: state.auth.user.accounttype,
});

export default connect(mapStateToProps, { menuSelect })(NavBar);
