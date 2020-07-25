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
  EDIT_PROFILE_PIC,
  EDIT_PROFILE_FAIL,
  DELETE_ADDRESS,
  UPDATE_BILLING_ADDRESS,
  UPDATE_SHIPPING_ADDRESS,
  POST_ITEM,
  EDIT_LISTING,
  DELETE_LISTING,
  GET_ORDER,
  GET_ORDER_FAIL,
  LOADING,
  CHECKOUT_SUCCESS,
} from '../actions/types';

const initialState = {
  isLoading: true,
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: {
    listings: [],
    billingaddress: {},
    shippingaddress: {},
    addresses: [], // if it's an array,
    orders: [],
  },
  order: [],
  addresses: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    //For seller
    case DELETE_LISTING:
    case EDIT_LISTING:
    case POST_ITEM:
    case EDIT_PROFILE_PIC:
      return {
        ...state,
        isLoading: false,
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
        isLoading: false,

        user: {
          ...state.user,
          billingaddress: payload,
        },
      };

    case UPDATE_SHIPPING_ADDRESS:
    case SET_SHIPPING_ADDRESS:
      return {
        ...state,
        isLoading: false,

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
        isLoading: false,

        user: {
          ...state.user,
          addresses: payload,
        },
      };

    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: payload,
      };

    case GET_ADDRESS:
      return {
        ...state,
        isLoading: false,

        addresses: payload,
      };
    case CHECKOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderCurr: payload,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,

        isAuthenticated: true,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case GET_ORDER:
      return {
        ...state,
        isLoading: false,
        orders: payload,
      };
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}
