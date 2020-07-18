import axios from 'axios';
import { setAlert } from './alertActions';

import {
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_PIC,
  EDIT_ADDRESS,
  SET_ADDRESS,
  GET_ADDRESS,
  GET_LISTING_DATA,
  DELETE_ADDRESS,
  UPDATE_BILLING_ADDRESS,
  UPDATE_SHIPPING_ADDRESS,
  SET_BILLING_ADDRESS,
  SET_SHIPPING_ADDRESS,
  EDIT_LISTING,
  DELETE_LISTING,
  GET_ORDER,
  GET_ORDER_FAIL,
  LOADING,
} from './types';

//Edit profile
export const editProfile = (userData) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/users/${userData.accounttype}`,
      userData
    );

    dispatch({
      type: EDIT_PROFILE_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert('Profile editted', 'success'));
  } catch (err) {
    dispatch({
      type: EDIT_PROFILE_FAIL,
      payload: err,
    });
  }
};

//Upload profile picture
export const uploadProfilePic = (pictureData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const res = await axios.post(
      `http://localhost:5000/api/users/seller/profile_pict`,
      pictureData,
      config
    );

    dispatch({
      type: EDIT_PROFILE_PIC,
      payload: res.data,
    });
    dispatch(setAlert('Profile picture uploaded', 'success'));
  } catch (err) {
    dispatch({
      type: EDIT_PROFILE_FAIL,
      payload: err,
    });
  }
};

//Set address
export const setAddress = (address) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:5000/api/users/buyer/address`,
      address
    );

    dispatch({
      type: SET_ADDRESS,
      payload: res.data,
    });
    dispatch(getAddress());
    dispatch(setAlert('Address added', 'success'));
  } catch (err) {
    dispatch({
      type: EDIT_PROFILE_FAIL,
      payload: err,
    });
  }
};

//Set billing address
export const setBillingAddress = (address) => async (dispatch) => {
  try {
    let body = JSON.stringify(address);

    const res = await axios.post(
      `http://localhost:5000/api/users/buyer/address/billingaddress`,
      body
    );

    dispatch({
      type: SET_BILLING_ADDRESS,
      payload: res.data,
    });
    dispatch(getAddress());
  } catch (err) {
    dispatch({
      type: EDIT_PROFILE_FAIL,
      payload: err,
    });
  }
};

//Set shipping address
export const setShippingAddress = (address) => async (dispatch) => {
  try {
    let body = JSON.stringify(address);

    const res = await axios.post(
      `http://localhost:5000/api/users/buyer/address/shippingaddress`,
      body
    );

    dispatch({
      type: SET_SHIPPING_ADDRESS,
      payload: res.data,
    });
    dispatch(getAddress());
  } catch (err) {
    dispatch({
      type: EDIT_PROFILE_FAIL,
      payload: err,
    });
  }
};

//Update billing address
export const updateBillingAddress = (address_id) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/users/buyer/billingaddress/${address_id}`
    );

    dispatch({
      type: UPDATE_BILLING_ADDRESS,
      payload: res.data,
    });

    dispatch(getAddress());
  } catch (err) {
    dispatch({
      type: EDIT_PROFILE_FAIL,
      payload: err,
    });
  }
};

//Update shipping address
export const updateShippingAddress = (address_id) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/users/buyer/shippingaddress/${address_id}`
    );

    dispatch({
      type: UPDATE_SHIPPING_ADDRESS,
      payload: res.data,
    });

    dispatch(getAddress());
  } catch (err) {
    dispatch({
      type: EDIT_PROFILE_FAIL,
      payload: err,
    });
  }
};

//Get all user address
export const getAddress = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/users/buyer/address`
    );

    dispatch({
      type: GET_ADDRESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EDIT_PROFILE_FAIL,
      payload: err,
    });
  }
};

//Creat checkout order
export const getCheckout = (order) => async (dispatch) => {
  try {
    let orderData = JSON.stringify(order);

    const res = await axios.post(
      'http://localhost:5000/api/items/create-order',
      orderData
    );

    dispatch({
      type: CHECKOUT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EDIT_PROFILE_FAIL,
      payload: err,
    });
  }
};

//Get all user address
export const getOrder = (accounttype) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/users/${accounttype}/orders`
    );
    dispatch({ type: LOADING });

    dispatch({
      type: GET_ORDER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ORDER_FAIL,
      payload: err,
    });
  }
};

//Edit user address
export const editAddress = (addressData, address_id) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/users/buyer/address/${address_id}`,
      addressData
    );

    dispatch({
      type: EDIT_ADDRESS,
      payload: res.data,
    });

    dispatch(getAddress());
    dispatch(setAlert('Address editted', 'success'));
  } catch (err) {
    dispatch({
      type: EDIT_PROFILE_FAIL,
      payload: err,
    });
  }
};

//Edit user listing
export const editListing = (itemData, item_id) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/users/seller/item/${item_id}`,
      itemData
    );

    dispatch({
      type: EDIT_LISTING,
      payload: res.data,
    });

    dispatch(setAlert('Item editted', 'success'));
  } catch (err) {
    dispatch({
      type: EDIT_PROFILE_FAIL,
      payload: err,
    });
  }
};

//Delete user address
export const deleteAddress = (address_id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/users/buyer/address/${address_id}`
    );

    dispatch({
      type: DELETE_ADDRESS,
      payload: res.data,
    });

    dispatch(getAddress());
    dispatch(setAlert('Address deleted', 'success'));
  } catch (err) {
    dispatch({
      type: EDIT_PROFILE_FAIL,
      payload: err,
    });
  }
};

//Delete user listing
export const deleteListing = (item_id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/users/seller/item/${item_id}`
    );

    dispatch({
      type: DELETE_LISTING,
      payload: res.data,
    });

    dispatch(setAlert('Item deleted', 'success'));
  } catch (err) {
    dispatch({
      type: EDIT_PROFILE_FAIL,
      payload: err,
    });
  }
};
