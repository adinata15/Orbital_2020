//here we are just saying what we want to do
// everything her will then we given to reducer to be passed on
// this is the file that is gonna be called first from the main file

import { MENU } from './types';

export const menuSelect = (category) => (dispatch) => {
  dispatch({
    type: MENU,
    payload: category,
  });
};
