import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";

import EditAddress from "./EditAddress";
import AddAddress from "./AddAddress";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
	getAddress,
	updateBillingAddress,
	updateShippingAddress,
	deleteAddress,
} from "../../actions/profileActions";
import { setAlert } from "../../actions/alertActions";

class AddressBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editId: "",
			openAdd: false,
		};
	}

	componentWillMount() {
		this.props.getAddress();
	}

	handleOpen = (e) => {
		if (e.target.name === "openAdd") {
			this.setState({
				openAdd: true,
			});
		} else {
			this.setState({
				editId: e.target.name,
			});
		}
	};

	handleClose = () => {
		this.setState({
			editId: "",
			openAdd: false,
		});
	};

	render() {
		if (this.props.accounttype === "seller") window.location.assign("/");
		let addresses = this.props.addresses;

		return (
			<div className={"flex flex-col flex-no-wrap"}>
				<h1 className={"py-2 px-5 text-4xl"}>My Address</h1>
				<table id="tableaddresses" className={"p-3 mx-5 w-11/12 table-auto"}>
					<thead>
						<tr className={"bg-gray-300 border-0 border-b-3"}>
							<th className={"text-left px-4 py-2"}>Name</th>
							<th className={"text-left px-4 py-2"}>Address</th>
							<th className={"text-left px-4 py-2"}>Postcode</th>
							<th className={"text-left px-4 py-2"}>Phone</th>
							<th className={"text-left px-4 py-2"}>Status</th>
							<th className={"px-2 py-2"}></th>
							<th className={"px-2 py-2"}></th>
						</tr>
					</thead>
					<tbody>
						{addresses.length > 0 ? (
							addresses.map((address) => (
								<tr className={"bg-white border-0 border-b-2"}>
									<td className={" px-4 py-2"}>
										{address.firstname} {address.lastname}
									</td>
									<td className={"px-4 py-2"}>{address.address}</td>
									<td className={"px-4 py-2"}>{address.postcode}</td>
									<td className={"px-4 py-2"}>{address.telephone}</td>
									<td className={"px-4 py-2"}>
										<p hidden={!address.shippingaddress}>
											Default shipping address
										</p>
										<p hidden={!address.billingaddress}>
											Default billing address
										</p>
									</td>
									<td className={" px-4 py-2"}>
										<button
											type="button"
											name={address._id}
											className={"text-blue-700 hover:underline"}
											onClick={this.handleOpen}
										>
											Edit
										</button>
									</td>

									<td className={" px-4 py-2"}>
										<button
											type="button"
											className={"text-blue-700 hover:underline"}
											name={address._id}
											onClick={() => {
												if (address.shippingaddress || address.billingaddress)
													this.props.setAlert(
														`Cannot delete ${
															address.shippingaddress
																? `shipping address`
																: `billing address`
														}`,
														"danger"
													);
												else this.props.deleteAddress(address._id);
											}}
										>
											Delete
										</button>
									</td>
									<Dialog
										open={address._id === this.state.editId}
										onClose={this.handleClose}
										fullWidth={true}
										maxWidth={"sm"}
										scroll={"body"}
									>
										<EditAddress
											address={address}
											handleClose={this.handleClose}
										/>
									</Dialog>
								</tr>
							))
						) : (
							<p className={"text-3xl text-center w-full px-8 font-bold my-3"}>
								You have no registered address yet
							</p>
						)}
						<tr className={""}>
							<td className={"px-2 py-2"}></td>
							<td className={"px-2 py-2"}></td>
							<td className={"px-2 py-2"}></td>
							<td className={"px-2 py-2"}></td>
							<td className={"px-2 py-2"}></td>
							<td className={"px-2 py-2"}></td>
							<td className={"flex justify-end py-2"}>
								<button
									type="button"
									name="openAdd"
									onClick={this.handleOpen}
									className={
										"bg-gray-800 w-auto my-2 w-32 h-10 hover:bg-gray-600 text-white font-bold px-4 rounded"
									}
								>
									Add new address
								</button>
							</td>
						</tr>
					</tbody>
				</table>

				<Dialog
					open={this.state.openAdd}
					onClose={this.handleClose}
					fullWidth={true}
					maxWidth={"sm"}
					scroll={"body"}
				>
					<AddAddress handleClose={this.handleClose} />
				</Dialog>
			</div>
		);
	}
}

AddressBook.propTypes = {
	getAddress: PropTypes.func.isRequired,
	addresses: PropTypes.object.isRequired,
	updateBillingAddress: PropTypes.func,
	updateShippingAddress: PropTypes.func,
	deleteAddress: PropTypes.func,
	setAlert: PropTypes.func,
	accounttype: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
	addresses: state.auth.addresses,
	accounttype: state.auth.user.accounttype,
});

export default connect(mapStateToProps, {
	setAlert,
	getAddress,
	updateBillingAddress,
	updateShippingAddress,
	deleteAddress,
})(AddressBook);
