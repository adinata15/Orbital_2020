import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import LoginForm from "./LoginForm.js";

export default class FormDialog extends Component {
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

	handleClose = (e) => {
		this.setState({
			open: false,
		});
		console.log("close");
		e.preventDefault();
		return;
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
					<LoginForm
						login={this.props.login}
						// logout={this.props.logout}
						handleClose={this.handleClose}
					/>
				</Dialog>
			</span>
		);
	}
}
