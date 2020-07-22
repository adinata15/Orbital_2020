import {
  MENU,
  GET_SIZE_RECOMMENDATION,
  FAIL_SIZE_RECOMMENDATION,
} from '../actions/types';

const initialState = {
  menuChosen: 'men',
  sizeRecommedation: '...',
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
      return {
        ...state,
        sizeRecommedation: action.payload,
      };
    default:
      return state;
  }
};
export default menu;
