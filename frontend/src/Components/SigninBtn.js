import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import LoginForm from "./LoginForm.js";

export default class FormDialog extends Component {
	constructor() {
		super();
		this.state = {
			open: false,
		};
		// this.handleClickOpen
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
	};
	render() {
		return (
			<span>
				<Button
					class=" float-right my-2 mx-3 bg-red-800 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
					onClick={this.handleClickOpen}
				>
					Sign In
				</Button>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title"
				>
					<LoginForm />
				</Dialog>
			</span>
		);
	}
}
