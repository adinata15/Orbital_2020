import {
  MENU,
  GET_SIZE_RECOMMENDATION,
  FAIL_SIZE_RECOMMENDATION,
  GET_SIZE_RECOMMENDATION_ITEM,
} from '../actions/types';

const initialState = {
  menuChosen: 'men',
  sizeRecommendation: '',
};

const menu = (state = initialState, action) => {
  switch (action.type) {
    case MENU:
      return {
        ...state,
        menuChosen: action.payload,
      };
    case GET_SIZE_RECOMMENDATION:
    case FAIL_SIZE_RECOMMENDATION:
    case GET_SIZE_RECOMMENDATION_ITEM:
      return {
        ...state,
        sizeRecommendation: action.payload,
      };
    default:
      return state;
  }
};
export default menu;
