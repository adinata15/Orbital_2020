import axios from 'axios';
import { setAlert } from './alertActions';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from './types';
import { setAuthToken } from '../utils/setAuthToken';

//Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    await dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
    dispatch({ type: CLEAR_PROFILE });
    window.location.assign('/');
  }
};

//Register user
export const register = (user, accounttype) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(user);

  try {
    const res = await axios.post(`/api/users/${accounttype}`, body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
    dispatch(setAlert('Register successful', 'success'));
  } catch (err) {
    if (err.response.data.errors) {
      dispatch({
        type: REGISTER_FAIL,
        payload: { msg: err.response.data.errors, status: err.response.status },
      });
      err.response.data.errors.forEach(error =>
        dispatch(setAlert(error.msg, 'danger'))
      );
    } else {
      dispatch({
        type: REGISTER_FAIL,
        payload: { msg: err.response.data.msg, status: err.response.status },
      });
      console.log(err.response.data);
      dispatch(setAlert(err.response.data.msg, 'danger'));
    }
  }
};

//Login user
export const login = user => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(user);

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
    dispatch(setAlert('Login successful', 'success'));
  } catch (err) {
    if (err.response.data.errors) {
      dispatch({
        type: LOGIN_FAIL,
        payload: { msg: err.response.data.errors, status: err.response.status },
      });
      err.response.data.errors.forEach(error =>
        dispatch(setAlert(error.msg, 'danger'))
      );
    } else {
      dispatch({
        type: LOGIN_FAIL,
        payload: { msg: err.response.data.msg, status: err.response.status },
      });
      console.log(err.response.data);
      dispatch(setAlert(err.response.data.msg, 'danger'));
    }
  }
};

//Logout / Clear profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
  window.location.assign('/');
};
