import axios from "axios";
import React from "react";

const setupConfig = (token) => {
	return {
		headers: {
			"x-auth-token": token,
		},
	};
};

//to pass props down a route
const withProps = (Component, props) => {
	return function (matchProps) {
		return <Component {...props} {...matchProps} />;
	};
};

export { setupConfig, withProps };
