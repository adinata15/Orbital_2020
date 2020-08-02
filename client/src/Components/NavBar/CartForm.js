import React from "react";
import { Redirect } from "react-router-dom";

import Alert from "../Alert.js";
import CartItem from "./CartItem.js";
import EmptyImg from "../../images/product.svg";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getcartItems, payItems } from "../../actions/shopActions";
import { setAlert } from "../../actions/alertActions";

class CartForm extends React.Component {
	payItems = (e) => {
		e.preventDefault();
		if (
			this.props.user.billingaddress.empty ||
			this.props.user.shippingaddress.empty
		) {
			this.props.handleClose();
			this.props.setAlert("Please set up your address first", "danger");
			return <Redirect to="/address" />;
		} else {
			let cartItems = {
				items: this.props.itemCart,
			};

			this.props.payItems(cartItems);
		}
	};

	componentWillMount() {
		this.props.getcartItems();
	}

	cartItems = () => {
		let cartItems = this.props.itemCart;
		if (cartItems[0]) {
			return cartItems.map((item) => <CartItem key={item.id} item={item} />);
		} else {
			return (
				<div
					className={
						"p-2 font-sans antialiased text-gray-900 leading-normal tracking-wider"
					}
				>
					<div
						className={"max-w-md flex items-center h-auto flex-wrap mx-auto"}
					>
						<div className={"w-full"}>
							<img
								className={"w-auto h-24 my-2 mx-auto"}
								src={EmptyImg}
								alt=""
							/>
							<p className={"text-2xl text-center my-3"}>No item found</p>
						</div>
					</div>
				</div>
			);
		}
	};

	render() {
		return (
			<div className={"items-center"}>
				<Alert />
				<h1 className={"pt-3 text-center text-3xl mb-3"}>Cart</h1>
				{this.cartItems()}
				<div className="px-12 py-3">
					<button
						onClick={this.payItems}
						role="link"
						className={
							"bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-3 px-8 rounded-full"
						}
					>
						Checkout
					</button>
					<button
						onClick={this.props.handleClose}
						className={
							"bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-3 px-8 rounded-full"
						}
					>
						Back to shop
					</button>
				</div>
			</div>
		);
	}
}

CartForm.propTypes = {
	getcartItems: PropTypes.func.isRequired,
	setAlert: PropTypes.func,
	itemCart: PropTypes.array.isRequired,
	sessionId: PropTypes.string,
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	itemCart: state.shop.itemCart,
	sessionId: state.shop.sessionId,
	user: state.auth.user,
});

export default connect(mapStateToProps, { getcartItems, payItems, setAlert })(
	CartForm
);
