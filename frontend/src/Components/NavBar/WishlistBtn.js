import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import WishlistForm from "./WishlistForm.js";
import Image from "../../images/heart.png";

export default class CartBtn extends Component {
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
	};
	render() {
		return (
			<span>
				<img
					class="h-8 w-8 my-3 float-right"
					onClick={this.handleClickOpen}
					src={Image}
				/>

				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth={true}
					maxWidth={"sm"}
					scroll={"body"}
				>
					<WishlistForm
						token={this.props.token}
						handleClose={this.handleClose}
					/>
				</Dialog>
			</span>
		);
	}
}
