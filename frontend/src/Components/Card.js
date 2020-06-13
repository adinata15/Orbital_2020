//not done: make multiple in one row, image not distorted
import React from "react";
import Image from "../images/green.jpg";
import ClothesDetail from "./ClothesDetail";
import Dialog from "@material-ui/core/Dialog";

class Card extends React.Component {
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
			<div class=" w-56 bg-white justify-center border rounded-lg overflow-hidden mt-2 ml-2">
				<img
					onClick={this.handleClickOpen}
					class="h-48 w-full justify-center"
					src={Image}
					alt=""
				/>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title"
					fullWidth={true}
					maxWidth={"md"}
					scroll={"body"}
				>
					<ClothesDetail onClose={this.handleClose} />
				</Dialog>

				<div class="p-2">
					<div class="flex items-baseline">
						<span class="inline-block bg-teal-200 text-teal-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
							New
						</span>
						<div class="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
							Greenery
						</div>
					</div>
					<h4 class="mt-1 font-semibold text-lg leading-tight truncate">
						Fountain of Life
					</h4>
					<div>
						Price
						<span class="text-gray-600 text-sm"> : priceless</span>
					</div>
				</div>
			</div>
		);
	}
}

export default Card;
