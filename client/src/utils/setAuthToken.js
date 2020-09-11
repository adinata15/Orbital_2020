import axios from "axios";
import React from "react";

export const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common["x-auth-token"] = token;
	} else {
		delete axios.defaults.headers.common["x-auth-token"];
	}
};

//to pass props down a route
export const withProps = (Component, props) => {
	return function (matchProps) {
		return <Component {...props} {...matchProps} />;
	};
};
