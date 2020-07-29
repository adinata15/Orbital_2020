import axios from "axios";
import { setAlert } from "./alertActions";
import { loadUser } from "./loginActions";

import {
	EDIT_PROFILE_SUCCESS,
	EDIT_PROFILE_FAIL,
	EDIT_PROFILE_PIC,
	EDIT_ADDRESS,
	SET_ADDRESS,
	GET_ADDRESS,
	DELETE_ADDRESS,
	UPDATE_BILLING_ADDRESS,
	UPDATE_SHIPPING_ADDRESS,
	SET_BILLING_ADDRESS,
	SET_SHIPPING_ADDRESS,
	GET_STRIPE_ACCOUNT,
	EDIT_LISTING,
	CHOOSE_LISTING,
	GET_LISTINGS,
	DELETE_LISTING,
	GET_ORDER,
	GET_ORDER_FAIL,
	LOADING,
} from "./types";

//Edit profile
export const editProfile = (userData, accounttype) => async (dispatch) => {
	try {
		const res = await axios.put(
			`http://localhost:5000/api/users/${accounttype}`,
			userData
		);
		dispatch({
			type: EDIT_PROFILE_SUCCESS,
			payload: res.data,
		});
		dispatch(setAlert("Profile editted", "success"));
	} catch (err) {
		if (err.response.data.errors) {
			dispatch({
				type: EDIT_PROFILE_FAIL,
				payload: { msg: err.response.data.errors, status: err.response.status },
			});
			err.response.data.errors.forEach((error) =>
				dispatch(setAlert(error.msg, "danger"))
			);
		} else {
			dispatch({
				type: EDIT_PROFILE_FAIL,
				payload: { msg: err.response.data.msg, status: err.response.status },
			});
			console.log(err.response.data);
			dispatch(setAlert(err.response.data.msg, "danger"));
		}
	}
};

//Upload profile picture
export const uploadProfilePic = (pictureData) => async (dispatch) => {
	try {
		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
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
		dispatch(setAlert("Profile picture uploaded", "success"));
	} catch (err) {
		dispatch({
			type: EDIT_PROFILE_FAIL,
			payload: { msg: err.response.data.msg, status: err.response.status },
		});
		console.log(err.response.data);
		dispatch(setAlert(err.response.data.msg, "danger"));
	}
};

//Set address
export const setAddress = (address) => async (dispatch) => {
	try {
		const res = await axios.post(
			`http://localhost:5000/api/users/buyer/address`,
			address
		);

		dispatch({
			type: SET_ADDRESS,
			payload: res.data,
		});
		dispatch(getAddress());
		dispatch(loadUser());
		dispatch(setAlert("Address added", "success"));
	} catch (err) {
		if (err.response.data.errors) {
			dispatch({
				type: EDIT_PROFILE_FAIL,
				payload: { msg: err.response.data.errors, status: err.response.status },
			});
			err.response.data.errors.forEach((error) =>
				dispatch(setAlert(error.msg, "danger"))
			);
		} else {
			dispatch({
				type: EDIT_PROFILE_FAIL,
				payload: { msg: err.response.data.msg, status: err.response.status },
			});
			console.log(err.response.data);
			dispatch(setAlert(err.response.data.msg, "danger"));
		}
	}
};

//Set billing address
export const setBillingAddress = (address) => async (dispatch) => {
	try {
		let body = JSON.stringify(address);

		const res = await axios.post(
			`http://localhost:5000/api/users/buyer/address/billingaddress`,
			body
		);

		dispatch({
			type: SET_BILLING_ADDRESS,
			payload: res.data,
		});
		dispatch(getAddress());
	} catch (err) {
		if (err.response.data.errors) {
			dispatch({
				type: EDIT_PROFILE_FAIL,
				payload: { msg: err.response.data.errors, status: err.response.status },
			});
			err.response.data.errors.forEach((error) =>
				dispatch(setAlert(error.msg, "danger"))
			);
		} else {
			dispatch({
				type: EDIT_PROFILE_FAIL,
				payload: { msg: err.response.data.msg, status: err.response.status },
			});
			console.log(err.response.data);
			dispatch(setAlert(err.response.data.msg, "danger"));
		}
	}
};

