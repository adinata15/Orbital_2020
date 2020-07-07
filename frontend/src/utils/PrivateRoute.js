import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = (props) => {
  if (!props.isAuthenticated) return <Redirect to='/signup' />;
  else {
    return <Route path={props.path} component={props.component} />;
  }
  // Show the component only when the user is logged in
  // Otherwise, redirect the user to /signup page
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(PrivateRoute);
