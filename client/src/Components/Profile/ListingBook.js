//move getdetails to here instead?

import React, { Component } from "react";
import { Link } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getListings, chooseListing } from "../../actions/profileActions";

class ListingBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		};
	}
	async componentDidMount() {
		await this.props.getListings(this.props.user._id);
	}

	render() {
		if (this.props.user.accounttype === "buyer") window.location.assign("/");
		if (this.props.user.listings.length > 0) {
			return this.props.user.listings && this.props.user.listings[0].images ? (
				<div>
					<h1 className={"py-2 px-5 text-4xl border-b"}>My Listings</h1>
					<div class="flex flex-wrap justify-center mb-3 border-solid border-t-2 rounded">
						{this.props.user.listings.map((listing) => (
							<Link
								to={{
									pathname: "/edit-listing",
								}}
								onClick={() => this.props.chooseListing(listing)}
							>
								<div
									className={
										"w-56 bg-white justify-center border rounded-lg overflow-hidden mt-2 ml-2"
									}
								>
									<img
										className={"block h-48 w-full justify-center"}
										src={listing.images[0]}
										alt="nothing to be shown"
									/>
									<div className={"p-2"}>
										<div className={"flex items-baseline"}>
											<div
												className={
													"text-gray-600 text-xs uppercase font-semibold tracking-wide"
												}
											>
												{listing.brand}
											</div>
										</div>
										<h4
											className={
												"mt-1 font-semibold text-lg leading-tight truncate"
											}
										>
											{listing.title}
										</h4>
										<div>${listing.price}</div>
									</div>
								</div>
							</Link>
						))}
					</div>

					<div className={"flex justify-end"}>
						<Link
							to="/sell"
							className={
								"bg-gray-800 w-auto my-2 mx-5 w-32 h-10 hover:bg-gray-600 text-white font-bold px-4 py-1 rounded"
							}
						>
							Add new listing
						</Link>
					</div>
				</div>
			) : (
				<div>
					<CircularProgress />
					Loading
				</div>
			);
		} else {
			return (
				<div>
					<h1 className={"py-2 px-5 text-4xl border-b"}>My Listings</h1>
					<p className={"text-3xl text-center w-full px-8 font-bold my-3"}>
						You have no listing yet
					</p>
					<div className={"flex justify-end"}>
						<Link
							to="/sell"
							className={
								"bg-gray-800 w-auto my-2 mx-5 w-32 h-10 hover:bg-gray-600 text-white font-bold px-4 py-1 rounded"
							}
						>
							Add new listing
						</Link>
					</div>
				</div>
			);
		}
	}
}

ListingBook.propTypes = {
	user: PropTypes.object.isRequired,
	getListings: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
});

export default connect(mapStateToProps, { getListings, chooseListing })(
	ListingBook
);
