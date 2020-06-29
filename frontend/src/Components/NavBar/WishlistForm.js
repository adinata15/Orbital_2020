import React from "react";
import Image from "../../images/green.jpg";
import WishlistItem from "./WishlistItem.js";
import axios from "axios";

class ShopForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			wishlist: [],
		};
	}

	getitem = (token) => {
		let self = this;

		let config = {
			headers: {
				"x-auth-token": token,
			},
		};
		console.log(token);
		axios
			.get(`http://localhost:5000/api/users/buyer/wishlist`, config)
			.then((res) => {
				self.setState({
					wishlist: res.data,
				});
				// alert("Loaded liked items");
				// console.log("Here", self.state.cart);
			})
			.catch((err) => {
				console.error(err);
				alert("Load fail");
			});
	};

	componentWillMount() {
		this.getitem(this.props.token);
	}

	wishlistItems = () => {
		let wishlistItems = this.state.wishlist;
		if (wishlistItems[0]) {
			console.log("if case");
			return wishlistItems.map((item) => (
				<WishlistItem key={item.id} item={item} />
			));
		} else {
			console.log("else case");
			return (
				<div class="text-3xl px-8 font-bold pt-24 lg:pt-12">No liked items</div>
			);
		}
	};
	render() {
		return (
			<div>
				<h1 class="py-3 px-12 text-center text-3xl mb-3">Liked items</h1>
				{this.wishlistItems()}
				<div class="py-3 px-12">
					<button
						onClick={this.props.handleClose}
						class="bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-3 px-8 rounded-full"
					>
						Back to shopping
					</button>
				</div>
			</div>
		);
	}
}

export default ShopForm;