//Set shipping address
export const setShippingAddress = (address) => async (dispatch) => {
	try {
		let body = JSON.stringify(address);

		const res = await axios.post(
			`http://localhost:5000/api/users/buyer/address/shippingaddress`,
			body
		);

		dispatch({
			type: SET_SHIPPING_ADDRESS,
			payload: res.data,
		});
		dispatch(getAddress());
	} catch (err) {
		if (err.response.data.errors) {
			dispatch({
				type: EDIT_PROFILE_FAIL,
				payload: { msg: err.response.data.errors, status: err.response.status },
			});
			err.response.data.errors.forEach((error) =>
				dispatch(setAlert(error.msg, "danger"))
			);
		} else {
			dispatch({
				type: EDIT_PROFILE_FAIL,
				payload: { msg: err.response.data.msg, status: err.response.status },
			});
			console.log(err.response.data);
			dispatch(setAlert(err.response.data.msg, "danger"));
		}
	}
};

//Update billing address
export const updateBillingAddress = (address_id) => async (dispatch) => {
	try {
		const res = await axios.put(
			`http://localhost:5000/api/users/buyer/billingaddress/${address_id}`
		);

		dispatch({
			type: UPDATE_BILLING_ADDRESS,
			payload: res.data,
		});

		dispatch(getAddress());
		dispatch(setAlert("Billing address updated", "success"));
	} catch (err) {
		dispatch({
			type: EDIT_PROFILE_FAIL,
			payload: { msg: err.response.data.msg, status: err.response.status },
		});
		console.log(err.response.data);
		dispatch(setAlert(err.response.data.msg, "danger"));
	}
};

//Update shipping address
export const updateShippingAddress = (address_id) => async (dispatch) => {
	try {
		const res = await axios.put(
			`http://localhost:5000/api/users/buyer/shippingaddress/${address_id}`
		);

		dispatch({
			type: UPDATE_SHIPPING_ADDRESS,
			payload: res.data,
		});

		dispatch(getAddress());
		dispatch(setAlert("Shipping address updated", "success"));
	} catch (err) {
		dispatch({
			type: EDIT_PROFILE_FAIL,
			payload: { msg: err.response.data.msg, status: err.response.status },
		});
		console.log(err.response.data);
		dispatch(setAlert(err.response.data.msg, "danger"));
	}
};

//Get all user address
export const getAddress = () => async (dispatch) => {
	try {
		const res = await axios.get(
			`http://localhost:5000/api/users/buyer/address`
		);

		dispatch({
			type: GET_ADDRESS,
			payload: res.data,
		});
	} catch (err) {
		dispatch(setAlert("Fail to get addresses", "danger"));
		dispatch({
			type: EDIT_PROFILE_FAIL,
		});
	}
};

//Get all user orders
export const getOrder = (accounttype) => async (dispatch) => {
	try {
		const res = await axios.get(
			`http://localhost:5000/api/users/${accounttype}/orders`
		);
		dispatch({ type: LOADING });

		dispatch({
			type: GET_ORDER,
			payload: res.data,
		});
	} catch (err) {
		dispatch(setAlert("Fail to get orders", "danger"));
		dispatch({
			type: GET_ORDER_FAIL,
		});
	}
};

