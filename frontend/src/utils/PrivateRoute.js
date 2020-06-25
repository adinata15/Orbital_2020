import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { isLogin } from "../utils";

const PrivateRoute = ({ isLogged, component: Component, ...rest }) => {
	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to /signin page
		<Route
			{...rest}
			render={(props) =>
				isLogged ? <Component {...props} /> : <Redirect to="/home" />
			}
		/>
	);
};

export default PrivateRoute;
