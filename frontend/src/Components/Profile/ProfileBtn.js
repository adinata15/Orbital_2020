import React from 'react';
import { Route, Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/loginActions';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Image from '../../images/plus.jpg';

function ProfileBtn(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <img
        class='h-8 w-8 my-3 ml-3 float-right'
        onClick={handleClick}
        src={Image}
        hidden={!props.isAuthenticated}
      />

      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <Link
            to={() => {
              return `/edit/profile/${props.accounttype}`;
            }}>
            Edit profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to='/myaccount'>My account</Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.logout();
            handleClose();
          }}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

ProfileBtn.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  accounttype: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  accounttype: state.auth.user.accounttype,
});

export default connect(mapStateToProps, { logout })(ProfileBtn);
