import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import SignUpForm from "./SignUpForm.js";

export default class SignUpLink extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		};
		//this.handleClose = this.handleClose.bind(this);
	}

	handleClickOpen = () => {
		this.setState({
			open: true,
		});
	};

	handleClose = () => {
		this.setState({
			open: false,
		});
		this.props.handleClose();
	};
	render() {
		return (
			<a
				onClick={this.handleClickOpen}
				class="underline text-green-600 mx-1 cursor-pointer"
			>
				Sign Up
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth={true}
					maxWidth={"md"}
					scroll={"body"}
				>
					<SignUpForm />
				</Dialog>
			</a>
		);
	}
}
