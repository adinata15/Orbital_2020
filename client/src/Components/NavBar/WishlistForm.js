import React from "react";
import WishlistItem from "./WishlistItem.js";
import Alert from "../Alert.js";
import EmptyImg from "../../images/product.svg";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLikedItems } from "../../actions/shopActions";

class WishlistForm extends React.Component {
	componentWillMount() {
		this.props.getLikedItems();
	}

	wishlistItems = () => {
		let wishlistItems = this.props.itemLiked;

		if (wishlistItems[0]) {
			return wishlistItems.map((item) => (
				<WishlistItem key={item.id} item={item} />
			));
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
			<div>
				<Alert />
				<h1 className={"py-3 px-12 text-center text-3xl mb-3"}>Likes</h1>
				{this.wishlistItems()}
				<div className={"py-3 px-12"}>
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

WishlistForm.propTypes = {
	getLikedItems: PropTypes.func,
	itemLiked: PropTypes.array,
};

const mapStateToProps = (state) => ({
	itemLiked: state.shop.itemLiked,
});

export default connect(mapStateToProps, { getLikedItems })(WishlistForm);
