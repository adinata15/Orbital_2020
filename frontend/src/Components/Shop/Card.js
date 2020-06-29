//not done: make multiple in one row, image not distorted
import React from "react";
import heartImg from "../../images/heart.png";
import ClothesDetail from "./ClothesDetail";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";

class Card extends React.Component {
	constructor() {
		super();
		this.state = {
			open: false,
			size: "",
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

	handleChange = (e) => {
		this.setState({
			size: e.target.value.toUpperCase(),
		});
	};

	addWishlist = () => {
		const config = {
			headers: {
				"Content-Type": "application/json",
				"x-auth-token": this.props.token,
			},
		};
		console.log(this.props.token);
		let data = { size: this.state.size };
		data = JSON.stringify(data);

		axios
			.put(
				`http://localhost:5000/api/items/wishlist/${this.props.item._id}`,
				data,
				config
			)
			.then((res) => {
				console.log(res.data);
				alert("Submitted liked data");
			})
			.catch((err) => {
				console.error(err);
				alert("Edit fail");
			});
	};

	render() {
		return (
			<div class=" w-56 bg-white justify-center border rounded-lg overflow-hidden mt-2 ml-2">
				<img
					onClick={this.handleClickOpen}
					class="h-48 w-full justify-center"
					src={this.props.item.images[0]}
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
					<ClothesDetail
						item={this.props.item}
						token={this.props.token}
						onClose={this.handleClose}
						addWishlist={this.props.addWishlist}
					/>
				</Dialog>

				<div class="p-2">
					<div class="flex items-baseline">
						<div class="text-gray-600 text-xs uppercase font-semibold tracking-wide">
							{this.props.item.brand}
						</div>
					</div>
					<h4 class="mt-1 font-semibold text-lg leading-tight truncate">
						{this.props.item.title}
					</h4>
					<div>${this.props.item.price}</div>
					<div>
						<label>Size: </label>
						<input
							name="size"
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							type="text"
							placeholder="XS/S/M/L/XL"
							value={this.props.item.size}
							required
							onChange={this.handleChange}
						/>
					</div>
					<img
						class="h-8 w-8 my-3 float-right"
						onClick={this.addWishlist}
						src={heartImg}
					/>
				</div>
			</div>
		);
	}
}

export default Card;
