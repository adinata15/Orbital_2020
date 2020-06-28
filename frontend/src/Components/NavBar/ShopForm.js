import React from "react";
import Image from "../../images/green.jpg";
import CartItem from "./CartItem.js";
import axios from "axios";
import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";

class ShopForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cart: [],
			stripe: window.Stripe(
				"pk_test_51GxnjfGgFpE6He4tT6kxFKbZpYoNhNPFCQBWx6LeWBXRkhmQu5JFYq71V4XvpjHJV8nT3dEffaqVfkOHzNNLMFbU00KyFazIJN"
			),
			sessionId: "",
		};
	}

	onPay = (event) => {
		let self = this;
		console.log(this.state.stripe);
		let transfers;
		let cart = {
			items: this.state.cart,
		};
		cart = JSON.stringify(cart);
		console.log(cart);

		const config = {
			headers: {
				"Content-Type": "application/json",
				"x-auth-token": this.props.token,
			},
		};
		const config2 = {
			headers: {
				"x-auth-token": this.props.token,
			},
		};
		let sessionId;
		axios
			.post(
				"http://localhost:5000/api/stripe/create-checkout-session",
				cart,
				config
			)
			.then((res) => {
				console.log("Session ID: " + res.data.sessionId);
				this.setState({ sessionId: res.data.sessionId });
			})
			.then(() => {
				this.state.stripe.redirectToCheckout({
					sessionId: self.state.sessionId,
				});
				console.log("Success");
			})
			.then(() => {
				alert("Payment succeed");
				transfers = axios.get(
					`http://localhost:5000/api/stripe/checkout/success?session_id=${self.state.sessionId}`,
					config2
				);
				// If `redirectToCheckout` fails due to a browser or network
				// error, display the localized error message to your customer
				// using `result.error.message`.
			})
			.then((transfers) => {
				console.log(transfers);
			})
			.catch((err) => console.log(err.message));
	};

	getitem = (token) => {
		let self = this;

		let config = {
			headers: {
				"x-auth-token": token,
			},
		};
		console.log(token);
		axios
			.get(`http://localhost:5000/api/users/buyer/cart`, config)
			.then((res) => {
				self.setState({
					cart: res.data,
				});
				alert("Loaded cart items");
				console.log("Here", self.state.cart);
			})
			.catch((err) => {
				console.error(err);
				alert("Load fail");
			});
	};

	componentWillMount() {
		this.getitem(this.props.token);
	}

	render() {
		let cartItems = this.state.cart;
		return (
			<div>
				{cartItems.map((item) => (
					<CartItem key={item.id} item={item} />
				))}
				<div class="pt-12 pb-8">
					<button
						onClick={this.onPay}
						role="link"
						class="bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full"
					>
						Checkout
					</button>
					<button
						onClick={this.props.handleClose}
						class="bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full"
					>
						Continue shopping
					</button>
				</div>
			</div>
		);
	}
}

export default ShopForm;
