//here we are just saying what we want to do
// everything her will then we given to reducer to be passed on
// this is the file that is gonna be called first from the main file
import axios from "axios";
import { setAlert } from "./alertActions";

import {
	MENU,
	GET_SIZE_RECOMMENDATION,
	GET_SIZE_RECOMMENDATION_ITEM,
	FAIL_SIZE_RECOMMENDATION,
} from "./types";

export const menuSelect = (category) => (dispatch) => {
	dispatch({
		type: MENU,
		payload: category,
	});
};

//Get size recommendation
export const getSizeRecommendation = (bodyData) => async (dispatch) => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const userData = JSON.stringify(bodyData);
		console.log(userData);
		const res = await axios.post(
			`http://localhost:5000/api/size-assistant`,
			userData,
			config
		);

		await dispatch({
			type: GET_SIZE_RECOMMENDATION,
			payload: res.data.recSize ? res.data.recSize : res.data.msg,
		});
		{
			res.data.recSize
				? dispatch(
						setAlert(
							`Your size recommendation is ${res.data.recSize}`,
							"success"
						)
				  )
				: dispatch(setAlert("Size not found", "danger"));
		}
	} catch (err) {
		dispatch(setAlert("Size recommendation fail", "danger"));

		dispatch({
			type: FAIL_SIZE_RECOMMENDATION,
		});
	}
};

//Get size recommendation f0r login user
export const getSizeRecommendationLogin = (bodyData, itemID) => async (
	dispatch
) => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const userData = JSON.stringify(bodyData);

		const res = await axios.post(
			`http://localhost:5000/api/items/size-assistant/${itemID}`,
			userData,
			config
		);

		await dispatch({
			type: GET_SIZE_RECOMMENDATION_ITEM,
			payload: res.data.recSize ? res.data.recSize : res.data.msg,
		});

		dispatch(setAlert("Obtained size recommendation", "success"));
	} catch (err) {
		dispatch(setAlert("Size recommendation fail", "danger"));

		dispatch({
			type: FAIL_SIZE_RECOMMENDATION,
		});
	}
};