//Edit user address
export const editAddress = (addressData, address_id) => async (dispatch) => {
	try {
		const res = await axios.put(
			`http://localhost:5000/api/users/buyer/address/${address_id}`,
			addressData
		);

		dispatch({
			type: EDIT_ADDRESS,
			payload: res.data,
		});

		dispatch(getAddress());
		dispatch(setAlert("Address editted", "success"));
	} catch (err) {
		if (err.response.data.errors) {
			dispatch({
				type: EDIT_PROFILE_FAIL,
				payload: { msg: err.response.data.errors, status: err.response.status },
			});
			err.response.data.errors.forEach((error) =>
				dispatch(setAlert(error.msg, "danger"))
			);
		} else {
			dispatch({
				type: EDIT_PROFILE_FAIL,
				payload: { msg: err.response.data.msg, status: err.response.status },
			});
			console.log(err.response.data);
			dispatch(setAlert(err.response.data.msg, "danger"));
		}
	}
};

//Edit user listing
export const editListing = (itemData, item_id) => async (dispatch) => {
	try {
		console.log("EDIT LISTING");
		console.log(itemData);
		const res = await axios.put(
			`http://localhost:5000/api/users/seller/item/${item_id}`,
			itemData
		);

		dispatch({
			type: EDIT_LISTING,
			payload: res.data,
		});

		dispatch(setAlert("Item editted", "success"));
	} catch (err) {
		if (err.response.data.errors) {
			dispatch({
				type: EDIT_PROFILE_FAIL,
				payload: { msg: err.response.data.errors, status: err.response.status },
			});
			err.response.data.errors.forEach((error) =>
				dispatch(setAlert(error.msg, "danger"))
			);
		} else {
			dispatch({
				type: EDIT_PROFILE_FAIL,
				payload: { msg: err.response.data.msg, status: err.response.status },
			});
			console.log(err.response.data);
			dispatch(setAlert(err.response.data.msg, "danger"));
		}
	}
};

//Delete user address
export const deleteAddress = (address_id) => async (dispatch) => {
	try {
		const res = await axios.delete(
			`http://localhost:5000/api/users/buyer/address/${address_id}`
		);

		dispatch({
			type: DELETE_ADDRESS,
			payload: res.data,
		});

		dispatch(getAddress());
		dispatch(setAlert("Address deleted", "success"));
	} catch (err) {
		dispatch({
			type: EDIT_PROFILE_FAIL,
			payload: { msg: err.response.data.msg, status: err.response.status },
		});
		console.log(err.response.data);
		dispatch(setAlert(err.response.data.msg, "danger"));
	}
};

//Delete user listing
export const deleteListing = (item_id) => async (dispatch) => {
	try {
		const res = await axios.delete(
			`http://localhost:5000/api/users/seller/item/${item_id}`
		);

		await dispatch({
			type: DELETE_LISTING,
			payload: res.data,
		});

		dispatch(setAlert("Item deleted", "success"));
	} catch (err) {
		dispatch({
			type: EDIT_PROFILE_FAIL,
			payload: { msg: err.response.data.msg, status: err.response.status },
		});
		console.log(err.response.data);
		dispatch(setAlert(err.response.data.msg, "danger"));
	}
};

//Get stripeseller account setup
export const getStripeSeller = (state, oauth) => async (dispatch) => {
	try {
		const res = await axios.get(
			`http://localhost:5000/api/stripe/connect/oauth?code=${oauth}&state=${state}`
		);

		await dispatch({
			type: GET_STRIPE_ACCOUNT,
			payload: res.data,
		});
		await dispatch(setAlert("Successfully set stripe account", "success"));
	} catch (err) {
		dispatch(setAlert("Fail to set stripe account", "danger"));
	}
};

//Get listings for a seller
export const getListings = (sellerId) => async (dispatch) => {
	try {
		const res = await axios.get(`http://localhost:5000/api/users/${sellerId}`);

		await dispatch({
			type: GET_LISTINGS,
			payload: res.data.listings ? res.data.listings : [],
		});
		// await dispatch(setAlert('Retrived listings', 'success'));
	} catch (err) {
		dispatch(setAlert("Fail to get listings", "danger"));
	}
};

//Choose and update listing
export const chooseListing = (chosenListing) => async (dispatch) => {
	dispatch({
		type: CHOOSE_LISTING,
		payload: chosenListing,
	});
};
