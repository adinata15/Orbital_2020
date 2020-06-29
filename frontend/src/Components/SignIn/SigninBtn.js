import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
		// e.preventDefault();
		return;
	};

	render() {
		return (
			<span>
				<Button
					class=" float-right mx-2 my-2 bg-red-800 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
					onClick={this.handleClickOpen}
					hidden={this.props.isLogged} //uncomment for real thing
				>
					{this.props.isLogged ? <span>Testing</span> : <span>Login</span>}
				</Button>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title"
				>
					<LoginForm
						login={this.props.login}
						getUserInfo={this.props.getUserInfo}
						// logout={this.props.logout}
						handleClose={this.handleClose}
					/>
				</Dialog>
			</span>
		);
	}
}
