import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import SignUpForm from "./SignUpForm.js";
import { Link, Router } from "react-router-dom";

export default class SignUpLink extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		open2: false,
	// 	};
	// 	//this.handleClose = this.handleClose.bind(this);
	// }

	// handleClickOpen = () => {
	// 	this.setState({
	// 		open2: true,
	// 	});
	// };

	// handleClose2 = () => {
	// 	this.setState({
	// 		open2: false,
	// 	});
	// 	this.props.handleClose();
	// };
	render() {
		return (
			<Link
				class="underline text-green-600 mx-1 cursor-pointer"
				to="/signup"
				onClick={this.props.handleClose}
			>
				Sign Up
			</Link>
		);
	}
}
