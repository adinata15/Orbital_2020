import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import ShopForm from "./ShopForm.js";
import Image from "../../images/cart.png";

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
					style={{ transform: "scaleX(-1)" }}
					src={Image}
				/>

				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth={true}
					maxWidth={"md"}
					scroll={"body"}
				>
					<ShopForm handleClose={this.handleClose} />
				</Dialog>
			</span>
		);
	}
}
