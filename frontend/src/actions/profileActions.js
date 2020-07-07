import axios from 'axios';
import { setAlert } from './alertActions';
import {
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_PIC,
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
  } catch (err) {
    dispatch({
      type: EDIT_PROFILE_FAIL,
      payload: err,
    });
  }
};
