import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  ACCOUNT_DELETED,
  EDIT_PROFILE_SUCCESS,
  EDIT_ADDRESS,
  GET_ADDRESS,
  SET_ADDRESS,
  SET_BILLING_ADDRESS,
  SET_SHIPPING_ADDRESS,
  EDIT_PROFILE_FAIL,
  DELETE_ADDRESS,
  UPDATE_BILLING_ADDRESS,
  UPDATE_SHIPPING_ADDRESS,
  POST_ITEM,
  EDIT_LISTING,
  DELETE_LISTING,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: {
    listings: [],
    billingaddress: {},
    shippingaddress: {},
    addresses: [], // if it's an array,
  },
  addresses: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    //For seller
    case DELETE_LISTING:
    case EDIT_LISTING:
    case POST_ITEM:
      return {
        ...state,
        user: {
          ...state.user,
          listings: payload,
        },
      };

    //For buyer
    case UPDATE_BILLING_ADDRESS:
    case SET_BILLING_ADDRESS:
      return {
        ...state,
        user: {
          ...state.user,
          billingaddress: payload,
        },
      };

    case UPDATE_SHIPPING_ADDRESS:
    case SET_SHIPPING_ADDRESS:
      return {
        ...state,
        user: {
          ...state.user,
          shippingaddress: payload,
        },
      };

    case EDIT_ADDRESS:
    case SET_ADDRESS:
    case DELETE_ADDRESS:
      return {
        ...state,
        user: {
          ...state.user,
          addresses: payload,
        },
      };

    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        user: payload,
      };

    case GET_ADDRESS:
      return {
        ...state,
        addresses: payload,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
