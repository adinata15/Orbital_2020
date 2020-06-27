// use Link instead of a+href to prevent website from reloading
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SigninBtn from '../SignIn/SigninBtn.js';
import FitAssistBtn from './FitAssistBtn';
import CartBtn from './CartBtn';
import ProfileBtn from '../Profile/ProfileBtn.js';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <Fragment>
        <div className="navbar">
          <Link to="/home">Home</Link>
          <div className="subnav">
            <button className="subnavbtn">Men </button>
            <div className="subnav-content">
              <Link
                onClick={e => this.props.menuSelect(e.target.name)}
                name="men-shirt"
                to="/shop"
              >
                Shirts
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
            </div>
          </div>
          <div className="subnav">
            <button className="subnavbtn">Women</button>
            <div className="subnav-content ">
              <Link
                onClick={e => this.props.menuSelect(e.target.name)}
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
            </div>
          </div>

          <div className="subnav">
            <FitAssistBtn />
          </div>

          {/* everything down should be restricted to private */}

          <SigninBtn
            isLogged={this.props.isLogged}
            login={this.props.login}
            getUserInfo={this.props.getUserInfo}
            class="float-right"
          />
          <ProfileBtn
            accounttype={this.props.user.accounttype}
            logout={this.props.logout}
            isLogged={this.props.isLogged}
          />
          <CartBtn token={this.props.token} />
        </div>
      </Fragment>
    );
  }
}

export default NavBar;
