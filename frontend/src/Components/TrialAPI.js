import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Divider } from "@material-ui/core";
import { login, logout } from "../actions";

export default function TrialAPI() {
	const isLogged = useSelector((state) => state.isLogged);
	const dispatch = useDispatch();
	// state = {
	// 	persons: [],
	// };

	//this is connected to the backend
	// componentDidMount() {
	// 	axios.get("/api/users/buyer").then((res) => {
	// 		const persons = res.data;
	// 		this.setState({ persons });
	// 	});
	// }
	return (
		<div>
			{isLogged ? <p>You are in</p> : <p>Bye</p>}
			<button
				onClick={() => {
					dispatch(login());
				}}
			>
				in
			</button>
			<button
				onClick={() => {
					dispatch(logout());
				}}
			>
				out
			</button>
		</div>
		// <ul>
		// 	{this.state.persons.map((person) => (
		// 		<li>{person.name}</li>
		// 	))}
		// </ul>
	);
}
