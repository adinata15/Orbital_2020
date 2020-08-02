//like2cart has trouble updating the existing list

import {
  GET_ITEMS,
  GET_LIKED_ITEMS,
  GET_CART_ITEMS,
  LIKE_ITEM,
  LIKE_CART,
  UNLIKE_ITEM,
  CART_ITEM,
  UNCART_ITEM,
  PAY_START,
  CART_INCREASE_ONE,
  CART_DECREASE_ONE,
} from '../actions/types';

const initialState = {
  stripe: window.Stripe(
    'pk_test_51GxnjfGgFpE6He4tT6kxFKbZpYoNhNPFCQBWx6LeWBXRkhmQu5JFYq71V4XvpjHJV8nT3dEffaqVfkOHzNNLMFbU00KyFazIJN'
  ),
  sessionId: '',
  itemLiked: [],
  itemCart: [],
  itemDisplayed: [],
  item: {},
  loading: true,
};

const shop = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        itemDisplayed: action.payload,
        loading: false,
      };
    case GET_LIKED_ITEMS:
      return {
        ...state,
        itemLiked: action.payload,
        loading: false,
      };
    case GET_CART_ITEMS:
    case CART_ITEM:
    case UNCART_ITEM:
    case CART_INCREASE_ONE:
    case CART_DECREASE_ONE:
      return {
        ...state,
        itemCart: action.payload,
        loading: false,
      };
    case LIKE_ITEM:
    case UNLIKE_ITEM:
      return {
        ...state,
        itemLiked: action.payload,
      };
    case PAY_START:
      return {
        ...state,
        sessionId: action.payload,
      };
    case LIKE_CART:
      return {
        ...state,
        itemLiked: action.payload.wishlist,
        itemCart: action.payload.cart,
      };
    default:
      return state;
  }
};
export default shop;
