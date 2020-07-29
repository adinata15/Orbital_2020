import axios from "axios";
import store from "../store";
import { setAlert } from "./alertActions";
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
	GET_SIZE,
	CART_INCREASE_ONE,
	CART_DECREASE_ONE,
} from "./types";

//Get size recommendation
export const getSize = (data) => async (dispatch) => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const body = JSON.stringify(data);

		const res = await axios.get(
			`http://localhost:5000/api/size-assistant`,
			body,
			config
		);
		dispatch({
			type: GET_SIZE,
			payload: res.data,
		});
	} catch (err) {
		if (err.response.data.errors) {
			dispatch({
				type: POST_ERROR,
				payload: { msg: err.response.data.errors, status: err.response.status },
			});
			err.response.data.errors.forEach((error) =>
				dispatch(setAlert(error.msg, "danger"))
			);
		} else {
			dispatch({
				type: POST_ERROR,
				payload: { msg: err.response.data.msg, status: err.response.status },
			});
			console.log(err.response.data);
			dispatch(setAlert(err.response.data.msg, "danger"));
		}
	}
};

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
		dispatch(setAlert("Fail to retrieve shop items", "danger"));
		dispatch({
			type: POST_ERROR,
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
			payload: { msg: err.response.data.msg, status: err.response.status },
		});
		console.log(err.response.data);
		dispatch(setAlert(err.response.data.msg, "danger"));
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
			payload: { msg: err.response.data.msg, status: err.response.status },
		});
		console.log(err.response.data);
		dispatch(setAlert(err.response.data.msg, "danger"));
	}
};

//Like item
export const likeItem = (data, itemId) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
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
		dispatch(setAlert("Liked item", "success"));
	} catch (err) {
		if (err) {
			dispatch({
				type: LIKE_FAIL,
				payload: { msg: err.response.data.msg, status: err.response.status },
			});
			dispatch(setAlert(err.response.data.msg, "danger"));
		}
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
		dispatch(setAlert("Unliked item", "success"));
	} catch (err) {
		dispatch({
			type: LIKE_FAIL,
			payload: { msg: err.response.data.msg, status: err.response.status },
		});
		dispatch(setAlert(err.response.data.msg, "danger"));
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
		});

		dispatch(setAlert("Moved to cart", "success"));
	} catch (err) {
		dispatch({
			type: LIKE_FAIL,
			payload: { msg: err.response.data.msg, status: err.response.status },
		});
		dispatch(setAlert(err.response.data.msg, "danger"));
	}
};

//Cart item
export const cartItem = (data, itemId) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
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
		dispatch(setAlert("Moved to cart", "success"));
	} catch (err) {
		if (err.response.data.errors) {
			dispatch({
				type: CART_FAIL,
				payload: { msg: err.response.data.errors, status: err.response.status },
			});
			err.response.data.errors.forEach((error) =>
				dispatch(setAlert(error.msg, "danger"))
			);
		} else {
			dispatch({
				type: CART_FAIL,
				payload: { msg: err.response.data.msg, status: err.response.status },
			});
			console.log(err.response.data);
			dispatch(setAlert(err.response.data.msg, "danger"));
		}
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
		dispatch(setAlert("Removed from cart", "success"));
	} catch (err) {
		dispatch({
			type: CART_FAIL,
			payload: { msg: err.response.data.msg, status: err.response.status },
		});
		console.log(err.response.data);
		dispatch(setAlert(err.response.data.msg, "danger"));
	}
};

//Increase cart item by 1
export const cartIncreaseOne = (item, size) => async (dispatch) => {
	try {
		const res = await axios.put(
			`http://localhost:5000/api/items/cart/plus/${item}/${size}`
		);
		dispatch({
			type: CART_INCREASE_ONE,
			payload: res.data,
		});
		dispatch(setAlert("Added one more to cart", "success"));
	} catch (err) {
		dispatch({
			type: CART_FAIL,
			payload: { msg: err.response.data.msg, status: err.response.status },
		});
		console.log(err.response.data);
		dispatch(setAlert(err.response.data.msg, "danger"));
	}
};

//Decrease cart item by 1
export const cartDecreaseOne = (item, size) => async (dispatch) => {
	try {
		const res = await axios.put(
			`http://localhost:5000/api/items/cart/minus/${item}/${size}`
		);
		dispatch({
			type: CART_DECREASE_ONE,
			payload: res.data,
		});
		dispatch(setAlert("Reduced one from cart", "success"));
	} catch (err) {
		dispatch({
			type: CART_FAIL,
			payload: { msg: err.response.data.msg, status: err.response.status },
		});
		console.log(err.response.data);
		dispatch(setAlert(err.response.data.msg, "danger"));
	}
};

//Pay cart item
export const payItems = (cartItem) => async (dispatch) => {
	let stripe = store.getState().shop.stripe;

	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		let body = JSON.stringify(cartItem);
		const res = await axios.post(
			"http://localhost:5000/api/stripe/create-checkout-session",
			body,
			config
		);

		await dispatch({
			type: PAY_START,
			payload: res.data.sessionId,
		});

		await dispatch(checkoutStripe(stripe, res.data.sessionId));
	} catch (err) {
		dispatch({
			type: PAY_FAIL,
			payload: { msg: err.response.data.msg, status: err.response.status },
		});
		console.log(err.response.data);
		dispatch(setAlert(err.response.data.msg, "danger"));
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
		if (err) {
			dispatch(setAlert("Payment failed", "danger"));

			dispatch({
				type: PAY_FAIL,
			});
		}
	}
};

//Post items
export const postItems = (itemData) => async (dispatch) => {
	try {
		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		};

		const res = await axios.post(
			`http://localhost:5000/api/users/seller/item`,
			itemData,
			config
		);

		await dispatch({
			type: POST_ITEM,
			payload: res.data,
		});
		dispatch(setAlert("Listed item", "success"));
	} catch (err) {
		if (err.response.data.errors) {
			dispatch({
				type: POST_ERROR,
				payload: { msg: err.response.data.errors, status: err.response.status },
			});
			err.response.data.errors.forEach((error) =>
				dispatch(setAlert(error.msg, "danger"))
			);
		} else {
			dispatch({
				type: POST_ERROR,
				payload: { msg: err.response.data.msg, status: err.response.status },
			});
			console.log(err.response.data);
			dispatch(setAlert(err.response.data.msg, "danger"));
		}
	}
};
