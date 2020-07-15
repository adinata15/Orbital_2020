import axios from 'axios';
import store from '../store';
import { setAlert } from './alertActions';
import {
  POST_ITEM,
  GET_ITEMS,
  GET_LIKED_ITEMS,
  GET_CART_ITEMS,
  POST_ERROR,
  LIKE_ITEM,
  LIKE_FAIL,
  UNLIKE_ITEM,
  LIKE_CART,
  CART_FAIL,
  CART_ITEM,
  UNCART_ITEM,
  PAY_START,
  PAY_SUCCEED,
  PAY_FAIL,
} from './types';

//Get shop items
export const getItems = (category) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/items/category/${category}`
    );
    dispatch({
      type: GET_ITEMS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get liked items
export const getLikedItems = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/users/buyer/wishlist`
    );
    dispatch({
      type: GET_LIKED_ITEMS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get cart items
export const getcartItems = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/users/buyer/cart`);
    dispatch({
      type: GET_CART_ITEMS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Like item
export const likeItem = (data, itemId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(data);

  try {
    const res = await axios.put(
      `http://localhost:5000/api/items/like/${itemId}`,
      body,
      config
    );
    dispatch({
      type: LIKE_ITEM,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LIKE_FAIL,
    });
  }
};

//Unlike item
export const unlikeItem = (item, size) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/items/unlike/${item}/${size}`
    );
    dispatch({
      type: UNLIKE_ITEM,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LIKE_FAIL,
    });
  }
};

//Like -> cart item
export const like2cart = (item, size) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/items/wishlist/cart/${item}/${size}`
    );
    dispatch({
      type: LIKE_CART,
      payload: res.data,
      //   item: item,
    });
    console.log(res.data);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LIKE_FAIL,
    });
  }
};

//Cart item
export const cartItem = (data, itemId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(data);

  try {
    const res = await axios.put(
      `http://localhost:5000/api/items/cart/${itemId}`,
      body,
      config
    );
    dispatch({
      type: CART_ITEM,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: CART_FAIL,
    });
  }
};

//Uncart item
export const uncartItem = (item, size) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/items/uncart/${item}/${size}`
    );
    dispatch({
      type: UNCART_ITEM,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LIKE_FAIL,
    });
  }
};

//Pay cart item
export const payItems = (cartItem) => async (dispatch) => {
  let stripe = store.getState().shop.stripe;

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let body = JSON.stringify(cartItem);

    const res = await axios.post(
      'http://localhost:5000/api/stripe/create-checkout-session',
      body,
      config
    );
    await dispatch({
      type: PAY_START,
      payload: res.data.sessionId,
    });

    await dispatch(checkoutStripe(stripe, res.data.sessionId));
  } catch (err) {
    const errors = err;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PAY_FAIL,
      payload: errors,
    });
  }
};

//Checkout to Stripe
export const checkoutStripe = (stripe, sessionId) => async (dispatch) => {
  try {
    const res = await stripe.redirectToCheckout({
      sessionId: sessionId,
    });
    dispatch({
      type: PAY_SUCCEED,
      payload: res,
    });
  } catch (err) {
    const errors = err;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PAY_FAIL,
      payload: errors,
    });
  }
};

//Post items
export const postItems = (itemData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const res = await axios.post(
      `http://localhost:5000/api/users/seller/item`,
      itemData,
      config
    );

    dispatch({
      type: POST_ITEM,
      payload: res.data,
    });
    dispatch(setAlert('Listed item', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};
