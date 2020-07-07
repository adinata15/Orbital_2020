import { MENU } from '../actions/types';

const initialState = {
  menuChosen: 'men-shirt',
};

const menu = (state = initialState, action) => {
  switch (action.type) {
    case MENU:
      return {
        ...state,
        menuChosen: action.payload,
      };
    default:
      return state;
  }
};
export default menu;
